export interface Product {
  id: number;
  code: string;
  name: string;
  price: number;
  stock_quantity: number;
  category: string;
  status: 'available' | 'low' | 'out';
  updatedAt: string;
}

export interface Sale {
  id: number;
  productId: number;
  product?: Product;
  quantity: number;
  total_price: number;
  sale_date: string;
}

export interface SalesResponse {
  sale: Sale;
  remaining_stock: number;
}
