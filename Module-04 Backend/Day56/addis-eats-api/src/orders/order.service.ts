import { Order, Area } from './order.types';
import { OrderNotFoundError } from './order.errors';
import { ORDER_REPOSITORY } from './order.repository';
import type { OrderRepository } from './order.repository';
import { Injectable, Inject } from '@nestjs/common';
import type { Page } from '../common/page.types';
import { FindOrdersQuery } from './dto/find-orders-query.dto';
import type { OrderStatus } from './order.types';

@Injectable()
export class OrderService {
  constructor(
    @Inject(ORDER_REPOSITORY)
    private readonly repo: OrderRepository,
  ) {}

  findAll(query: FindOrdersQuery): Page<Order> {
    let orders = this.repo.all();

    if (query.status) {
      orders = orders.filter((order) => order.status === query.status);
    }

    if (query.area) {
      orders = orders.filter((order) => order.area === query.area);
    }

    orders.sort((a, b) => a[query.sort].localeCompare(b[query.sort]));

    const total = orders.length;
    const items = orders.slice(query.offset, query.offset + query.limit);

    return {
      items,
      total,
      limit: query.limit,
      offset: query.offset,
    };
  }

  findPending(query: FindOrdersQuery): Page<Order> {
    return this.findAll({ ...query, status: 'pending' });
  }

  findByArea(area: Area, query: FindOrdersQuery): Page<Order> {
    return this.findAll({ ...query, area });
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

  updateStatus(id: number, status: OrderStatus): Order {
    const order = this.find(id);

    order.status = status;

    return order;
  }

  remove(id: number): void {
    this.find(id);
    this.repo.delete(id);
  }

  feesByArea(): Record<Area, number> {
    return {
      Bole: 4000,
      Kazanchis: 6000,
      Piassa: 6000,
      Megenagna: 6000,
    };
  }

  summarise<K extends keyof Order>(key: K): Order[K][] {
    return this.repo.all().map((order) => order[key]);
  }
}
