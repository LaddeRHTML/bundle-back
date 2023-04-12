import {
    Body,
    Controller,
    DefaultValuePipe,
    Delete,
    Get,
    Param,
    ParseArrayPipe,
    Patch,
    Post,
    Query,
    Req,
    UseGuards
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { HasRoles } from 'auth/decorators/roles-decorator';
import RoleGuard from 'auth/guards/role-auth.guard';

import { PageOptionsDto } from 'common/pagination/dtos/page-options.dto';
import { PageDto } from 'common/pagination/dtos/page.dto';

import { CreateOrderDto } from 'dto/Order/CreateOrderDto';
import { UpdateOrderDto } from 'dto/Order/UpdateOrderDto';

import { Order } from 'model/order/Order';
import { Status } from 'model/order/OrderEnums';
import { Role } from 'model/user/UserEnums';

import { RequestWithUser } from 'service/AuthService';
import { OrdersService, SearchByChild } from 'service/OrderService';

export type AllowedOrderRelations = ['client', 'delivered_by', 'current_manager', 'products'];

@ApiTags('Orders')
@Controller('/orders')
export class OrdersController {
    constructor(private readonly orderService: OrdersService) {}

    @HasRoles(Role.User, Role.Manager, Role.Admin)
    @UseGuards(RoleGuard)
    @Post('/create')
    async createOne(
        @Body() createOrderDto: CreateOrderDto,
        @Req() { user: { id } }: RequestWithUser
    ): Promise<Order> {
        return await this.orderService.createOne(createOrderDto, id);
    }

    @HasRoles(Role.User, Role.Manager, Role.Admin)
    @UseGuards(RoleGuard)
    @Post('/search?')
    async findSome(
        @Query() pageOptionsDto: PageOptionsDto,
        @Query() searchByChild: SearchByChild,
        @Query(
            'relations',
            new DefaultValuePipe([]),
            new ParseArrayPipe({
                items: String,
                separator: ',',
                optional: true
            })
        )
        relations: AllowedOrderRelations,
        @Body() filter: Partial<Order>
    ): Promise<PageDto<Order>> {
        return await this.orderService.findSome(pageOptionsDto, relations, searchByChild, filter);
    }

    @HasRoles(Role.User, Role.Manager, Role.Admin)
    @UseGuards(RoleGuard)
    @Get(':id')
    async findOne(@Param('id') id: string): Promise<Order | null> {
        return await this.orderService.findOne({
            where: { id }
        });
    }

    @HasRoles(Role.Manager, Role.Admin)
    @UseGuards(RoleGuard)
    @Patch('/assign/:id')
    async assignOn(
        @Param('id') id: string,
        @Body() updateOrderDto: UpdateOrderDto,
        @Req() { user: { id: userId } }: RequestWithUser
    ): Promise<Order> {
        return await this.orderService.updateOne(id, { ...updateOrderDto }, userId);
    }

    @HasRoles(Role.Manager, Role.Admin)
    @UseGuards(RoleGuard)
    @Patch(':id')
    async updateOne(
        @Param('id') id: string,
        @Body() updateOrderDto: UpdateOrderDto,
        @Req() { user: { id: userId } }: RequestWithUser
    ): Promise<Order> {
        return await this.orderService.updateOne(id, updateOrderDto, userId);
    }

    @HasRoles(Role.Manager, Role.Admin)
    @UseGuards(RoleGuard)
    @Patch('/close/:id')
    async updateStatus(
        @Param('id') id: string,
        @Body() status: Status,
        @Req() { user: { id: userId } }: RequestWithUser
    ): Promise<Order> {
        return await this.orderService.updateStatus(id, status, userId);
    }

    @HasRoles(Role.Admin)
    @UseGuards(RoleGuard)
    @Delete(':id')
    async removeOneById(@Param('id') id: string) {
        return await this.orderService.removeOneById(id);
    }
}
