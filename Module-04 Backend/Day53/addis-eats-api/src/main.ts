import {
  InMemoryOrderRepository,
  OrderService,
  OrderNotFoundError,
  Order,
} from './orders';

const sampleOrder: Order = {
  id: 1,
  customerName: 'Almaz',
  area: 'Bole',
  status: 'pending',
  dishes: [{ name: 'Doro Wat', priceSantim: 32000 }],
  totalSantim: 32000,
};

const repo = new InMemoryOrderRepository([sampleOrder]);
const service = new OrderService(repo);

try {
  const order = service.find(1);
  console.log('Found:', order.customerName);
} catch (err: unknown) {
  if (err instanceof OrderNotFoundError) {
    console.error('Error:', err.message);
  }
}

console.log('Fees:', service.feesByArea());

const names = service.summarise('customerName');
console.log('Summarised Names:', names);
