import { Inject, Injectable } from '@nestjs/common';
import { DITokens } from '../../../common/enums/DITokens';
import { EventsProvider } from '../../../common/providers/events/events.service';

@Injectable()
export class OrdersEventProvider {
  constructor(
    @Inject(DITokens.EventsProvider)
    private readonly eventsProvider: EventsProvider,
  ) {}

  async publishNewOrderEvent(data: object) {
    const topicName = 'orders';
    const topicAttributes = {
      event: 'NEW_ORDER',
      payloadVersion: '1.0.0',
    };
    return this.eventsProvider.publish(topicName, data, topicAttributes);
  }
}
