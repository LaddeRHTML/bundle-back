import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { OrdersController } from 'controller/OrderController';
import { OrdersService } from 'service/OrderService';
import { Order } from 'model/order/Order';

import { UsersService } from 'service/UserService';
import { User } from 'model/user/User';

import { ProductsService } from 'service/ProductService';
import { Product } from 'model/product/Product';

@Module({
    imports: [TypeOrmModule.forFeature([Order, User, Product])],
    controllers: [OrdersController],
    providers: [OrdersService, ProductsService, UsersService],
    exports: [OrdersService]
})
export class OrdersModule {}
