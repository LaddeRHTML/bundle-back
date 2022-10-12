import { MongooseModuleOptions, MongooseOptionsFactory } from '@nestjs/mongoose';

export class MongoConfigService implements MongooseOptionsFactory {
    createMongooseOptions(): MongooseModuleOptions {
        return {
            uri: process.env.DB_CONN
        };
    }
}
