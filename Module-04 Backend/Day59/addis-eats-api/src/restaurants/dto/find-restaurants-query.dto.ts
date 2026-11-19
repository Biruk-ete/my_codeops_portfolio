import { Transform, Type } from 'class-transformer';
import { IsBoolean, IsInt, IsIn, IsOptional, Max, Min } from 'class-validator';

export class FindRestaurantsQuery {
  @IsOptional()
  @Transform(({ value }) =>
    value === 'true' ? true : value === 'false' ? false : value,
  )
  @IsBoolean()
  isOpen?: boolean;

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
  @IsIn(['name', 'area', '-name', '-area'])
  sort: 'name' | 'area' | '-name' | '-area' = 'name';
}
