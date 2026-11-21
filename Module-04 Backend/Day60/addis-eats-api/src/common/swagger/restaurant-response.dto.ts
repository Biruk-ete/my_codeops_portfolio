import { ApiProperty } from '@nestjs/swagger';
import { AREAS } from '../../restaurants/restaurant.types';

export class RestaurantResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty({ enum: AREAS })
  area: (typeof AREAS)[number];

  @ApiProperty()
  isOpen: boolean;
}
