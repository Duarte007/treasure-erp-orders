import { v4 as uuidv4 } from 'uuid';
import { DateUtils } from '../../../common/utils/date.utils';
import { CreateOrderDTO } from '../dto/create-order.dto';
import { OrderRecord } from '../entities/order.entity';
import { OrderEvent } from '../interfaces/oders.events.interface';

export class OrdersAdapter {
  static toDatabase(orderData: CreateOrderDTO): OrderRecord {
    return {
      order_uuid: uuidv4(),
      customer: { customer_uuid: orderData.customer.uuid },
      payment: {
        payment_uuid: uuidv4(),
      },
      items: orderData.items,
      date: DateUtils.now(),
      value: orderData.value,
    };
  }

  static toEvent(
    orderData: CreateOrderDTO,
    orderRecord: OrderRecord,
  ): OrderEvent {
    return {
      order_uuid: orderRecord.order_uuid,
      customer: { customer_uuid: orderData.customer.uuid },
      payment: {
        payment_uuid: orderRecord.payment.payment_uuid,
        ...orderData.payment,
      },
      items: orderData.items,
      date: orderRecord.date,
      value: orderData.value,
    };
  }
}
