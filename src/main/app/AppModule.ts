import { Module } from '@nestjs/common';

import { ConfigurationModule } from 'config/configuration.module';
import { CacheModule } from 'cache/CacheModule';
import { DatabaseModule } from 'database/DatabaseModule';

import { AuthModule } from 'module/AuthModule';
import { CPUModule } from 'module/CPUModule';
import { CoolerModule } from 'module/CoolerModule';
import { FanModule } from 'module/FanModule';
import { FilesModule } from 'module/FileModule';
import { GPUModule } from 'module/GPUModule';
import { HDDModule } from 'module/HDDModule';
import { MotherboardModule } from 'module/MotherboardModule';
import { OrdersModule } from 'module/OrderModule';
import { PCCaseModule } from 'module/PCCaseModule';
import { PowerUnitModule } from 'module/PowerUnitModule';
import { ProductsModule } from 'module/ProductModule';
import { RAMModule } from 'module/RAMModule';
import { UsersModule } from 'module/UserModule';
import { AccessoriesModule } from 'module/AccessoriesModule';

@Module({
    imports: [
        ConfigurationModule,
        CacheModule,
        DatabaseModule,
        UsersModule,
        AuthModule,
        ProductsModule,
        FilesModule,
        OrdersModule,
        CPUModule,
        MotherboardModule,
        GPUModule,
        RAMModule,
        HDDModule,
        CoolerModule,
        FanModule,
        PowerUnitModule,
        PCCaseModule,
        AccessoriesModule
    ],
    controllers: [],
    providers: []
})
export class AppModule {}
