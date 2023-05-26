import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { OrderItem } from '../../modules/orders/entities/order-items.entity';
import { OrderStatusHistory } from '../../modules/orders/entities/order-status-history.entity';
import { OrderStatus } from '../../modules/orders/entities/order-status.entity';
import { Order } from '../../modules/orders/entities/order.entity';

const DATABASE_ENTITIES = [Order, OrderItem, OrderStatus, OrderStatusHistory];

@Injectable()
export class DataBaseConnectionService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: this.configService.get('DB_HOST'),
      port: this.configService.get('DB_PORT'),
      username: this.configService.get('DB_USERNAME'),
      password: this.configService.get('DB_PASSWORD'),
      database: this.configService.get('DB_DATABASE'),
      synchronize: false,
      logging: false,
      entities: DATABASE_ENTITIES,
    };
  }
}
