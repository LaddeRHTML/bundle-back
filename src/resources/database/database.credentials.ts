import { DataSourceOptions } from 'typeorm';

import { Order } from 'model/order/Order';
import { Product } from 'model/product/Product';
import { User } from 'model/user/User';
import { File } from 'model/file/File';

export const DatabaseCredentials: DataSourceOptions = {
    type: 'postgres',
    host: 'mouse.db.elephantsql.com',
    port: 5432,
    username: 'rnlsfpmv',
    password: 'k_ZSFlTHxDRLcDKQbkT5UJiX29D9A0PL',
    database: 'rnlsfpmv',
    entities: [User, Product, File, Order],
    synchronize: true,
    extra: {
        connectionLimit: 5
    }
};
