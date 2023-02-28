import { Provider } from '@nestjs/common';

import { AppDataSource } from './database.datasource';

export const DatabaseProvider: Provider[] = [
    {
        provide: process.env.DATABASE_CONNECTION_PROVIDER,
        useFactory: async () => await AppDataSource.initialize()
    }
];
