import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
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
    console.log(req);

    return this.ordersService.getOrders();
  }

  // @Get('/by')
  // @UseGuards(JwtAuthGuard)
  // getOrdersByName(@Query() query: any) {
  //   console.log(query);

  //   return '123';
  //   // return this.ordersService.getOrders(searchQuery);
  // }

  @Get(':name')
  @UseGuards(JwtAuthGuard)
  async getOrdersByName(@Param('name') name: string) {
    const order = await this.ordersService.findOne(name);

    if (order) {
      return order;
    } else {
      return null;
    }
  }
}
