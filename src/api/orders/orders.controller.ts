// import {
//     Body,
//     Controller,
//     Delete,
//     Get,
//     Param,
//     Patch,
//     Post,
//     Query,
//     Req,
//     UseGuards
// } from '@nestjs/common';
// import { HasRoles } from 'api/auth/decorators/roles-decorator';
// import RoleGuard from 'api/auth/guards/role-auth.guard';
// import { UserPayload } from 'api/auth/interface/userId.interface';
// import { Role } from 'api/users/enum';
// import { Request } from 'express';
// import { apiVersion } from 'src/common/constants/api-const';
// import { Pagination } from 'src/common/interfaces/utils.interface';

// import { CreateOrderDto } from './dto/create-order.dto';
// import { UpdateOrderDto } from './dto/update-order.dto';
// import { OrdersService } from './orders.service';
// import { Order } from './schema/orders.schema';
// import { OrderStatus } from './types/order-status.types';

// const controllerName = `${apiVersion}/orders`;

// @Controller(controllerName)
// export class OrdersController {
//     constructor(private readonly orderService: OrdersService) {}

//     @HasRoles(Role.User, Role.Manager, Role.Admin)
//     @UseGuards(RoleGuard)
//     @Post('/create')
//     async createOne(@Body() createOrderDto: CreateOrderDto, @Req() req: Request) {
//         return await this.orderService.createOne(createOrderDto, req.user as UserPayload);
//     }

//     @HasRoles(Role.User, Role.Manager, Role.Admin)
//     @UseGuards(RoleGuard)
//     @Get('/price')
//     async getAllPrices() {
//         return await this.orderService.getAllPrices();
//     }

//     @HasRoles(Role.User, Role.Manager, Role.Admin)
//     @UseGuards(RoleGuard)
//     @Get()
//     async findAllBy(@Body() productDto: Order): Promise<Order[]> {
//         return await this.orderService.findAllBy(productDto);
//     }

//     @HasRoles(Role.User, Role.Manager, Role.Admin)
//     @UseGuards(RoleGuard)
//     @Post('/filter?')
//     async findSortedItems(
//         @Query('page') page: number,
//         @Query('limit') limit: number,
//         @Query('status') status: OrderStatus,
//         @Query('userId') userId: string,
//         @Body() createOrderDto: CreateOrderDto
//     ): Promise<Pagination<Order[]>> {
//         return await this.orderService.findSortedItems(page, limit, status, userId, createOrderDto);
//     }

//     @HasRoles(Role.User, Role.Manager, Role.Admin)
//     @UseGuards(RoleGuard)
//     @Get(':id')
//     async findOne(@Param('id') id: string): Promise<Order> {
//         return await this.orderService.findOne(id);
//     }

//     @HasRoles(Role.Manager, Role.Admin)
//     @UseGuards(RoleGuard)
//     @Patch('/assign/:id')
//     async assignOn(@Param('id') id: string, @Req() req: Request): Promise<Order> {
//         return await this.orderService.updateOne(
//             id,
//             { current_manager: req.user['userId'] },
//             req.user as UserPayload
//         );
//     }

//     @HasRoles(Role.Manager, Role.Admin)
//     @UseGuards(RoleGuard)
//     @Patch(':id')
//     async updateOne(
//         @Param('id') id: string,
//         @Body() updateOrderDto: UpdateOrderDto,
//         @Req() req: Request
//     ): Promise<Order> {
//         return await this.orderService.updateOne(id, updateOrderDto, req.user as UserPayload);
//     }

//     @HasRoles(Role.Manager, Role.Admin)
//     @UseGuards(RoleGuard)
//     @Patch('/close/:id')
//     async updateStatus(
//         @Param('id') id: string,
//         @Body() updateOrderDto: UpdateOrderDto,
//         @Req() req: Request
//     ): Promise<Order> {
//         return await this.orderService.updateStatus(
//             id,
//             updateOrderDto.status,
//             req.user as UserPayload
//         );
//     }

//     @HasRoles(Role.Admin)
//     @UseGuards(RoleGuard)
//     @Delete(':id')
//     async removeOneById(@Param('id') id: string) {
//         return await this.orderService.removeOneById(id);
//     }
// }
