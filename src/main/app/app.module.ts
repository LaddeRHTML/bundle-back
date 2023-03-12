import { Module } from '@nestjs/common';

import { ConfigurationModule } from 'config/configuration.module';
import { DatabaseModule } from 'database/database.module';

import { AuthModule } from 'module/AuthModule';
import { CPUModule } from 'module/CPUModule';
import { CoolerModule } from 'module/CoolerModule';
import { FilesModule } from 'module/FileModule';
import { OrdersModule } from 'module/OrderModule';
import { ProductsModule } from 'module/ProductModule';
import { UsersModule } from 'module/UserModule';

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
        CoolerModule
    ],
    controllers: [],
    providers: []
})
export class AppModule {}
