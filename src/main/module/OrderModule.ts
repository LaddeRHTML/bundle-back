import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { OrdersController } from 'controller/OrderController';

import { Order } from 'model/order/Order';
import { Product } from 'model/product/Product';
import { User } from 'model/user/User';

import { OrdersService } from 'service/OrderService';

@Module({
    imports: [TypeOrmModule.forFeature([Order, User, Product])],
    controllers: [OrdersController],
    providers: [OrdersService],
    exports: [OrdersService]
})
export class OrdersModule {}
