import { Attributes, PubSub } from '@google-cloud/pubsub';
import { Logger } from '@nestjs/common';
import { GcpServiceAccount } from '../../../types/gcp.types';
import { JsonUtils } from '../../../utils/json.utils';
import { EventsProvider } from '../events.service';
import { EventProviderOptions } from '../types/pubsub.types';

// TODO(lucas.citolin): remove dependency injection of LoggerService and use default Logger from nestjs
// -- For this to be possible, it is required to update NestJS to v8
export class PubSubProvider implements EventsProvider {
  private pubsub: PubSub;
  private disabled?: boolean;
  private projectId: string;

  static MAX_NUMBER_OF_TRIES = 3;

  constructor(
    serviceAccount?: GcpServiceAccount,
    options?: EventProviderOptions,
  ) {
    this.pubsub = new PubSub();

    this.projectId = serviceAccount?.project_id;
    this.disabled = options?.disabled;
  }

  public async publish(
    topicName: string,
    data: object,
    attributes: Attributes,
  ): Promise<void> {
    if (this.disabled) {
      return;
    }

    const dataAsBuffer = Buffer.from(JsonUtils.stringify(data));

    let pubsubError = undefined;

    for (let i = 0; i <= PubSubProvider.MAX_NUMBER_OF_TRIES; i++) {
      try {
        await this.pubsub.topic(topicName).publish(dataAsBuffer, attributes);
        pubsubError = undefined;
        break;
      } catch (error) {
        pubsubError = error;
      }
    }

    const destination = {
      topic: topicName,
      projectId: this.projectId,
    };

    const event = {
      attributes,
      data,
    };

    if (pubsubError) {
      Logger.error({
        message: 'Error publishing pubsub event',
        destination,
        event,
        error: pubsubError,
      });
    } else {
      Logger.log({
        message: 'Published pubsub event',
        destination,
        event,
      });
    }
  }
}
