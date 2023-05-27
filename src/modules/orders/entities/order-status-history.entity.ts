import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from './base.entity';
import { OrderStatus } from './order-status.entity';
import { Order } from './order.entity';

@Entity({ name: 'order_status_history' })
export class OrderStatusHistory extends BaseEntity {
  @PrimaryGeneratedColumn()
  history_id: number;

  @ManyToOne(() => Order)
  @JoinColumn({ name: 'order_id' })
  order: Order;

  @Column()
  order_id: number;

  @ManyToOne(() => OrderStatus)
  @JoinColumn({ name: 'order_status_id' })
  orderStatus: OrderStatus;

  @Column()
  order_status_id: number;
}
