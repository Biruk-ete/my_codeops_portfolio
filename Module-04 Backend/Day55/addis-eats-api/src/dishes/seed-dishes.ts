import type { Dish } from './dish.types';

export const SEED_DISHES: Dish[] = [
  { id: 1, restaurantId: 1, name: 'Doro Wat', priceSantim: 24000 },
  { id: 2, restaurantId: 1, name: 'Kitfo', priceSantim: 32000 },
  { id: 3, restaurantId: 2, name: 'Shiro', priceSantim: 12000 },
  { id: 4, restaurantId: 2, name: 'Tibs', priceSantim: 28000 },
  { id: 5, restaurantId: 3, name: 'Firfir', priceSantim: 15000 },
  { id: 6, restaurantId: 3, name: 'Beyaynet', priceSantim: 18000 },
  { id: 7, restaurantId: 4, name: 'Dulet', priceSantim: 22000 },
  { id: 8, restaurantId: 4, name: 'Chechebsa', priceSantim: 10000 },
];
