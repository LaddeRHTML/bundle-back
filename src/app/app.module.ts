import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';
import { AccessoriesModule } from 'api/accessories/accessories.module';
import { ApplicationsModule } from 'api/applications/applications.module';
import { AssemblyModule } from 'api/assemblies/assemblies.module';
import { AuthModule } from 'api/auth/auth.module';
import RoleGuard from 'api/auth/guards/role-auth.guard';
import { ClientsModule } from 'api/clients/clients.module';
import { FilesModule } from 'api/files/files.module';
import { OrdersModule } from 'api/orders/orders.module';
import { ProductsModule } from 'api/products/products.module';
import { UsersModule } from 'api/users/users.module';
import { ConfigurationModule } from 'config/configuration.module';
import { ConfigurationService } from 'config/configuration.service';

import { AppController } from './app.controller';

@Module({
    imports: [
        ConfigurationModule,
        MongooseModule.forRootAsync({
            imports: [ConfigurationModule],
            inject: [ConfigurationService],
            useFactory: (appConfigService: ConfigurationService) => {
                const options: MongooseModuleOptions = {
                    uri: appConfigService.connectionString,
                    useNewUrlParser: true,
                    useUnifiedTopology: true
                };
                return options;
            }
        }),
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
    controllers: [AppController],
    providers: []
})
export class AppModule {}
