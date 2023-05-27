import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './common/database/database.module';
import { EventsProviderModule } from './common/providers/events/events.module';
import { LoggerModule } from './common/providers/logging/logger.module';
import { OrdersModule } from './modules/orders/orders.module';

@Module({
  imports: [
    LoggerModule,
    DatabaseModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    EventsProviderModule,
    OrdersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
