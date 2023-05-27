import { Attributes } from '@google-cloud/pubsub';

export abstract class EventsProvider {
  abstract publish(
    topicName: string,
    data: object,
    attributes: Attributes,
  ): Promise<void>;
}
