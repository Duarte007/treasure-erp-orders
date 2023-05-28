import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { ProductsApiService } from 'src/modules/apis/products-api/services/products.api.service';
import { OrdersAdapter } from '../adapters/orders.adapter';
import { CreateOrderDTO, OrderItemsDTO } from '../dto/create-order.dto';
import { UpdateOrderDTO } from '../dto/update-order.dto';
import { OrdersRepository } from '../repositories/orders.repository';
import { OrdersEventProvider } from './orders.events.service';

@Injectable()
export class OrdersService {
  constructor(
    private readonly ordersRepository: OrdersRepository,
    private readonly ordersEventProvider: OrdersEventProvider,
    private readonly productsApiHttpService: ProductsApiService,
  ) {}

  private async _validateStockAvailableToRealizeOrder(
    orderItems: OrderItemsDTO[],
  ) {
    const promises = orderItems.map(async (item) => {
      try {
        const product = await this.productsApiHttpService.getProductByUUID(
          item.product_uuid,
        );
        if (product.stock[0].quantity < item.quantity) {
          Logger.warn({
            message: 'Insufficient stock for product',
            product,
            item,
          });
          throw new BadRequestException('INSUFFICIENT_STOCK');
        }
      } catch (error) {
        Logger.error({
          message: 'Error validating stock for order item',
          error: error.response?.data || error.message,
        });
        throw error;
      }
    });

    await Promise.all(promises);
  }

  async create(createOrderDto: CreateOrderDTO) {
    try {
      await this._validateStockAvailableToRealizeOrder(createOrderDto.items);

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
