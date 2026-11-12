import { SEED_DISHES } from './seed-dishes';
import type { Dish } from './dish.types';

export const DISH_REPOSITORY = Symbol('DISH_REPOSITORY');

export interface DishRepository {
  all(): Dish[];
  byId(id: number): Dish | undefined;
  byRestaurantId(restaurantId: number): Dish[];
  save(dish: Dish): Dish;
}

export class InMemoryDishRepository implements DishRepository {
  private readonly rows = new Map<number, Dish>(
    SEED_DISHES.map((dish) => [dish.id, dish]),
  );

  all(): Dish[] {
    return [...this.rows.values()];
  }

  byId(id: number): Dish | undefined {
    return this.rows.get(id);
  }

  byRestaurantId(restaurantId: number): Dish[] {
    return this.all().filter((dish) => dish.restaurantId === restaurantId);
  }

  save(dish: Dish): Dish {
    this.rows.set(dish.id, dish);
    return dish;
  }
}
