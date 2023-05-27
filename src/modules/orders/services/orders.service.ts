import { Injectable } from '@nestjs/common';
import { OrdersAdapter } from '../adapters/orders.adapter';
import { CreateOrderDTO } from '../dto/create-order.dto';
import { UpdateOrderDTO } from '../dto/update-order.dto';
import { OrdersRepository } from '../repositories/orders.repository';

@Injectable()
export class OrdersService {
  constructor(private readonly ordersRepository: OrdersRepository) {}

  async create(createOrderDto: CreateOrderDTO) {
    const orderToSave = OrdersAdapter.toDatabase(createOrderDto);

    const order = await this.ordersRepository.createOrder(orderToSave);

    return order;
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
