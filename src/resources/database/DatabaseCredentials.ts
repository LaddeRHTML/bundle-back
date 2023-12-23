import { DataSourceOptions } from 'typeorm';

import { File } from 'model/file/File';
import { Order } from 'model/order/Order';
import { Product } from 'model/product/Product';
import { User } from 'model/user/User';

export const DatabaseCredentials: DataSourceOptions = {
    type: 'postgres',
    // host: `${process.env.DATABASE_CONNECTION_HOST}`,
    // username: `${process.env.DATABASE_CONNECTION_USERNAME}`,
    // password: `${process.env.DATABASE_CONNECTION_PASSWORD}`,
    // database: `${process.env.DATABASE_CONNECTION_MAINTENANCE}`,
    url: `${process.env.DATABASE_CONNECTION_URL_EXTERNAL}`,
    entities: [User, Product, File, Order],
    synchronize: true,
    extra: {
        connectionLimit: 5
    }
};
