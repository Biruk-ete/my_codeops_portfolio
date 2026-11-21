import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { DISH_REPOSITORY } from './dish.repository';
import type { DishRepository } from './dish.repository';
import { RESTAURANT_REPOSITORY } from '../restaurants/restaurant.repository';
import type { RestaurantRepository } from '../restaurants/restaurant.repository';
import type { Dish } from './dish.types';
import type { CreateDishDto } from './dto/create-dish.dto';
import { FindDishesQuery } from './dto/find-dishes-query.dto';
import type { Page } from '../common/page.types';

@Injectable()
export class DishesService {
  constructor(
    @Inject(DISH_REPOSITORY)
    private readonly repository: DishRepository,
    @Inject(RESTAURANT_REPOSITORY)
    private readonly restaurantRepository: RestaurantRepository,
  ) {}

  findAll(
    restaurantId?: number,
    query: FindDishesQuery = new FindDishesQuery(),
  ): Page<Dish> {
    let dishes =
      restaurantId !== undefined
        ? this.repository.byRestaurantId(restaurantId)
        : this.repository.all();

    const descending = query.sort.startsWith('-');

    const sortField = (descending ? query.sort.slice(1) : query.sort) as
      'name' | 'priceSantim';

    dishes.sort((a, b) => {
      const result =
        typeof a[sortField] === 'string'
          ? String(a[sortField]).localeCompare(String(b[sortField]))
          : Number(a[sortField]) - Number(b[sortField]);

      return descending ? -result : result;
    });

    const total = dishes.length;

    const items = dishes.slice(query.offset, query.offset + query.limit);

    return {
      items,
      total,
      limit: query.limit,
      offset: query.offset,
    };
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
