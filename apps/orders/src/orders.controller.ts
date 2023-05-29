import { Body, Controller, Get, Post } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderRequest } from './dto/create-order.request';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  createOrder(@Body() newOrder: CreateOrderRequest) {
    return this.ordersService.createOrder(newOrder);
  }

  @Get()
  getOrders() {
    return this.ordersService.getOrders();
  }
}
