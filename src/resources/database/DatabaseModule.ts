import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DatabaseCredentials } from './DatabaseCredentials';
import { AppDataSource } from './DatabaseDatasource';

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
