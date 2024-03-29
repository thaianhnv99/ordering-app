import { Inject, Injectable } from '@nestjs/common';
import { CreateOrderRequest } from './dto/create-order.request';
import { OrderDocument } from './schemas/order.schema';
import { OrdersRepository } from './orders.repository';
import { BILLING_SERVICE } from '@app/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { FilterQuery } from 'mongoose';

@Injectable()
export class OrdersService {
  constructor(
    private readonly orderRepository: OrdersRepository,
    @Inject(BILLING_SERVICE) private billingService: ClientProxy,
  ) {}

  async createOrder(
    newOrder: CreateOrderRequest,
    authentication: string,
  ): Promise<OrderDocument> {
    const session = await this.orderRepository.startTransactions();
    try {
      const order = await this.orderRepository.create(newOrder, { session });
      await lastValueFrom(
        this.billingService.emit('order_created', {
          request: newOrder,
          Authentication: authentication,
        }),
      );

      await session.commitTransaction();
      return order;
    } catch (error) {
      session.abortTransaction();
      throw error;
    }
  }

  async getOrders(
    filter?: FilterQuery<OrderDocument>,
  ): Promise<OrderDocument[]> {
    return this.orderRepository.find(filter);
  }

  async findOne(name: string): Promise<OrderDocument> {
    return await this.orderRepository.findOne({
      name,
    });
  }
}
