import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { RestaurantsService } from './restaurants.service';
import type { Area, Restaurant } from './restaurant.types';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { Res } from '@nestjs/common';
import type { Response } from 'express';

@Controller('restaurants')
export class RestaurantsController {
  constructor(private readonly restaurantsService: RestaurantsService) {}

  @Get()
  findAll(@Query('area') area?: Area) {
    return this.restaurantsService.findAll(area);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.restaurantsService.findOne(id);
  }

  @Post()
  create(
    @Body() dto: CreateRestaurantDto,
    @Res({ passthrough: true }) response: Response,
  ): Restaurant {
    const restaurant = this.restaurantsService.create(dto);

    response.location(`/api/restaurants/${restaurant.id}`);

    return restaurant;
  }
}
