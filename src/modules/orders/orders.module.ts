import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../common/database/database.module';
import { OrdersController } from './orders.controller';
import { OrdersService } from './services/orders.service';

@Module({
  imports: [DatabaseModule],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
