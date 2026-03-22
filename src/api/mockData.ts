import type { Order, Product } from '../types';

const products: Product[] = [
  {
    id: 1,
    serialNumber: 1234,
    isNew: 1,
    photo: 'pathToFile.jpg',
    title: 'Product 1',
    type: 'Monitors',
    specification: 'Specification 1',
    guarantee: {
      start: '2017-06-29 12:09:33',
      end: '2017-06-29 12:09:33',
    },
    price: [
      { value: 100, symbol: 'USD', isDefault: 0 },
      { value: 2600, symbol: 'UAH', isDefault: 1 },
    ],
    order: 1,
    date: '2017-06-29 12:09:33',
  },
  {
    id: 2,
    serialNumber: 1234,
    isNew: 1,
    photo: 'pathToFile.jpg',
    title: 'Product 2',
    type: 'Monitors',
    specification: 'Specification 2',
    guarantee: {
      start: '2017-06-29 12:09:33',
      end: '2017-06-29 12:09:33',
    },
    price: [
      { value: 200, symbol: 'USD', isDefault: 0 },
      { value: 5200, symbol: 'UAH', isDefault: 1 },
    ],
    order: 1,
    date: '2017-06-29 12:09:33',
  },
  {
    id: 3,
    serialNumber: 5678,
    isNew: 1,
    photo: 'pathToFile2.jpg',
    title: 'Product 3',
    type: 'Keyboards',
    specification: 'Specification 3',
    guarantee: {
      start: '2017-06-29 12:09:33',
      end: '2017-06-29 12:09:33',
    },
    price: [
      { value: 50, symbol: 'USD', isDefault: 0 },
      { value: 1300, symbol: 'UAH', isDefault: 1 },
    ],
    order: 2,
    date: '2017-06-29 12:09:33',
  },
  {
    id: 4,
    serialNumber: 5678,
    isNew: 1,
    photo: 'pathToFile3.jpg',
    title: 'Product 4',
    type: 'Keyboards',
    specification: 'Specification 4',
    guarantee: {
      start: '2017-06-29 12:09:33',
      end: '2017-06-29 12:09:33',
    },
    price: [
      { value: 75, symbol: 'USD', isDefault: 0 },
      { value: 1950, symbol: 'UAH', isDefault: 1 },
    ],
    order: 2,
    date: '2017-06-29 12:09:33',
  },
  {
    id: 5,
    serialNumber: 9012,
    isNew: 1,
    photo: 'pathToFile4.jpg',
    title: 'Product 5',
    type: 'Mice',
    specification: 'Specification 5',
    guarantee: {
      start: '2017-06-29 12:09:33',
      end: '2017-06-29 12:09:33',
    },
    price: [
      { value: 25, symbol: 'USD', isDefault: 0 },
      { value: 650, symbol: 'UAH', isDefault: 1 },
    ],
    order: 3,
    date: '2017-06-29 12:09:33',
  },
];

const orders: Order[] = [
  {
    id: 1,
    title: ' Order 1',
    date: '2017-06-29 12:09:33',
    description: 'desc',
    products: products.filter((p) => p.order === 1),
  },
  {
    id: 2,
    title: 'Order 2',
    date: '2017-06-29 12:09:33',
    description: 'desc',
    products: products.filter((p) => p.order === 2),
  },
  {
    id: 3,
    title: 'Order 3',
    date: '2017-06-29 12:09:33',
    description: 'desc',
    products: products.filter((p) => p.order === 3),
  },
];

const delay = (ms = 250) =>
  new Promise<void>((resolve) => setTimeout(resolve, ms));

export async function fetchOrders(): Promise<Order[]> {
  await delay();
  return [...orders];
}

export async function fetchProducts(): Promise<Product[]> {
  await delay();
  return [...products];
}

export async function fetchProductsByOrder(
  orderId: number
): Promise<Product[]> {
  await delay();
  const order = orders.find((o) => o.id === orderId);
  return order ? [...order.products] : [];
}
