import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { DishesService } from '../dishes/dishes.service';
import { RestaurantsService } from './restaurants.service';
import type { Area, Restaurant } from './restaurant.types';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { Res } from '@nestjs/common';
import type { Response } from 'express';
import { FindRestaurantsQuery } from './dto/find-restaurants-query.dto';
import { OrderService } from '../orders/order.service';
import { FindOrdersQuery } from '../orders/dto/find-orders-query.dto';

@Controller('restaurants')
export class RestaurantsController {
  constructor(
    private readonly restaurantsService: RestaurantsService,
    private readonly dishesService: DishesService,
    private readonly orderService: OrderService,
  ) {}

  @Get()
  findAll(@Query() query: FindRestaurantsQuery) {
    return this.restaurantsService.findAll(query);
  }

  @Get('open')
  findOpen() {
    return this.restaurantsService.findOpen();
  }

  @Get(':id/dishes')
  findDishes(@Param('id', ParseIntPipe) id: number) {
    this.restaurantsService.findOne(id);
    return this.dishesService.findAll(id);
  }

  @Get(':id/orders')
  findOrders(
    @Param('id', ParseIntPipe) id: number,
    @Query() query: FindOrdersQuery,
  ) {
    const restaurant = this.restaurantsService.findOne(id);
    return this.orderService.findByArea(restaurant.area, query);
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
