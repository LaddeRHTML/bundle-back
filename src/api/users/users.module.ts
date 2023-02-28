import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order, OrdersSchema } from 'api/orders/schema/orders.schema';
import { ConfigurationModule } from 'config/configuration.module';
import { DatabaseModule } from 'src/database/database.module';

import { User } from './entity/user.entity';
import { userProvider } from './provider';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
    imports: [
        ConfigurationModule,
        // MongooseModule.forFeature([
        //     { name: User.name, schema: UserSchema },
        //     { name: Order.name, schema: OrdersSchema }
        // ]),
        TypeOrmModule.forFeature([User])
    ],
    controllers: [UsersController],
    providers: [UsersService],
    exports: [UsersService]
})
export class UsersModule {}
