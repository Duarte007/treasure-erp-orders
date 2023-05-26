import { Injectable } from '@nestjs/common';
import { CreateOrderDTO } from '../dto/create-order.dto';
import { UpdateOrderDTO } from '../dto/update-order.dto';

@Injectable()
export class OrdersService {
  create(createOrderDto: CreateOrderDTO) {
    return 'This action adds a new order';
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
