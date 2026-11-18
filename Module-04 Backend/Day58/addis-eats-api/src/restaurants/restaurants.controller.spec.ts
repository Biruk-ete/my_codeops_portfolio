import { Test, TestingModule } from '@nestjs/testing';
import { RestaurantsController } from './restaurants.controller';
import { RestaurantsService } from './restaurants.service';
import { DishesService } from '../dishes/dishes.service';
import { OrderService } from '../orders/order.service';
import { jest } from '@jest/globals';

describe('RestaurantsController', () => {
  let controller: RestaurantsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RestaurantsController],
      providers: [
        {
          provide: RestaurantsService,
          useValue: {
            findAll: jest.fn(),
            findOne: jest.fn(),
            create: jest.fn(),
          },
        },
        {
          provide: DishesService,
          useValue: {
            findAll: jest.fn(),
          },
        },
        {
          provide: OrderService,
          useValue: {
            findByArea: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<RestaurantsController>(RestaurantsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
