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
import { UpdateResult } from 'typeorm';

import { HasRoles } from 'api/auth/decorators/roles-decorator';
import RoleGuard from 'api/auth/guards/role-auth.guard';
import { RequestWithUser } from 'api/auth/interface/auth.interface';
import { Role } from 'api/users/enum';
import { PageOptionsDto } from 'common/pagination/dtos/page-options.dto';
import { apiVersion } from 'common/constants/api-const';

import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrdersService } from './orders.service';
import { PageDto } from 'common/pagination/dtos/page.dto';
import { Order } from './entity/order.entity';
import { Status } from './enums/order.enums';

const controllerName = `${apiVersion}/orders`;

@Controller(controllerName)
export class OrdersController {
    constructor(private readonly orderService: OrdersService) {}

    @HasRoles(Role.User, Role.Manager, Role.Admin)
    @UseGuards(RoleGuard)
    @Post('/create')
    async createOne(
        @Body() createOrderDto: CreateOrderDto,
        @Req() { user }: RequestWithUser
    ): Promise<Order> {
        const userId = user['userId'];
        return await this.orderService.createOne(createOrderDto, userId);
    }

    @HasRoles(Role.User, Role.Manager, Role.Admin)
    @UseGuards(RoleGuard)
    @Post('/search?')
    async findSome(@Query() pageOptionsDto: PageOptionsDto): Promise<PageDto<Order>> {
        return await this.orderService.findSome(pageOptionsDto);
    }

    @HasRoles(Role.User, Role.Manager, Role.Admin)
    @UseGuards(RoleGuard)
    @Get(':id')
    async findOne(@Param('id') id: string): Promise<Order | null> {
        return await this.orderService.findOne({
            where: { id },
            relations: {
                client: true,
                products: true,
                delivered_by: true
            }
        });
    }

    @HasRoles(Role.Manager, Role.Admin)
    @UseGuards(RoleGuard)
    @Patch('/assign/:id')
    async assignOn(
        @Param('id') id: string,
        @Body() updateOrderDto: UpdateOrderDto,
        @Req() { user }: RequestWithUser
    ): Promise<UpdateResult> {
        return await this.orderService.updateOne(
            id,
            { ...updateOrderDto, current_manager: user['userId'] },
            user.userId
        );
    }

    @HasRoles(Role.Manager, Role.Admin)
    @UseGuards(RoleGuard)
    @Patch(':id')
    async updateOne(
        @Param('id') id: string,
        @Body() updateOrderDto: UpdateOrderDto,
        @Req() { user }: RequestWithUser
    ): Promise<UpdateResult> {
        return await this.orderService.updateOne(id, updateOrderDto, user.userId);
    }

    @HasRoles(Role.Manager, Role.Admin)
    @UseGuards(RoleGuard)
    @Patch('/close/:id')
    async updateStatus(
        @Param('id') id: string,
        @Body() status: Status,
        @Req() { user }: RequestWithUser
    ): Promise<UpdateResult> {
        return await this.orderService.updateStatus(id, status, user.userId);
    }

    @HasRoles(Role.Admin)
    @UseGuards(RoleGuard)
    @Delete(':id')
    async removeOneById(@Param('id') id: string) {
        return await this.orderService.removeOneById(id);
    }
}
