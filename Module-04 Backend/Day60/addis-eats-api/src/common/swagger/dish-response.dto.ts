import { ApiProperty } from '@nestjs/swagger';

export class DishResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  restaurantId: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  priceSantim: number;
}
