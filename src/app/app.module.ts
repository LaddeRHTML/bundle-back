import { Module } from '@nestjs/common';
import { AuthModule } from 'api/auth/auth.module';
import { FilesModule } from 'api/files/files.module';
// import { OrdersModule } from 'api/orders/orders.module';
import { ProductsModule } from 'api/products/products.module';
import { UsersModule } from 'api/users/users.module';
import { ConfigurationModule } from 'common/config/configuration.module';
import { DatabaseModule } from 'database/database.module';

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
