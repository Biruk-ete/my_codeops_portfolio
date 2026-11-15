import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { UpdateStatusDto } from './dto/update-status.dto';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { FindOrdersQuery } from './dto/find-orders-query.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  findAll(@Query() query: FindOrdersQuery) {
    return this.orderService.findAll(query);
  }

  @Get('pending')
  findPending(@Query() query: FindOrdersQuery) {
    return this.orderService.findPending(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderService.find(Number(id));
  }

  @Patch(':id/status')
  updateStatus(@Param('id') id: string, @Body() dto: UpdateStatusDto) {
    return this.orderService.updateStatus(Number(id), dto.status);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string): void {
    this.orderService.remove(Number(id));
  }

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.create(createOrderDto);
  }
}
