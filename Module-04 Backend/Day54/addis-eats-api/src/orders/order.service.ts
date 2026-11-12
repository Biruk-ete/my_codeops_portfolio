import { Order, Area } from './order.types';
import { OrderNotFoundError } from './order.errors';
import { ORDER_REPOSITORY } from './order.repository';
import type { OrderRepository } from './order.repository';
import { Injectable, Inject } from '@nestjs/common';

@Injectable()
export class OrderService {
  constructor(
    @Inject(ORDER_REPOSITORY)
    private readonly repo: OrderRepository,
  ) {}

  findAll(): Order[] {
    return this.repo.all();
  }

  create(data: Omit<Order, 'id' | 'status'>): Order {
    const order: Order = {
      id: Date.now(),
      ...data,
      status: 'pending',
    };

    this.repo.create(order);

    return order;
  }

  find(id: number): Order {
    const order = this.repo.byId(id);
    if (!order) {
      throw new OrderNotFoundError(id);
    }
    return order;
  }

  feesByArea(): Record<Area, number> {
    return {
      Bole: 4000,
      Kazanchis: 6000,
      Piassa: 6000,
      Mexico: 6000,
    };
  }

  summarise<K extends keyof Order>(key: K): Order[K][] {
    return this.repo.all().map((order) => order[key]);
  }
}
