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
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiSecurity,
  ApiTags,
  ApiUnauthorizedResponse,
  ApiForbiddenResponse,
} from '@nestjs/swagger';
import { ApiKeyGuard } from '../common/guards/api-key.guard';
import { UpdateStatusDto } from './dto/update-status.dto';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { FindOrdersQuery } from './dto/find-orders-query.dto';
import type { Response } from 'express';
import { Roles } from '../common/decorators/roles.decorator';
import { OrderResponseDto } from '../common/swagger/order-response.dto';

@ApiTags('orders')
@ApiSecurity('api-key')
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
  @ApiOperation({ summary: 'Get all orders' })
  @ApiOkResponse({
    description: 'Orders retrieved successfully.',
    type: OrderResponseDto,
    isArray: true,
  })
  @ApiUnauthorizedResponse({ description: 'Missing or invalid API key.' })
  findAll(@Query() query: FindOrdersQuery) {
    return this.orderService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an order by ID' })
  @ApiOkResponse({
    description: 'Order retrieved successfully.',
    type: OrderResponseDto,
  })
  @ApiNotFoundResponse({ description: 'Order not found.' })
  @ApiUnauthorizedResponse({ description: 'Missing or invalid API key.' })
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
  @ApiOperation({ summary: 'Update an order status' })
  @ApiOkResponse({
    description: 'Order status updated successfully.',
    type: OrderResponseDto,
  })
  @ApiBadRequestResponse({ description: 'Invalid order status.' })
  @ApiNotFoundResponse({ description: 'Order not found.' })
  @ApiUnauthorizedResponse({ description: 'Missing or invalid API key.' })
  updateStatus(@Param('id') id: string, @Body() dto: UpdateStatusDto) {
    return this.orderService.updateStatus(Number(id), dto.status);
  }

  @Roles('staff')
  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Delete an order' })
  @ApiNoContentResponse({ description: 'Order deleted successfully.' })
  @ApiNotFoundResponse({ description: 'Order not found.' })
  @ApiUnauthorizedResponse({ description: 'Missing or invalid API key.' })
  @ApiForbiddenResponse({ description: 'Staff role required.' })
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
  @ApiOperation({ summary: 'Create a new order' })
  @ApiCreatedResponse({
    description: 'Order created successfully.',
    type: OrderResponseDto,
  })
  @ApiBadRequestResponse({ description: 'Invalid order data.' })
  @ApiUnauthorizedResponse({ description: 'Missing or invalid API key.' })
  create(
    @Body() createOrderDto: CreateOrderDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const order = this.orderService.create(createOrderDto);
    response.location(`/api/v1/orders/${order.id}`);
    return order;
  }
}
