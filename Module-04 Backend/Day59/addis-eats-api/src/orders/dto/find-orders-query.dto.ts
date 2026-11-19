import { Transform, Type } from 'class-transformer';
import { IsArray, IsIn, IsInt, IsOptional, Max, Min } from 'class-validator';
import { AREAS } from '../../restaurants/restaurant.types';
import { ORDER_STATUSES } from '../order.types';

export class FindOrdersQuery {
  @IsOptional()
  @Transform(({ value }) =>
    typeof value === 'string' ? value.split(',') : value,
  )
  @IsArray()
  @IsIn(ORDER_STATUSES, { each: true })
  status?: (typeof ORDER_STATUSES)[number][];

  @IsOptional()
  @Transform(({ value }) =>
    typeof value === 'string' ? value.split(',') : value,
  )
  @IsArray()
  @IsIn(AREAS, { each: true })
  area?: (typeof AREAS)[number][];

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
  @IsIn(['customerName', 'area', 'status', '-customerName', '-area', '-status'])
  sort:
    'customerName' | 'area' | 'status' | '-customerName' | '-area' | '-status' =
    'customerName';

  @IsOptional()
  @Transform(({ value }) =>
    typeof value === 'string' ? value.split(',') : value,
  )
  @IsArray()
  @IsIn(
    [
      'id',
      'customerName',
      'area',
      'status',
      'dishes',
      'telebirrPhone',
      'totalSantim',
    ],
    { each: true },
  )
  fields?: (
    | 'id'
    | 'customerName'
    | 'area'
    | 'status'
    | 'dishes'
    | 'telebirrPhone'
    | 'totalSantim'
  )[];
}
