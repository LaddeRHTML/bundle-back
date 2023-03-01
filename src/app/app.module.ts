import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccessoriesModule } from 'api/accessories/accessories.module';
import { ApplicationsModule } from 'api/applications/applications.module';
import { AssemblyModule } from 'api/assemblies/assemblies.module';
import { AuthModule } from 'api/auth/auth.module';
import { FilesModule } from 'api/files/files.module';
import { OrdersModule } from 'api/orders/orders.module';
import { ProductsModule } from 'api/products/products.module';
import { UsersModule } from 'api/users/users.module';
import { ConfigurationModule } from 'config/configuration.module';
import { ConfigurationService } from 'config/configuration.service';
import { DatabaseModule } from 'src/database/database.module';

@Module({
    imports: [
        ConfigurationModule,
        DatabaseModule,
        // MongooseModule.forRootAsync({
        //     imports: [ConfigurationModule],
        //     inject: [ConfigurationService],
        //     useFactory: (appConfigService: ConfigurationService) => {
        //         const options: MongooseModuleOptions = {
        //             uri: appConfigService.connectionString,
        //             useNewUrlParser: true,
        //             useUnifiedTopology: true
        //         };
        //         return options;
        //     }
        // }),
        UsersModule,
        AuthModule
        // ProductsModule,
        // ApplicationsModule,
        // FilesModule,
        // OrdersModule,
        // AccessoriesModule,
        // AssemblyModule
    ],
    controllers: [],
    providers: []
})
export class AppModule {}
