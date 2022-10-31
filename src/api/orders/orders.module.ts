import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsService } from 'api/products/products.service';
import { ConfigurationModule } from 'config/configuration.module';

import { Client, ClientSchema } from '../clients/schema/clients.schema';
import { ClientsService } from './../clients/clients.service';
import { Product, ProductsSchema } from './../products/schema/products.schema';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { Order, OrdersSchema } from './schema/orders.schema';

@Module({
    imports: [
        ConfigurationModule,
        MongooseModule.forFeature([
            { name: Order.name, schema: OrdersSchema },
            { name: Client.name, schema: ClientSchema },
            { name: Product.name, schema: ProductsSchema }
        ])
    ],
    controllers: [OrdersController],
    providers: [OrdersService, ClientsService, ProductsService],
    exports: [OrdersService]
})
export class OrdersModule {}
