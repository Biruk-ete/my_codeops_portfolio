import {
  ArrayNotEmpty,
  IsArray,
  IsIn,
  IsInt,
  IsOptional,
  IsString,
  Length,
  Max,
  Min,
  ValidateNested,
} from 'class-validator';
import { IsTeleBirrNumber } from '../../common/validators/is-telebirr-number.decorator';
import { IsSantimAmount } from '../../common/validators/is-santim-amount.validator';
import { Type } from 'class-transformer';
import { AREAS } from '../../restaurants/restaurant.types';
import type { Area } from '../order.types';

class CreateDishDto {
  @IsString()
  @Length(2, 100)
  name: string;

  @IsSantimAmount()
  priceSantim: number;
}

export class CreateOrderDto {
  @IsString()
  @Length(2, 80)
  customerName: string;

  @IsIn(AREAS)
  area: Area;

  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CreateDishDto)
  dishes: CreateDishDto[];

  @IsOptional()
  @IsTeleBirrNumber()
  telebirrPhone?: string;
}
