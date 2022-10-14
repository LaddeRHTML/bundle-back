import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ClientsController } from './clients.controller';
import { ClientsService } from './clients.service';
import { ClientSchema } from './schema/clients.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: process.env.COLLECTION_KEY_CLIENTS, schema: ClientSchema }
        ])
    ],
    controllers: [ClientsController],
    providers: [ClientsService],
    exports: [ClientsService]
})
export class ClientsModule {}
