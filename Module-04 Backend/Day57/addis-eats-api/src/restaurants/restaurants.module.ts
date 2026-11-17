import { forwardRef, Module } from '@nestjs/common';
import { RestaurantsController } from './restaurants.controller';
import { RestaurantsService } from './restaurants.service';
import { DishesModule } from '../dishes/dishes.module';
import { OrdersModule } from '../orders/orders.module';
import {
  RESTAURANT_REPOSITORY,
  InMemoryRestaurantRepository,
} from './restaurant.repository';

@Module({
  imports: [forwardRef(() => DishesModule), OrdersModule],
  controllers: [RestaurantsController],
  providers: [
    RestaurantsService,
    {
      provide: RESTAURANT_REPOSITORY,
      useClass: InMemoryRestaurantRepository,
    },
  ],
  exports: [RESTAURANT_REPOSITORY],
})
export class RestaurantsModule {}
