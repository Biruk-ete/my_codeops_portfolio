import { Type } from 'class-transformer';
import { IsIn, IsInt, IsOptional, Max, Min } from 'class-validator';
import { AREAS } from '../../restaurants/restaurant.types';
import { ORDER_STATUSES } from '../order.types';

export class FindOrdersQuery {
  @IsOptional()
  @IsIn(ORDER_STATUSES)
  status?: (typeof ORDER_STATUSES)[number];

  @IsOptional()
  @IsIn(AREAS)
  area?: (typeof AREAS)[number];

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(50)
  limit = 20;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  offset = 0;

  @IsOptional()
  @IsIn(['customerName', 'area', 'status'])
  sort: 'customerName' | 'area' | 'status' = 'customerName';
}
