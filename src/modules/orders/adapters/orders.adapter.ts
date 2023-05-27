import { v4 as uuidv4 } from 'uuid';
import { DateUtils } from '../../../common/utils/date.utils';
import { CreateOrderDTO } from '../dto/create-order.dto';
import { OrderRecord } from '../entities/order.entity';

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
}
