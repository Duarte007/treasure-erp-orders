interface Stock {
  created_at: string;
  updated_at: string;
  stock_id: number;
  product_id: number;
  quantity: number;
}

export interface ProductResponse {
  created_at: string;
  updated_at: string;
  product_id: number;
  product_uuid: string;
  product_name: string;
  product_description: string;
  product_price: string;
  stock: Stock[];
}
