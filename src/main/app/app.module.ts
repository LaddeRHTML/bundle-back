import { Module } from '@nestjs/common';

import { ConfigurationModule } from 'config/configuration.module';
import { DatabaseModule } from 'database/database.module';

import { AuthModule } from 'module/AuthModule';
import { CPUModule } from 'module/CPUModule';
import { CoolerModule } from 'module/CoolerModule';
import { FANModule } from 'module/FANModule';
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
        GPUModule,
        RAMModule,
        HDDModule,
        CoolerModule,
        FANModule,
        PowerUnitModule,
        PCCaseModule
    ],
    controllers: [],
    providers: []
})
export class AppModule {}
