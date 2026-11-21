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
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { DishesService } from '../dishes/dishes.service';
import { RestaurantsService } from './restaurants.service';
import type { Area, Restaurant } from './restaurant.types';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import type { Response } from 'express';
import { FindRestaurantsQuery } from './dto/find-restaurants-query.dto';
import { OrderService } from '../orders/order.service';
import { FindOrdersQuery } from '../orders/dto/find-orders-query.dto';
import { ParseAreaPipe } from '../common/pipes/parse-area.pipe';
import { RestaurantResponseDto } from '../common/swagger/restaurant-response.dto';
import { DishResponseDto } from '../common/swagger/dish-response.dto';
import { OrderResponseDto } from '../common/swagger/order-response.dto';

@ApiTags('restaurants')
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
  @ApiOperation({ summary: 'Get all restaurants' })
  @ApiOkResponse({
    description: 'Restaurants retrieved successfully.',
    type: RestaurantResponseDto,
    isArray: true,
  })
  @ApiBadRequestResponse({ description: 'Invalid area or query parameters.' })
  @ApiQuery({
    name: 'area',
    required: false,
    enum: ['Bole', 'Kazanchis', 'Piassa', 'Megenagna'],
    description: 'Filter restaurants by area.',
  })
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
  @ApiOperation({ summary: 'Get dishes for a restaurant' })
  @ApiOkResponse({
    description: 'Restaurant dishes retrieved successfully.',
    type: DishResponseDto,
    isArray: true,
  })
  @ApiBadRequestResponse({ description: 'Invalid restaurant ID.' })
  @ApiNotFoundResponse({ description: 'Restaurant not found.' })
  findDishes(@Param('id', ParseIntPipe) id: number) {
    this.restaurantsService.findOne(id);
    return this.dishesService.findAll(id);
  }

  @Get(':id/orders')
  @ApiOperation({ summary: 'Get orders for a restaurant' })
  @ApiOkResponse({
    description: 'Restaurant orders retrieved successfully.',
    type: OrderResponseDto,
    isArray: true,
  })
  @ApiBadRequestResponse({
    description: 'Invalid restaurant ID or query parameters.',
  })
  @ApiNotFoundResponse({ description: 'Restaurant not found.' })
  findOrders(
    @Param('id', ParseIntPipe) id: number,
    @Query() query: FindOrdersQuery,
  ) {
    const restaurant = this.restaurantsService.findOne(id);
    return this.orderService.findByArea(restaurant.area, query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a restaurant by ID' })
  @ApiOkResponse({
    description: 'Restaurant retrieved successfully.',
    type: RestaurantResponseDto,
  })
  @ApiBadRequestResponse({ description: 'Invalid restaurant ID.' })
  @ApiNotFoundResponse({ description: 'Restaurant not found.' })
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
  @ApiOperation({ summary: 'Create a new restaurant' })
  @ApiCreatedResponse({
    description: 'Restaurant created successfully.',
    type: RestaurantResponseDto,
  })
  @ApiBadRequestResponse({ description: 'Invalid restaurant data.' })
  create(
    @Body() dto: CreateRestaurantDto,
    @Res({ passthrough: true }) response: Response,
  ): Restaurant {
    const restaurant = this.restaurantsService.create(dto);

    response.location(`/api/v1/restaurants/${restaurant.id}`);

    return restaurant;
  }
}
