import { jest } from '@jest/globals';
import { OrderService } from './order.service';
import type { Order } from './order.types';
import type { OrderRepository } from './order.repository';
import { FindOrdersQuery } from './dto/find-orders-query.dto';

describe('OrderService', () => {
  let service: OrderService;

  const repository: OrderRepository = {
    byId: jest.fn<(id: number) => Order | undefined>(),
    all: jest.fn<() => Order[]>(),
    create: jest.fn<(order: Order) => void>(),
    delete: jest.fn<(id: number) => void>(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    service = new OrderService(repository);
  });

  it('should return orders belonging to a specific area', () => {
    const orders: Order[] = [
      {
        id: 1,
        customerName: 'Abebe Kebede',
        area: 'Bole',
        status: 'pending',
        dishes: [{ name: 'Doro Wat', priceSantim: 24000 }],
        totalSantim: 24000,
      },
      {
        id: 2,
        customerName: 'Almaz Tadesse',
        area: 'Kazanchis',
        status: 'confirmed',
        dishes: [{ name: 'Shiro', priceSantim: 12000 }],
        totalSantim: 12000,
      },
    ];

    jest.mocked(repository.all).mockReturnValue(orders);

    expect(service.findByArea('Bole', new FindOrdersQuery())).toEqual({
      items: [orders[0]],
      total: 1,
      limit: 20,
      offset: 0,
    });
  });
});
