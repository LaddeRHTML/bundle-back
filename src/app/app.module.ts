import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
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
        UsersModule,
        AuthModule,
        ProductsModule,
        FilesModule
        // OrdersModule,
    ],
    controllers: [],
    providers: []
})
export class AppModule {}
