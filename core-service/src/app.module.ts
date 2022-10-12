import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MongooseModule } from '@nestjs/mongoose';
import { AccessoriesModule } from 'api/accessories/accessories.module';
import { ApplicationsModule } from 'api/applications/applications.module';
import { AssemblyModule } from 'api/assemblies/assemblies.module';
import { ClientsServiceModule } from 'api/clients/clients.module';
import { FilesModule } from 'api/files/files.module';
import { OrdersModule } from 'api/orders/orders.module';
import { ProductsModule } from 'api/products/products.module';
import { UsersModule } from 'api/users/users.module';
import { AuthModule } from 'auth/auth.module';

import { MongoConfigService } from './services/mongo-config.service';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true
        }),
        MongooseModule.forRootAsync({
            useClass: MongoConfigService
        }),
        UsersModule,
        AuthModule,
        ProductsModule,
        ApplicationsModule,
        FilesModule,
        ClientsServiceModule,
        OrdersModule,
        AccessoriesModule,
        AssemblyModule,
        // ClientsModule.register([
        //     {
        //         name: process.env.MICROSERVICE_NAME,
        //         transport: Transport.KAFKA,
        //         options: {
        //             client: {
        //                 clientId: process.env.MICROSERVICE_CLIENT_ID,
        //                 brokers: [`${process.env.BROKER_HOST}:${process.env.BROKER_PORT}`]
        //             },
        //             consumer: {
        //                 groupId: process.env.MICROSERVICE_CONSUMER
        //             }
        //         }
        //     }
        // ])
        ClientsModule.register([{ name: 'core-service', transport: Transport.TCP }])
    ],
    controllers: [],
    providers: []
})
export class AppModule {}
