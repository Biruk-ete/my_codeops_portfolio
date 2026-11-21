import { Type } from 'class-transformer';
import { IsIn, IsInt, IsOptional, Max, Min } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class FindDishesQuery {
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
    enum: ['name', 'priceSantim', '-name', '-priceSantim'],
    default: 'name',
  })
  @IsOptional()
  @IsIn(['name', 'priceSantim', '-name', '-priceSantim'])
  sort: 'name' | 'priceSantim' | '-name' | '-priceSantim' = 'name';
}
