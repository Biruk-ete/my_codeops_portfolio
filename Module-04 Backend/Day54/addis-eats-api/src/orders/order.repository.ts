import { Order } from './order.types';

export interface OrderRepository {
  byId(id: number): Order | undefined;
  all(): Order[];
  create(order: Order): void;
}

export class InMemoryOrderRepository implements OrderRepository {
  private readonly store = new Map<number, Order>();

  constructor(initialOrders: Order[] = []) {
    for (const order of initialOrders) {
      this.store.set(order.id, order);
    }
  }

  byId(id: number): Order | undefined {
    return this.store.get(id);
  }

  all(): Order[] {
    return Array.from(this.store.values());
  }

  create(order: Order): void {
    this.store.set(order.id, order);
  }
}

export const ORDER_REPOSITORY = 'ORDER_REPOSITORY';
