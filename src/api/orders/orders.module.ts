import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ClientSchema } from '../clients/schema/clients.schema';
import { ClientsService } from './../clients/clients.service';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { OrdersSchema } from './schema/orders.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: process.env.COLLECTION_KEY_ORDERS, schema: OrdersSchema }
        ]),
        MongooseModule.forFeature([
            { name: process.env.COLLECTION_KEY_CLIENTS, schema: ClientSchema }
        ])
    ],
    controllers: [OrdersController],
    providers: [OrdersService, ClientsService],
    exports: [OrdersService]
})
export class OrdersModule {}
