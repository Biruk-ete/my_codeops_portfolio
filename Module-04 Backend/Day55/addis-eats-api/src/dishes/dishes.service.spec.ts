import { Test, TestingModule } from '@nestjs/testing';
import { DishesService } from './dishes.service';
import { DISH_REPOSITORY } from './dish.repository';
import { RESTAURANT_REPOSITORY } from '../restaurants/restaurant.repository';
import { jest } from '@jest/globals';

describe('DishesService', () => {
  let service: DishesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DishesService,
        {
          provide: DISH_REPOSITORY,
          useValue: {
            all: jest.fn().mockReturnValue([]),
            byId: jest.fn(),
            byRestaurantId: jest.fn().mockReturnValue([]),
            save: jest.fn(),
          },
        },
        {
          provide: RESTAURANT_REPOSITORY,
          useValue: {
            all: jest.fn().mockReturnValue([]),
            byId: jest.fn(),
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<DishesService>(DishesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
