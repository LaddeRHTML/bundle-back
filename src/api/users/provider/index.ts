import { Provider } from '@nestjs/common';
import { AppDataSource } from 'src/database/database.datasource';

import { User } from '../entity/user.entity';

export const userProvider: Provider[] = [
    {
        provide: process.env.DATABASE_USERS_REPOSITORY_PROVIDER,
        useFactory: () => AppDataSource.getRepository(User),
        inject: [process.env.DATABASE_CONNECTION_PROVIDER]
    }
];
