import { DataSourceOptions } from 'typeorm';

import { CPU } from 'model/accessories/CPU/CPU';
import { Cooler } from 'model/accessories/Cooler/Cooler';
import { FAN } from 'model/accessories/FAN/FAN';
import { GPU } from 'model/accessories/GPU/GPU';
import { HDD } from 'model/accessories/HDD/HDD';
import { Motherboard } from 'model/accessories/Motherboard/Motherboard';
import { PCCase } from 'model/accessories/PCCase/PCCase';
import { PowerUnit } from 'model/accessories/PowerUnit/PowerUnit';
import { RAM } from 'model/accessories/RAM/RAM';
import { File } from 'model/file/File';
import { Order } from 'model/order/Order';
import { Product } from 'model/product/Product';
import { User } from 'model/user/User';

export const DatabaseCredentials: DataSourceOptions = {
    type: 'postgres',
    host: `${process.env.DATABASE_CONNECTION_HOST}`,
    port: parseInt(`${process.env.DATABASE_CONNECTION_PORT}`),
    username: `${process.env.DATABASE_CONNECTION_USERNAME}`,
    password: `${process.env.DATABASE_CONNECTION_PASSWORD}`,
    database: `${process.env.DATABASE_CONNECTION_MAINTENANCE}`,
    entities: [
        User,
        Product,
        File,
        Order,
        CPU,
        Motherboard,
        GPU,
        RAM,
        HDD,
        Cooler,
        FAN,
        PowerUnit,
        PCCase
    ],
    synchronize: true,
    extra: {
        connectionLimit: 5
    }
};
