import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../common/database/database.module';
import { EventsProviderModule } from '../../common/providers/events/events.module';
import { OrdersController } from './orders.controller';
import { OrdersRepository } from './repositories/orders.repository';
import { OrdersEventProvider } from './services/orders.events.service';
import { OrdersService } from './services/orders.service';

@Module({
  imports: [DatabaseModule, EventsProviderModule],
  controllers: [OrdersController],
  providers: [OrdersService, OrdersRepository, OrdersEventProvider],
})
export class OrdersModule {}
