import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrderService } from './order.service';
import { InMemoryOrderRepository, ORDER_REPOSITORY } from './order.repository';
import { seedOrders } from './seed-orders';
import { ApiKeyGuard } from '../common/guards/api-key.guard';

@Module({
  controllers: [OrdersController],
  providers: [
    OrderService,
    ApiKeyGuard,
    {
      provide: ORDER_REPOSITORY,
      useFactory: () => new InMemoryOrderRepository(seedOrders),
    },
  ],
  exports: [OrderService],
})
export class OrdersModule {}
