import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ApplicationsController } from './applications.controller';
import { ApplicationsService } from './applications.service';
import { ApplicationsSchema } from './schema/applications.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: process.env.COLLECTION_KEY_APPLICATIONS, schema: ApplicationsSchema }
        ])
    ],
    controllers: [ApplicationsController],
    providers: [ApplicationsService]
})
export class ApplicationsModule {}
