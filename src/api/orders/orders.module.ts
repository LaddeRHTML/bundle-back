import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigurationModule } from 'config/configuration.module';

import { Client, ClientSchema } from '../clients/schema/clients.schema';
import { ClientsService } from './../clients/clients.service';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { Order, OrdersSchema } from './schema/orders.schema';

@Module({
    imports: [
        ConfigurationModule,
        MongooseModule.forFeature([
            { name: Order.name, schema: OrdersSchema },
            { name: Client.name, schema: ClientSchema }
        ])
    ],
    controllers: [OrdersController],
    providers: [OrdersService, ClientsService],
    exports: [OrdersService]
})
export class OrdersModule {}
