import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrdersSchema } from 'api/orders/schema/orders.schema';

import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { Product, ProductsSchema } from './schema/products.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Product.name, schema: ProductsSchema },
            { name: Order.name, schema: OrdersSchema }
        ])
    ],
    controllers: [ProductsController],
    providers: [ProductsService],
    exports: [ProductsService]
})
export class ProductsModule {}
