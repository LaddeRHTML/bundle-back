import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Query,
    UseGuards
} from '@nestjs/common';
import RoleGuard from 'api/auth/guards/role-auth.guard';
import { Role } from 'api/users/enum/roles.enum';
import { apiVersion } from 'src/common/constants/api-const';
import { Pagination } from 'src/common/interfaces/utils.interface';

import { Client } from '../clients/schema/clients.schema';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrdersService } from './orders.service';
import { Order } from './schema/orders.schema';

const controllerName = `${apiVersion}/orders`;

@Controller(controllerName)
export class OrdersController {
    constructor(private readonly orderService: OrdersService) {}

    @UseGuards(RoleGuard(Role.Moderator))
    @UseGuards(RoleGuard(Role.Admin))
    @Post('/create?')
    create(
        @Query('clientId') clientId: string,
        @Body() createOrderDto: CreateOrderDto
    ): Promise<Order | Client> {
        return this.orderService.create(clientId, createOrderDto);
    }

    @UseGuards(RoleGuard(Role.User))
    @UseGuards(RoleGuard(Role.Moderator))
    @UseGuards(RoleGuard(Role.Admin))
    @Get('/filter?')
    async findSortedItems(
        @Query('page') page: number,
        @Query('limit') limit: number
    ): Promise<Pagination> {
        return await this.orderService.findSortedItems(page, limit);
    }

    @UseGuards(RoleGuard(Role.User))
    @UseGuards(RoleGuard(Role.Moderator))
    @UseGuards(RoleGuard(Role.Admin))
    @Get()
    findAll(): Promise<Order[]> {
        return this.orderService.findAll();
    }

    @UseGuards(RoleGuard(Role.User))
    @UseGuards(RoleGuard(Role.Moderator))
    @UseGuards(RoleGuard(Role.Admin))
    @Get(':id')
    findOne(@Param('id') id: string): Promise<Order> {
        return this.orderService.findOne(id);
    }

    @UseGuards(RoleGuard(Role.Moderator))
    @UseGuards(RoleGuard(Role.Admin))
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto): Promise<Order> {
        return this.orderService.update(id, updateOrderDto);
    }

    @UseGuards(RoleGuard(Role.Admin))
    @Delete(':id')
    async remove(@Param('id') id: string) {
        return await this.orderService.remove(id);
    }
}
