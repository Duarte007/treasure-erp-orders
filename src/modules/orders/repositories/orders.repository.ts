import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { OrderItem } from '../entities/order-items.entity';
import { OrderStatusHistory } from '../entities/order-status-history.entity';
import { OrderStatus, OrderStatusEnum } from '../entities/order-status.entity';
import { Order, OrderRecord } from '../entities/order.entity';

@Injectable()
export class OrdersRepository {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    @InjectRepository(OrderItem)
    private orderItemRepository: Repository<OrderItem>,
    @InjectRepository(OrderStatus)
    private orderStatusRepository: Repository<OrderStatus>,
    @InjectRepository(OrderStatusHistory)
    private orderStatusHistoryRepository: Repository<OrderStatusHistory>,
  ) {}

  private _buildOrderEntity(order: OrderRecord) {
    const orderEntity = new Order();
    orderEntity.order_uuid = order.order_uuid;
    orderEntity.customer_uuid = order.customer.customer_uuid;
    orderEntity.payment_uuid = order.payment.payment_uuid;
    orderEntity.order_status_id = OrderStatusEnum.PENDING;
    orderEntity.order_date = order.date;
    orderEntity.order_total = order.value;
    return orderEntity;
  }

  private _buildOrderItemsEntity(
    order: OrderRecord,
    orderId: number,
  ): OrderItem[] {
    return order.items.map((item) => {
      const orderItemEntity = new OrderItem();
      orderItemEntity.order_id = orderId;
      orderItemEntity.product_uuid = item.product_uuid;
      orderItemEntity.quantity = item.quantity;
      orderItemEntity.price = item.price;
      return orderItemEntity;
    });
  }

  private _buildOrderStatusHistoryEntity(
    orderId: number,
    orderStatusId: number,
  ): OrderStatusHistory {
    const orderStatusHistoryEntity = new OrderStatusHistory();
    orderStatusHistoryEntity.order_id = orderId;
    orderStatusHistoryEntity.order_status_id = orderStatusId;
    return orderStatusHistoryEntity;
  }

  async createOrder(order: OrderRecord): Promise<Order> {
    return this.orderRepository.manager.transaction(
      async (transaction: EntityManager) => {
        const orderEntity = this._buildOrderEntity(order);

        const newOrder = await transaction.save(orderEntity);

        const orderItemsEntity = this._buildOrderItemsEntity(
          order,
          newOrder.order_id,
        );

        await transaction.save(OrderItem, orderItemsEntity);

        const orderStatusHistoryEntity = this._buildOrderStatusHistoryEntity(
          newOrder.order_id,
          newOrder.order_status_id,
        );

        await transaction.save(OrderStatusHistory, orderStatusHistoryEntity);

        return newOrder;
      },
    );
  }
}
