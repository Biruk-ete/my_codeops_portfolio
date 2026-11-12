export const DELIVERY_AREAS = [
  'Bole',
  'Kazanchis',
  'Piassa',
  'Mexico',
] as const;
export type Area = (typeof DELIVERY_AREAS)[number];

export type OrderStatus =
  'pending' | 'confirmed' | 'preparing' | 'on_the_way' | 'delivered';

export interface Dish {
  name: string;
  priceSantim: number;
}

export interface Order {
  readonly id: number;
  customerName: string;
  area: Area;
  status: OrderStatus;
  dishes: Dish[];
  telebirrPhone?: string;
  totalSantim: number;
}
