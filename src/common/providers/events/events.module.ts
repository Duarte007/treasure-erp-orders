import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DITokens } from '../../../common/enums/DITokens';
import { PubSubProvider } from './services/gcp-pubsub.provider';

@Module({
  imports: [],
  providers: [
    {
      provide: DITokens.EventsProvider,
      useFactory: (configService: ConfigService) => {
        return new PubSubProvider(undefined, {
          disabled: configService.get('NODE_ENV') !== 'prd',
        });
      },
      inject: [ConfigService],
    },
  ],
  exports: [DITokens.EventsProvider],
})
export class EventsProviderModule {}
