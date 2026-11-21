import { Transform, Type } from 'class-transformer';
import { IsArray, IsIn, IsInt, IsOptional, Max, Min } from 'class-validator';
import { AREAS } from '../../restaurants/restaurant.types';
import { ORDER_STATUSES } from '../order.types';
import { ApiPropertyOptional } from '@nestjs/swagger';

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

  @ApiPropertyOptional({
    type: 'integer',
    minimum: 1,
    maximum: 50,
    default: 20,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(50)
  limit = 20;

  @ApiPropertyOptional({
    type: 'integer',
    minimum: 0,
    default: 0,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  offset = 0;

  @ApiPropertyOptional({
    enum: [
      'customerName',
      'area',
      'status',
      '-customerName',
      '-area',
      '-status',
    ],
    default: 'customerName',
  })
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
