import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { OrdersController } from 'controller/OrderController';
import { OrdersService } from 'service/OrderService';
import { Order } from 'model/order/Order';

import { UsersService } from 'service/UserService';
import { User } from 'model/user/User';

import { HDDService } from 'service/HDDService';
import { HDD } from 'model/accessories/HDD/HDD';

import { ProductsService } from 'service/ProductService';
import { Product } from 'model/product/Product';

@Module({
    imports: [TypeOrmModule.forFeature([Order, User, Product, HDD])],
    controllers: [OrdersController],
    providers: [OrdersService, ProductsService, UsersService, HDDService],
    exports: [OrdersService]
})
export class OrdersModule {}
