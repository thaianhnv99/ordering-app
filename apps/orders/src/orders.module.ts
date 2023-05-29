import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { BILLING_SERVICE, DatabaseModule, RmqModule } from '@app/common';
import { OrdersRepository } from './orders.repository';
import { OrderDocument, OrderSchema } from './schemas/order.schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        MONGODB_URI: Joi.string().required(),
        PORT: Joi.number().required(),
      }),
      envFilePath: './apps/orders/.env',
    }),
    DatabaseModule.forFeature([
      {
        name: OrderDocument.name,
        schema: OrderSchema,
      },
    ]),
    RmqModule.register({ name: BILLING_SERVICE }),
    DatabaseModule,
  ],
  controllers: [OrdersController],
  providers: [OrdersService, OrdersRepository],
})
export class OrdersModule {}
