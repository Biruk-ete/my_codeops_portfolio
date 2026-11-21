import type { Area } from '../restaurants/restaurant.types';
export type { Area } from '../restaurants/restaurant.types';

export const ORDER_STATUSES = [
  'pending',
  'confirmed',
  'preparing',
  'on_the_way',
  'delivered',
] as const;

export type OrderStatus = (typeof ORDER_STATUSES)[number];

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
