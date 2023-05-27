import { Injectable, Logger } from '@nestjs/common';
import { OrdersAdapter } from '../adapters/orders.adapter';
import { CreateOrderDTO } from '../dto/create-order.dto';
import { UpdateOrderDTO } from '../dto/update-order.dto';
import { OrdersRepository } from '../repositories/orders.repository';
import { OrdersEventProvider } from './orders.events.service';

@Injectable()
export class OrdersService {
  constructor(
    private readonly ordersRepository: OrdersRepository,
    private readonly ordersEventProvider: OrdersEventProvider,
  ) {}

  async create(createOrderDto: CreateOrderDTO) {
    try {
      const orderToSave = OrdersAdapter.toDatabase(createOrderDto);

      Logger.log({ message: 'New order', createOrderDto, orderToSave });

      const order = await this.ordersRepository.createOrder(orderToSave);

      const orderEvent = OrdersAdapter.toEvent(createOrderDto, orderToSave);

      this.ordersEventProvider.publishNewOrderEvent(orderEvent);

      return order;
    } catch (error) {
      Logger.error({
        message: 'Error creating order',
        error: error.response?.data || error.message,
      });

      throw error;
    }
  }

  findAll() {
    return `This action returns all orders`;
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: number, updateOrderDto: UpdateOrderDTO) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
