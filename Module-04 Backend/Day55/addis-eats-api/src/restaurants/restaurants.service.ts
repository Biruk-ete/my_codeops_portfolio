import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { RESTAURANT_REPOSITORY } from './restaurant.repository';
import type { RestaurantRepository } from './restaurant.repository';
import type { Area, Restaurant } from './restaurant.types';
import type { CreateRestaurantDto } from './dto/create-restaurant.dto';

@Injectable()
export class RestaurantsService {
  constructor(
    @Inject(RESTAURANT_REPOSITORY)
    private readonly repository: RestaurantRepository,
  ) {}

  findAll(area?: Area): Restaurant[] {
    const restaurants = this.repository.all();

    if (area) {
      return restaurants.filter((restaurant) => restaurant.area === area);
    }

    return restaurants;
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
