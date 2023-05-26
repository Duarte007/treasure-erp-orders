import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from './base.entity';
import { Order } from './order.entity';

@Entity({ name: 'order_items' })
export class OrderItem extends BaseEntity {
  @PrimaryGeneratedColumn()
  order_item_id: number;

  @Column({ type: 'uuid', nullable: false })
  @Index('idx_product_uuid')
  product_uuid: string;

  @Column()
  quantity: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  @ManyToOne(() => Order, (order) => order.orderItems)
  @JoinColumn({ name: 'order_id' })
  order: Order;
}
