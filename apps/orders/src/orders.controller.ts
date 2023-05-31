import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderRequest } from './dto/create-order.request';
import { JwtAuthGuard } from '@app/common';
import { Request } from 'express';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  createOrder(@Body() newOrder: CreateOrderRequest, @Req() request: Request) {
    return this.ordersService.createOrder(
      newOrder,
      request?.cookies?.Authentication,
    );
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  getOrders(@Req() req: any) {
    return this.ordersService.getOrders();
  }
}
