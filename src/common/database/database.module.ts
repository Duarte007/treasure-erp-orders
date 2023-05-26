import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderItem } from '../../modules/orders/entities/order-items.entity';
import { OrderStatusHistory } from '../../modules/orders/entities/order-status-history.entity';
import { OrderStatus } from '../../modules/orders/entities/order-status.entity';
import { Order } from '../../modules/orders/entities/order.entity';
import { DataBaseConnectionService } from './typeorm.config';

const DATABASE_ENTITIES = [Order, OrderItem, OrderStatus, OrderStatusHistory];

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: DataBaseConnectionService,
    }),
    TypeOrmModule.forFeature(DATABASE_ENTITIES),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
