import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProductsController } from 'controller/ProductController';

import { CPU } from 'model/accessories/CPU/CPU';
import { Cooler } from 'model/accessories/Cooler/Cooler';
import { HDD } from 'model/accessories/HDD/HDD';
import { Motherboard } from 'model/accessories/Motherboard/Motherboard';
import { RAM } from 'model/accessories/RAM/RAM';
import { File } from 'model/file/File';
import { Order } from 'model/order/Order';
import { Product } from 'model/product/Product';
import { User } from 'model/user/User';
import { PowerUnitModule } from './PowerUnitModule';

import { FilesService } from 'service/FileService';
import { ProductsService } from 'service/ProductService';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Product,
            File,
            Order,
            User,
            CPU,
            Motherboard,
            RAM,
            HDD,
            Cooler,
            PowerUnitModule
        ])
    ],
    controllers: [ProductsController],
    providers: [ProductsService, FilesService],
    exports: [ProductsService]
})
export class ProductsModule {}
