import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderRequest } from './dto/create-order.request';
import { JwtAuthGuard } from '@app/common';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  createOrder(@Body() newOrder: CreateOrderRequest) {
    return this.ordersService.createOrder(newOrder);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  getOrders(@Req() req: any) {
    return this.ordersService.getOrders();
  }
}
