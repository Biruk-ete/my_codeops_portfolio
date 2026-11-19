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
  Res,
  UsePipes,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common';
import { ApiKeyGuard } from '../common/guards/api-key.guard';
import { UpdateStatusDto } from './dto/update-status.dto';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { FindOrdersQuery } from './dto/find-orders-query.dto';
import type { Response } from 'express';
import { Roles } from '../common/decorators/roles.decorator';

@Controller({ path: 'orders', version: '1' })
@UseGuards(ApiKeyGuard)
export class OrdersController {
  constructor(private readonly orderService: OrderService) {}

  @UsePipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: false,
      transform: true,
    }),
  )
  @Get()
  findAll(@Query() query: FindOrdersQuery) {
    return this.orderService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderService.find(Number(id));
  }

  @UsePipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  )
  @Patch(':id/status')
  updateStatus(@Param('id') id: string, @Body() dto: UpdateStatusDto) {
    return this.orderService.updateStatus(Number(id), dto.status);
  }

  @Roles('staff')
  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string): void {
    this.orderService.remove(Number(id));
  }

  @UsePipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  )
  @Post()
  create(
    @Body() createOrderDto: CreateOrderDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const order = this.orderService.create(createOrderDto);
    response.location(`/api/v1/orders/${order.id}`);
    return order;
  }
}
