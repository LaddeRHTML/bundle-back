import { ProductsSchema } from './products.schema';
import { ProductsController } from './products.controller';
import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Product } from './products.schema';

@Module({
    imports: [MongooseModule.forFeature([{ name: 'products', schema: ProductsSchema }])],
    controllers: [ProductsController],
    providers: [ProductsService],
    exports: [ProductsService]
})
export class ProductsModule {}
