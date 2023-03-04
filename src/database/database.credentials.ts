import { DataSourceOptions } from 'typeorm';

import { File } from 'api/files/entitiy/file.entity';
import { Product } from 'api/products/entity/product.entity';
import { User } from 'api/users/entity/user.entity';

export const DatabaseCredentials: DataSourceOptions = {
    type: 'postgres',
    host: 'mouse.db.elephantsql.com',
    port: 5432,
    username: 'rnlsfpmv',
    password: 'k_ZSFlTHxDRLcDKQbkT5UJiX29D9A0PL',
    database: 'rnlsfpmv',
    entities: [User, Product, File],
    synchronize: true,
    extra: {
        connectionLimit: 5
    }
};
