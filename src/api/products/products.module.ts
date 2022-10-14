import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { ProductsSchema } from './schema/products.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: process.env.COLLECTION_KEY_PRODUCTS, schema: ProductsSchema }
        ])
    ],
    controllers: [ProductsController],
    providers: [ProductsService],
    exports: [ProductsService]
})
export class ProductsModule {}
