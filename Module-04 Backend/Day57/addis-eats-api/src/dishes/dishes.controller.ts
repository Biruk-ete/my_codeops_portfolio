import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { DishesService } from './dishes.service';
import type { Response } from 'express';
import type { Dish } from './dish.types';
import { CreateDishDto } from './dto/create-dish.dto';
import { FindDishesQuery } from './dto/find-dishes-query.dto';

@Controller({ path: 'dishes', version: '1' })
export class DishesController {
  constructor(private readonly dishesService: DishesService) {}

  @Get()
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
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.dishesService.findOne(id);
  }

  @Post()
  create(
    @Body() dto: CreateDishDto,
    @Res({ passthrough: true }) response: Response,
  ): Dish {
    const dish = this.dishesService.create(dto);

    response.location(`/api/v1/dishes/${dish.id}`);

    return dish;
  }
}
