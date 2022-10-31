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
import { HasRoles } from 'api/auth/decorators/roles-decorator';
import RoleGuard from 'api/auth/guards/role-auth.guard';
import { Role } from 'api/users/enum/roles.enum';
import { apiVersion } from 'src/common/constants/api-const';
import { Pagination } from 'src/common/interfaces/utils.interface';

import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrdersService } from './orders.service';
import { Order } from './schema/orders.schema';

const controllerName = `${apiVersion}/orders`;

@Controller(controllerName)
export class OrdersController {
    constructor(private readonly orderService: OrdersService) {}

    @HasRoles(Role.Moderator, Role.Admin)
    @UseGuards(RoleGuard)
    @Post('/create?')
    create(@Query('clientId') clientId: string, @Body() createOrderDto: CreateOrderDto) {
        return this.orderService.create(clientId, createOrderDto);
    }

    @HasRoles(Role.User, Role.Moderator, Role.Admin)
    @UseGuards(RoleGuard)
    @Get('/filter?')
    async findSortedItems(
        @Query('page') page: number,
        @Query('limit') limit: number
    ): Promise<Pagination> {
        return await this.orderService.findSortedItems(page, limit);
    }

    @HasRoles(Role.User, Role.Moderator, Role.Admin)
    @UseGuards(RoleGuard)
    @Get()
    findAll(): Promise<Order[]> {
        return this.orderService.findAll();
    }

    @HasRoles(Role.User, Role.Moderator, Role.Admin)
    @UseGuards(RoleGuard)
    @Get(':id')
    findOne(@Param('id') id: string): Promise<Order> {
        return this.orderService.findOne(id);
    }

    @HasRoles(Role.Moderator, Role.Admin)
    @UseGuards(RoleGuard)
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto): Promise<Order> {
        return this.orderService.update(id, updateOrderDto);
    }

    @HasRoles(Role.Admin)
    @UseGuards(RoleGuard)
    @Delete(':id')
    async remove(@Param('id') id: string) {
        return await this.orderService.remove(id);
    }
}
