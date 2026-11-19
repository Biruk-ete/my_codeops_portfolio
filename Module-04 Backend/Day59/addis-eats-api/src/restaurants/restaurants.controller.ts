import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  UsePipes,
  ValidationPipe,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { DishesService } from '../dishes/dishes.service';
import { RestaurantsService } from './restaurants.service';
import type { Area, Restaurant } from './restaurant.types';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import type { Response } from 'express';
import { FindRestaurantsQuery } from './dto/find-restaurants-query.dto';
import { OrderService } from '../orders/order.service';
import { FindOrdersQuery } from '../orders/dto/find-orders-query.dto';
import { ParseAreaPipe } from '../common/pipes/parse-area.pipe';

@Controller({ path: 'restaurants', version: '1' })
export class RestaurantsController {
  constructor(
    private readonly restaurantsService: RestaurantsService,
    private readonly dishesService: DishesService,
    private readonly orderService: OrderService,
  ) {}

  @UsePipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: false,
      transform: true,
    }),
  )
  @Get()
  findAll(
    @Query('area', ParseAreaPipe) area: Area | undefined,
    @Query() query: FindRestaurantsQuery,
  ) {
    return this.restaurantsService.findAll(query, area);
  }

  @UsePipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: false,
      transform: true,
    }),
  )
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
  @UsePipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  )
  @Post()
  create(
    @Body() dto: CreateRestaurantDto,
    @Res({ passthrough: true }) response: Response,
  ): Restaurant {
    const restaurant = this.restaurantsService.create(dto);

    response.location(`/api/v1/restaurants/${restaurant.id}`);

    return restaurant;
  }
}
