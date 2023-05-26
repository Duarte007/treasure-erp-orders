import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity({ name: 'order_status' })
export class OrderStatus extends BaseEntity {
  @PrimaryGeneratedColumn()
  order_status_id: number;

  @Column({ length: 255 })
  order_status_name: string;
}
