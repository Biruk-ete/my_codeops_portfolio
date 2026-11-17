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

    const descending = query.sort.startsWith('-');

    const sortField = (descending ? query.sort.slice(1) : query.sort) as
      'name' | 'area';

    restaurants.sort((a, b) => {
      const result = a[sortField].localeCompare(b[sortField]);
      return descending ? -result : result;
    });

    const total = restaurants.length;
    const items = restaurants.slice(query.offset, query.offset + query.limit);

    return {
      items,
      total,
      limit: query.limit,
      offset: query.offset,
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
