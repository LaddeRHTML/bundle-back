import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DatabaseCredentials } from './database.credentials';
import { AppDataSource } from './database.datasource';
import { DatabaseProvider } from './database.provider';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            useFactory: () => DatabaseCredentials,
            dataSourceFactory: async () => {
                return await AppDataSource.initialize();
            }
        })
    ]
})
export class DatabaseModule {}
