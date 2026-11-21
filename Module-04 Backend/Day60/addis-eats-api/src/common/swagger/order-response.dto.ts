import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ORDER_STATUSES } from '../../orders/order.types';
import { AREAS } from '../../restaurants/restaurant.types';

export class OrderDishResponseDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  priceSantim: number;
}

export class OrderResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  customerName: string;

  @ApiProperty({ enum: AREAS })
  area: (typeof AREAS)[number];

  @ApiProperty({ enum: ORDER_STATUSES })
  status: (typeof ORDER_STATUSES)[number];

  @ApiProperty({ type: [OrderDishResponseDto] })
  dishes: OrderDishResponseDto[];

  @ApiPropertyOptional()
  telebirrPhone?: string;

  @ApiProperty()
  totalSantim: number;
}
