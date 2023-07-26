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
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

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
@ApiBearerAuth('JWT-auth')
export class OrdersController {
    constructor(private readonly orderService: OrdersService) {}

    @ApiOperation({ description: 'Создание заказа' })
    @HasRoles(Role.User, Role.Manager, Role.Admin)
    @UseGuards(RoleGuard)
    @Post('/create')
    async createOne(
        @Body() createOrderDto: CreateOrderDto,
        @Req() { user: { id } }: RequestWithUser
    ): Promise<Order> {
        return await this.orderService.createOne(createOrderDto, id);
    }

    @ApiOperation({ description: 'Поиск определенного заказа' })
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

    @ApiOperation({ description: 'Получение заказ по id' })
    @HasRoles(Role.User, Role.Manager, Role.Admin)
    @UseGuards(RoleGuard)
    @Get(':id')
    async findOne(@Param('id') id: string): Promise<Order | null> {
        return await this.orderService.findOneById(id);
    }

    @ApiOperation({ description: 'Назначить создателя заказа по id' })
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

    @ApiOperation({ description: 'Обновление заказа по id' })
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

    @ApiOperation({ description: 'Обновление статуса заказа по id' })
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

    @ApiOperation({ description: 'Удаление заказа по id' })
    @HasRoles(Role.Admin)
    @UseGuards(RoleGuard)
    @Delete(':id')
    async removeOneById(@Param('id') id: string) {
        return await this.orderService.removeOneById(id);
    }
}
