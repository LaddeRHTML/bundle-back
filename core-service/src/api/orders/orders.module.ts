import { ClientSchema } from '../clients/clients.schema';
import { ClientsService } from './../clients/clients.service';
import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { OrdersSchema } from './orders.schema';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'orders', schema: OrdersSchema }]),
        MongooseModule.forFeature([{ name: 'clients', schema: ClientSchema }])
    ],
    controllers: [OrdersController],
    providers: [OrdersService, ClientsService],
    exports: [OrdersService]
})
export class OrdersModule {}
