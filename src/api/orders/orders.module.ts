import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsModule } from 'api/products/products.module';
import { ProductsService } from 'api/products/products.service';
import { Product, ProductsSchema } from 'api/products/schema/products.schema';
import { UsersService } from 'api/users/users.service';
import { ConfigurationModule } from 'config/configuration.module';

// import { OrdersController } from './orders.controller';
// import { OrdersService } from './orders.service';
import { Order, OrdersSchema } from './schema/orders.schema';

@Module({
    imports: [
        ConfigurationModule,
        MongooseModule.forFeature([
            { name: Order.name, schema: OrdersSchema },
            // { name: User.name, schema: UserSchema },
            { name: Product.name, schema: ProductsSchema }
        ])
    ],
    controllers: [
        /* OrdersController */
    ],
    providers: [, /* OrdersService */ ProductsService, UsersService],
    exports: [
        /* OrdersService */
    ]
})
export class OrdersModule {}
