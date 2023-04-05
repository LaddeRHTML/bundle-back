import { DataSourceOptions } from 'typeorm';

import { CPU } from 'model/accessories/CPU/CPU';
import { RAM } from 'model/accessories/RAM/RAM';
import { File } from 'model/file/File';
import { Order } from 'model/order/Order';
import { Product } from 'model/product/Product';
import { User } from 'model/user/User';
import { Motherboard } from 'model/accessories/Motherboard/Motherboard';
import { HDD } from 'model/accessories/HDD/HDD';
import { Cooler } from 'model/accessories/Cooler/Cooler';

export const DatabaseCredentials: DataSourceOptions = {
    type: 'postgres',
    host: `${process.env.DATABASE_CONNECTION_HOST}`,
    port: parseInt(`${process.env.DATABASE_CONNECTION_PORT}`),
    username: `${process.env.DATABASE_CONNECTION_USERNAME}`,
    password: `${process.env.DATABASE_CONNECTION_PASSWORD}`,
    database: `${process.env.DATABASE_CONNECTION_MAINTENANCE}`,
    entities: [User, Product, File, Order, CPU, Motherboard, RAM, HDD, Cooler],
    synchronize: true,
    extra: {
        connectionLimit: 5
    }
};
