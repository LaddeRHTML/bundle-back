import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from 'api/users/entity/user.entity';
import { File } from 'api/files/entitiy/file.entity';
import { Product } from 'api/products/entity/product.entity';

import { DatabaseCredentials } from './database.credentials';
import { AppDataSource } from './database.datasource';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            useFactory: () => DatabaseCredentials,
            dataSourceFactory: async () => {
                return await AppDataSource.initialize();
            }
        }),
        TypeOrmModule.forFeature([User, File, Product])
    ]
})
export class DatabaseModule {}
