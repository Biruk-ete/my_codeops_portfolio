import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { DISH_REPOSITORY } from './dish.repository';
import type { DishRepository } from './dish.repository';
import { RESTAURANT_REPOSITORY } from '../restaurants/restaurant.repository';
import type { RestaurantRepository } from '../restaurants/restaurant.repository';
import type { Dish } from './dish.types';
import type { CreateDishDto } from './dto/create-dish.dto';

@Injectable()
export class DishesService {
  constructor(
    @Inject(DISH_REPOSITORY)
    private readonly repository: DishRepository,
    @Inject(RESTAURANT_REPOSITORY)
    private readonly restaurantRepository: RestaurantRepository,
  ) {}

  findAll(restaurantId?: number): Dish[] {
    if (restaurantId !== undefined) {
      return this.repository.byRestaurantId(restaurantId);
    }

    return this.repository.all();
  }

  findOne(id: number): Dish {
    const dish = this.repository.byId(id);

    if (!dish) {
      throw new NotFoundException(`Dish with ID ${id} not found`);
    }

    return dish;
  }

  create(dto: CreateDishDto): Dish {
    const restaurant = this.restaurantRepository.byId(dto.restaurantId);

    if (!restaurant) {
      throw new NotFoundException(
        `Restaurant with ID ${dto.restaurantId} not found`,
      );
    }

    const nextId =
      Math.max(0, ...this.repository.all().map((dish) => dish.id)) + 1;

    const dish: Dish = {
      id: nextId,
      restaurantId: dto.restaurantId,
      name: dto.name,
      priceSantim: dto.priceSantim,
    };

    return this.repository.save(dish);
  }
}
