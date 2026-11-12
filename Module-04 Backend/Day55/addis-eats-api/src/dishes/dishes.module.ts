import { Module } from '@nestjs/common';
import { DishesController } from './dishes.controller';
import { DishesService } from './dishes.service';
import { DISH_REPOSITORY, InMemoryDishRepository } from './dish.repository';
import { RestaurantsModule } from '../restaurants/restaurants.module';

@Module({
  imports: [RestaurantsModule],
  controllers: [DishesController],
  providers: [
    DishesService,
    {
      provide: DISH_REPOSITORY,
      useClass: InMemoryDishRepository,
    },
  ],
})
export class DishesModule {}
