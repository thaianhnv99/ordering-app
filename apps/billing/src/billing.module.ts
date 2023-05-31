import { Module } from '@nestjs/common';
import { BillingController } from './billing.controller';
import { BillingService } from './billing.service';
import {
  AuthModule,
  BILLING_SERVICE,
  RmqModule,
  RmqService,
} from '@app/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

@Module({
  imports: [
    AuthModule,
    RmqModule,
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        RABBIT_MQ_URI: Joi.string().required(),
        RABBIT_MQ_BILLING_QUEUE: Joi.string().required(),
      }),
    }),
  ],
  controllers: [BillingController],
  providers: [BillingService],
})
export class BillingModule {}
