import {
  IsArray,
  IsIn,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { AREAS } from '../../restaurants/restaurant.types';
import type { Area } from '../order.types';

class CreateDishDto {
  @IsString()
  name: string;

  @IsNumber()
  @Min(0)
  priceSantim: number;
}

export class CreateOrderDto {
  @IsString()
  customerName: string;

  @IsIn(AREAS)
  area: Area;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateDishDto)
  dishes: CreateDishDto[];

  @IsNumber()
  @Min(0)
  totalSantim: number;

  @IsOptional()
  @IsString()
  telebirrPhone?: string;
}
