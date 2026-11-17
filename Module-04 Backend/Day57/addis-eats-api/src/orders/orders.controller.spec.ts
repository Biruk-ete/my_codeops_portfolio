import { Test, TestingModule } from '@nestjs/testing';
import { jest } from '@jest/globals';
import { OrdersController } from './orders.controller';
import { OrderService } from './order.service';

describe('OrdersController', () => {
  let controller: OrdersController;

  const mockOrderService = {
    findAll: jest.fn(),
    find: jest.fn(),
    create: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrdersController],
      providers: [
        {
          provide: OrderService,
          useValue: mockOrderService,
        },
      ],
    }).compile();

    controller = module.get<OrdersController>(OrdersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
