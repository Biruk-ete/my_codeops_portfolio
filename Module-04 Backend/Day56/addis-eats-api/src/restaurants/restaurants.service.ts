import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { RESTAURANT_REPOSITORY } from './restaurant.repository';
import type { RestaurantRepository } from './restaurant.repository';
import type { Area, Restaurant } from './restaurant.types';
import type { CreateRestaurantDto } from './dto/create-restaurant.dto';
import type { Page } from '../common/page.types';
import { FindRestaurantsQuery } from './dto/find-restaurants-query.dto';

@Injectable()
export class RestaurantsService {
  constructor(
    @Inject(RESTAURANT_REPOSITORY)
    private readonly repository: RestaurantRepository,
  ) {}

  findAll(query: FindRestaurantsQuery): Page<Restaurant> {
    let restaurants = this.repository.all();

    if (query.area) {
      restaurants = restaurants.filter(
        (restaurant) => restaurant.area === query.area,
      );
    }

    if (query.isOpen !== undefined) {
      restaurants = restaurants.filter(
        (restaurant) => restaurant.isOpen === query.isOpen,
      );
    }

    restaurants.sort((a, b) => a[query.sort].localeCompare(b[query.sort]));

    const total = restaurants.length;
    const items = restaurants.slice(query.offset, query.offset + query.limit);

    return {
      items,
      total,
      limit: query.limit,
      offset: query.offset,
    };
  }

  findOpen(): Page<Restaurant> {
    const restaurants = this.repository
      .all()
      .filter((restaurant) => restaurant.isOpen);

    return {
      items: restaurants,
      total: restaurants.length,
      limit: restaurants.length,
      offset: 0,
    };
  }

  create(dto: CreateRestaurantDto): Restaurant {
    const nextId =
      Math.max(0, ...this.repository.all().map((restaurant) => restaurant.id)) +
      1;

    const restaurant: Restaurant = {
      id: nextId,
      name: dto.name,
      area: dto.area,
      isOpen: dto.isOpen ?? true,
    };

    return this.repository.save(restaurant);
  }

  findOne(id: number): Restaurant {
    const restaurant = this.repository.byId(id);

    if (!restaurant) {
      throw new NotFoundException(`Restaurant with ID ${id} not found`);
    }

    return restaurant;
  }
}
