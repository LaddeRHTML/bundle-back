import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProductsController } from 'controller/ProductController';
import { ProductsService } from 'service/ProductService';
import { Product } from 'model/product/Product';

import { FilesService } from 'service/FileService';
import { File } from 'model/file/File';

import { HDDService } from 'service/HDDService';
import { HDD } from 'model/accessories/HDD/HDD';

import { CPU } from 'model/accessories/CPU/CPU';
import { Cooler } from 'model/accessories/Cooler/Cooler';
import { Motherboard } from 'model/accessories/Motherboard/Motherboard';
import { RAM } from 'model/accessories/RAM/RAM';
import { Order } from 'model/order/Order';
import { User } from 'model/user/User';
import { PowerUnitModule } from './PowerUnitModule';

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
    providers: [ProductsService, FilesService, HDDService],
    exports: [ProductsService]
})
export class ProductsModule {}
