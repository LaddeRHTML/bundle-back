import { DataSource } from 'typeorm';

import { DatabaseCredentials } from './DatabaseCredentials';

export const AppDataSource = new DataSource(DatabaseCredentials);
