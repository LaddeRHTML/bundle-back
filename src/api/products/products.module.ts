import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ClientsModule } from 'api/clients/clients.module';
import { Client, ClientSchema } from 'api/clients/schema/clients.schema';
import { Order, OrdersSchema } from 'api/orders/schema/orders.schema';

import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { Product, ProductsSchema } from './schema/products.schema';

@Module({
    imports: [
        ClientsModule,
        MongooseModule.forFeature([
            { name: Product.name, schema: ProductsSchema },
            { name: Order.name, schema: OrdersSchema },
            { name: Client.name, schema: ClientSchema }
        ])
    ],
    controllers: [ProductsController],
    providers: [ProductsService],
    exports: [ProductsService]
})
export class ProductsModule {}
