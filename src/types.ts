export type Price = {
  value: number;
  symbol: string;
  isDefault: number;
};

export type Guarantee = {
  start: string;
  end: string;
};

export type Product = {
  id: number;
  serialNumber: number;
  isNew: number;
  photo: string;
  title: string;
  type: string;
  specification: string;
  guarantee: Guarantee;
  price: Price[];
  order: number;
  date: string;
};

export type Order = {
  id: number;
  title: string;
  date: string;
  description: string;
  products: Product[];
};

export type SocketSessionUpdate = {
  sessions: number;
};

export type DeletePayload = {
  id: number;
  type: 'orders' | 'products';
};
