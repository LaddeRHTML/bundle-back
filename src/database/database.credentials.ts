import { User } from 'api/users/entity/user.entity';
import { DataSourceOptions } from 'typeorm';

export const DatabaseCredentials: DataSourceOptions = {
    type: 'postgres',
    host: 'mouse.db.elephantsql.com',
    port: 5432,
    username: 'rnlsfpmv',
    password: 'k_ZSFlTHxDRLcDKQbkT5UJiX29D9A0PL',
    database: 'rnlsfpmv',
    entities: [User],
    synchronize: true
};
