import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DITokens } from '../../../common/enums/DITokens';
import { GcpLoggerService } from './services/gcp-logger.service';

@Module({
  imports: [],
  providers: [
    {
      provide: DITokens.LoggerProvider,
      useFactory: (configService: ConfigService) => {
        return new GcpLoggerService();
      },
      inject: [ConfigService],
    },
  ],
  exports: [DITokens.LoggerProvider],
})
export class LoggerModule {}
