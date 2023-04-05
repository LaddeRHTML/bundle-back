import { Module } from '@nestjs/common';

import { ConfigurationModule } from 'config/configuration.module';
import { DatabaseModule } from 'database/database.module';

import { AuthModule } from 'module/AuthModule';
import { CPUModule } from 'module/CPUModule';
import { FilesModule } from 'module/FileModule';
import { MotherboardModule } from 'module/MotherboardModule';
import { OrdersModule } from 'module/OrderModule';
import { ProductsModule } from 'module/ProductModule';
import { UsersModule } from 'module/UserModule';
import { RAMModule } from 'module/RAMModule';

@Module({
    imports: [
        ConfigurationModule,
        DatabaseModule,
        UsersModule,
        AuthModule,
        ProductsModule,
        FilesModule,
        OrdersModule,
        CPUModule,
        MotherboardModule,
        RAMModule
    ],
    controllers: [],
    providers: []
})
export class AppModule {}
