import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProductsController } from 'controller/ProductController';
import { ProductsService } from 'service/ProductService';
import { Product } from 'model/product/Product';

import { FilesService } from 'service/FileService';
import { File } from 'model/file/File';
import { Order } from 'model/order/Order';
import { User } from 'model/user/User';

@Module({
    imports: [TypeOrmModule.forFeature([Product, File, Order, User])],
    controllers: [ProductsController],
    providers: [ProductsService, FilesService],
    exports: [ProductsService]
})
export class ProductsModule {}
