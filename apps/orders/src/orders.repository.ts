import { AbstractRepository } from '@app/common';
import { Injectable, Logger } from '@nestjs/common';
import { OrderDocument } from './schemas/order.schema';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';

@Injectable()
export class OrdersRepository extends AbstractRepository<OrderDocument> {
  protected readonly logger = new Logger(OrdersRepository.name);

  constructor(
    @InjectModel(OrderDocument.name)
    private readonly orderModel: Model<OrderDocument>,
    @InjectConnection() connection: Connection,
  ) {
    super(orderModel, connection);
  }
}
