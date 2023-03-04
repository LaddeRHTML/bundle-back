import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { File } from 'api/files/entitiy/file.entity';
import { FilesService } from 'api/files/files.service';
import { Order } from 'api/orders/entity/order.entity';
import { ConfigurationModule } from 'common/config/configuration.module';

import { User } from './entity/user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
    imports: [ConfigurationModule, TypeOrmModule.forFeature([User, File, Order])],
    controllers: [UsersController],
    providers: [UsersService, FilesService],
    exports: [UsersService]
})
export class UsersModule {}
