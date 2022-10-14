import { Body, Controller, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'api/auth/guards/jwt-auth.guard';
import { apiVersion } from 'src/common/constants/api-const';
import { Pagination } from 'src/common/interfaces/utils.interface';

import { Client } from '../clients/schema/clients.schema';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrdersService } from './orders.service';
import { Order } from './schema/orders.schema';

@Controller(`${apiVersion}/orders`)
export class OrdersController {
    constructor(private readonly orderService: OrdersService) {}

    @UseGuards(JwtAuthGuard)
    @Post('/create?')
    create(
        @Query('clientId') clientId: string,
        @Body() createOrderDto: CreateOrderDto
    ): Promise<Order | Client> {
        return this.orderService.create(clientId, createOrderDto);
    }

    @UseGuards(JwtAuthGuard)
    @Get('/filter?')
    async findSortedItems(
        @Query('page') page: number,
        @Query('limit') limit: number
    ): Promise<Pagination> {
        return await this.orderService.findSortedItems(page, limit);
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    findAll(): Promise<Order[]> {
        return this.orderService.findAll();
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    findOne(@Param('id') id: string): Promise<Order> {
        return this.orderService.findOne(id);
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto): Promise<Order> {
        return this.orderService.update(id, updateOrderDto);
    }

    /* @Delete(':id')
  remove(@Param('id') id: string) {
    return this.clientsService.remove(id);
  } */
}
