import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Query,
    Req,
    UseGuards
} from '@nestjs/common';
import { HasRoles } from 'api/auth/decorators/roles-decorator';
import RoleGuard from 'api/auth/guards/role-auth.guard';
import { UserPayload } from 'api/auth/interface/userId.interface';
import { Role } from 'api/users/enum/roles.enum';
import { Request } from 'express';
import { apiVersion } from 'src/common/constants/api-const';
import { Pagination } from 'src/common/interfaces/utils.interface';

import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrdersService } from './orders.service';
import { Order } from './schema/orders.schema';
import { OrderStatus } from './types/order-status.types';

const controllerName = `${apiVersion}/orders`;

@Controller(controllerName)
export class OrdersController {
    constructor(private readonly orderService: OrdersService) {}

    @HasRoles(Role.User, Role.Manager, Role.Admin)
    @UseGuards(RoleGuard)
    @Post('/create?')
    createOne(@Body() createOrderDto: CreateOrderDto, @Req() req: Request) {
        return this.orderService.createOne(createOrderDto, req.user as UserPayload);
    }

    @HasRoles(Role.User, Role.Manager, Role.Admin)
    @UseGuards(RoleGuard)
    @Get()
    findAllBy(@Body() productDto: Order): Promise<Order[]> {
        return this.orderService.findAllBy(productDto);
    }

    @HasRoles(Role.User, Role.Manager, Role.Admin)
    @UseGuards(RoleGuard)
    @Get('/filter?')
    async findSortedItems(
        @Query('page') page: number,
        @Query('limit') limit: number,
        @Query('status') status: OrderStatus,
        @Query('userId') userId: string
    ): Promise<Pagination<Order[]>> {
        return await this.orderService.findSortedItems(page, limit, status, userId);
    }

    @HasRoles(Role.User, Role.Manager, Role.Admin)
    @UseGuards(RoleGuard)
    @Get(':id')
    findOne(@Param('id') id: string): Promise<Order> {
        return this.orderService.findOne(id);
    }

    @HasRoles(Role.Manager, Role.Admin)
    @UseGuards(RoleGuard)
    @Patch('/assign/:id')
    assignOn(@Param('id') id: string, @Req() req: Request): Promise<Order> {
        return this.orderService.updateOne(
            id,
            { currentManager: req.user['userId'] },
            req.user as UserPayload
        );
    }

    @HasRoles(Role.Manager, Role.Admin)
    @UseGuards(RoleGuard)
    @Patch(':id')
    updateOne(
        @Param('id') id: string,
        @Body() updateOrderDto: UpdateOrderDto,
        @Req() req: Request
    ): Promise<Order> {
        return this.orderService.updateOne(id, updateOrderDto, req.user as UserPayload);
    }

    @HasRoles(Role.Manager, Role.Admin)
    @UseGuards(RoleGuard)
    @Patch('/close/:id')
    updateStatus(
        @Param('id') id: string,
        @Body() updateOrderDto: UpdateOrderDto,
        @Req() req: Request
    ): Promise<Order> {
        return this.orderService.updateStatus(id, updateOrderDto.status, req.user as UserPayload);
    }

    @HasRoles(Role.Admin)
    @UseGuards(RoleGuard)
    @Delete(':id')
    async removeOneById(@Param('id') id: string) {
        return await this.orderService.removeOneById(id);
    }
}
