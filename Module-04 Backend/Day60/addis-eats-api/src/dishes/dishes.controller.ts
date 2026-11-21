import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  ValidationPipe,
  UsePipes,
  Res,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { DishesService } from './dishes.service';
import type { Response } from 'express';
import type { Dish } from './dish.types';
import { CreateDishDto } from './dto/create-dish.dto';
import { FindDishesQuery } from './dto/find-dishes-query.dto';
import { DishResponseDto } from '../common/swagger/dish-response.dto';

@ApiTags('dishes')
@Controller({ path: 'dishes', version: '1' })
export class DishesController {
  constructor(private readonly dishesService: DishesService) {}

  @UsePipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: false,
      transform: true,
    }),
  )
  @Get()
  @ApiOperation({ summary: 'Get all dishes' })
  @ApiOkResponse({
    description: 'Dishes retrieved successfully.',
    type: DishResponseDto,
    isArray: true,
  })
  @ApiBadRequestResponse({
    description: 'Invalid restaurant ID or query parameters.',
  })
  @ApiQuery({
    name: 'restaurantId',
    required: false,
    type: Number,
    description: 'Filter dishes by restaurant ID.',
  })
  findAll(
    @Query('restaurantId') restaurantId?: string,
    @Query() query?: FindDishesQuery,
  ) {
    if (restaurantId === undefined) {
      return this.dishesService.findAll(undefined, query);
    }

    const parsedId = Number(restaurantId);

    if (!Number.isInteger(parsedId) || parsedId <= 0) {
      throw new BadRequestException('restaurantId must be a positive integer');
    }

    return this.dishesService.findAll(parsedId, query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a dish by ID' })
  @ApiOkResponse({
    description: 'Dish retrieved successfully.',
    type: DishResponseDto,
  })
  @ApiBadRequestResponse({ description: 'Invalid dish ID.' })
  @ApiNotFoundResponse({ description: 'Dish not found.' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.dishesService.findOne(id);
  }

  @UsePipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  )
  @Post()
  @ApiOperation({ summary: 'Create a new dish' })
  @ApiCreatedResponse({
    description: 'Dish created successfully.',
    type: DishResponseDto,
  })
  @ApiBadRequestResponse({ description: 'Invalid dish data.' })
  create(
    @Body() dto: CreateDishDto,
    @Res({ passthrough: true }) response: Response,
  ): Dish {
    const dish = this.dishesService.create(dto);

    response.location(`/api/v1/dishes/${dish.id}`);

    return dish;
  }
}
