import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../common/database/database.module';
import { OrdersController } from './orders.controller';
import { OrdersRepository } from './repositories/orders.repository';
import { OrdersService } from './services/orders.service';

@Module({
  imports: [DatabaseModule],
  controllers: [OrdersController],
  providers: [OrdersService, OrdersRepository],
})
export class OrdersModule {}
