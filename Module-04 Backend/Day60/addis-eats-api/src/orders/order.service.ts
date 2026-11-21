import { Order, Area } from './order.types';
import { OrderNotFoundError, InvalidTransitionError } from './order.errors';
import { ORDER_REPOSITORY } from './order.repository';
import type { OrderRepository } from './order.repository';
import { Injectable, Inject } from '@nestjs/common';
import type { Page } from '../common/page.types';
import { FindOrdersQuery } from './dto/find-orders-query.dto';
import type { OrderStatus } from './order.types';
import { PinoLogger } from 'nestjs-pino';

const ALLOWED_TRANSITIONS: Record<OrderStatus, readonly OrderStatus[]> = {
  pending: ['confirmed'],
  confirmed: ['preparing'],
  preparing: ['on_the_way'],
  on_the_way: ['delivered'],
  delivered: [],
};

@Injectable()
export class OrderService {
  constructor(
    @Inject(ORDER_REPOSITORY)
    private readonly repo: OrderRepository,
    private readonly logger: PinoLogger,
  ) {}
  findAll(query: FindOrdersQuery): Page<Partial<Order>> {
    let orders = this.repo.all();

    if (query.status?.length) {
      orders = orders.filter((order) => query.status!.includes(order.status));
    }

    if (query.area?.length) {
      orders = orders.filter((order) => query.area!.includes(order.area));
    }

    const descending = query.sort.startsWith('-');
    const sortField = (descending ? query.sort.slice(1) : query.sort) as
      'customerName' | 'area' | 'status';

    orders.sort((a, b) => {
      const result = a[sortField].localeCompare(b[sortField]);
      return descending ? -result : result;
    });

    const total = orders.length;
    const paginatedOrders = orders.slice(
      query.offset,
      query.offset + query.limit,
    );

    const items = query.fields
      ? paginatedOrders.map((order) =>
          Object.fromEntries(
            query.fields!.map((field) => [field, order[field]]),
          ),
        )
      : paginatedOrders;

    return {
      items,
      total,
      limit: query.limit,
      offset: query.offset,
    };
  }

  findByArea(area: Area, query: FindOrdersQuery): Page<Partial<Order>> {
    return this.findAll({ ...query, area: [area] });
  }

  create(data: Omit<Order, 'id' | 'status' | 'totalSantim'>): Order {
    const totalSantim = data.dishes.reduce(
      (total, dish) => total + dish.priceSantim,
      0,
    );

    const order: Order = {
      id: Date.now(),
      ...data,
      totalSantim,
      status: 'pending',
    };

    this.repo.create(order);

    this.logger.info({ orderId: order.id, area: order.area }, 'Order created');

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

    const allowedStatuses = ALLOWED_TRANSITIONS[order.status];

    if (!allowedStatuses.includes(status)) {
      throw new InvalidTransitionError(order.status, status);
    }

    order.status = status;

    return order;
  }

  remove(id: number): void {
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
