import { DataSource } from 'typeorm';

import { DatabaseCredentials } from './database.credentials';

export const AppDataSource = new DataSource(DatabaseCredentials);
