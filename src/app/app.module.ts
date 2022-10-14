import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AccessoriesModule } from 'api/accessories/accessories.module';
import { ApplicationsModule } from 'api/applications/applications.module';
import { AssemblyModule } from 'api/assemblies/assemblies.module';
import { AuthModule } from 'api/auth/auth.module';
import { ClientsModule } from 'api/clients/clients.module';
import { FilesModule } from 'api/files/files.module';
import { OrdersModule } from 'api/orders/orders.module';
import { ProductsModule } from 'api/products/products.module';
import { UsersModule } from 'api/users/users.module';

import configuration from '../common/config/configuration';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [configuration]
        }),
        /* MongooseModule.forRoot(process.env.MONGODB_URI, {
            imports: [ConfigModule],
            inject: [ConfigService]
        }), */
        /* MongooseModule.forRoot(process.env.DB_CONN, {
            useNewUrlParser: true
        }), */
        UsersModule,
        AuthModule,
        ProductsModule,
        ApplicationsModule,
        FilesModule,
        ClientsModule,
        OrdersModule,
        AccessoriesModule,
        AssemblyModule
    ],
    controllers: [],
    providers: []
})
export class AppModule {}
