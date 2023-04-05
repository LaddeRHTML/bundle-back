import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProductsController } from 'controller/ProductController';

import { File } from 'model/file/File';
import { Order } from 'model/order/Order';
import { Product } from 'model/product/Product';
import { User } from 'model/user/User';
import { CPU } from 'model/accessories/CPU/CPU';
import { Motherboard } from 'model/accessories/Motherboard/Motherboard';

import { FilesService } from 'service/FileService';
import { ProductsService } from 'service/ProductService';

@Module({
    imports: [TypeOrmModule.forFeature([Product, File, Order, User, CPU, Motherboard])],
    controllers: [ProductsController],
    providers: [ProductsService, FilesService],
    exports: [ProductsService]
})
export class ProductsModule {}
