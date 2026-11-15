import {
  BadRequestException,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { DishesService } from './dishes.service';
import { Body, Post, Res } from '@nestjs/common';
import type { Response } from 'express';
import type { Dish } from './dish.types';
import { CreateDishDto } from './dto/create-dish.dto';

@Controller('dishes')
export class DishesController {
  constructor(private readonly dishesService: DishesService) {}

  @Get()
  findAll(@Query('restaurantId') restaurantId?: string) {
    if (restaurantId === undefined) {
      return this.dishesService.findAll();
    }

    const parsedId = Number(restaurantId);

    if (!Number.isInteger(parsedId) || parsedId <= 0) {
      throw new BadRequestException('restaurantId must be a positive integer');
    }

    return this.dishesService.findAll(parsedId);
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

    response.location(`/api/dishes/${dish.id}`);

    return dish;
  }
}
