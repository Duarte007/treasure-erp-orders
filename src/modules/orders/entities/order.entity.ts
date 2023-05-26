import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from './base.entity';
import { OrderItem } from './order-items.entity';
import { OrderStatus } from './order-status.entity';

@Entity({ name: 'orders' })
export class Order extends BaseEntity {
  @PrimaryGeneratedColumn()
  order_id: number;

  @Column({ type: 'uuid', nullable: false })
  @Index('idx_order_uuid')
  order_uuid: string;

  @Column({ type: 'uuid', nullable: false })
  @Index('idx_customer_uuid')
  customer_uuid: string;

  @Column({ type: 'uuid', nullable: false })
  @Index('idx_payment_uuid')
  payment_uuid: string;

  @ManyToOne(() => OrderStatus)
  @JoinColumn({ name: 'order_status_id' })
  orderStatus: OrderStatus;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order)
  orderItems: OrderItem[];

  @Column()
  order_date: Date;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  order_total: number;
}

export class OrderItemsRecord {
  product_uuid: string;
  quantity: number;
  price: number;
}

export class OrderCustomerRecord {
  customer_uuid: string;
}

export class OrderPaymentRecord {
  payment_uuid: string;
}

export class OrderRecord {
  order_id?: string;
  order_uuid: string;
  customer: OrderCustomerRecord;
  payment: OrderPaymentRecord;
  items: OrderItemsRecord;
  date: Date;
  value: number;
}
