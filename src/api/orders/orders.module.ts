import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'api/products/entity/product.entity';
import { User } from 'api/users/entity/user.entity';
import { ConfigurationModule } from 'common/config/configuration.module';

import { Order } from './entity/order.entity';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';

@Module({
    imports: [ConfigurationModule, TypeOrmModule.forFeature([Order, User, Product])],
    controllers: [OrdersController],
    providers: [OrdersService],
    exports: [OrdersService]
})
export class OrdersModule {}
