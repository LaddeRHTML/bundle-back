import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { Controller, Get, Post, Body, Patch, Param, UseGuards, Query } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PaginationTypes } from 'src/interfaces/utils.interface';
import { Order } from './orders.schema';
import { Client } from '../clients/clients.schema';

@Controller('orders')
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
    ): Promise<PaginationTypes> {
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
