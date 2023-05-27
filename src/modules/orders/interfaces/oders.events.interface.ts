export class OrderItemsEvent {
  product_uuid: string;
  quantity: number;
  price: number;
}

export class OrderCustomerEvent {
  customer_uuid: string;
}

export class OrderPaymentEvent {
  payment_uuid: string;
  method: number;
  amount: number;
  date: Date;
}

export class OrderEvent {
  order_id?: string;
  order_uuid: string;
  customer: OrderCustomerEvent;
  payment: OrderPaymentEvent;
  items: OrderItemsEvent[];
  date: Date;
  value: number;
}
