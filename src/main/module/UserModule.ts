import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersController } from 'controller/UserController';

import { File } from 'model/file/File';
import { Order } from 'model/order/Order';
import { User } from 'model/user/User';

import { FilesService } from 'service/FileService';
import { UsersService } from 'service/UserService';

@Module({
    imports: [TypeOrmModule.forFeature([User, File, Order])],
    controllers: [UsersController],
    providers: [UsersService, FilesService],
    exports: [UsersService]
})
export class UsersModule {}
