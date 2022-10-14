import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { AccessoriesController } from './accessories.controller';
import { AccessoriesService } from './accessories.service';
import { AccessorySchema } from './schema/accessories.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: process.env.COLLECTION_KEY_ACCESSORIES, schema: AccessorySchema }
        ])
    ],
    controllers: [AccessoriesController],
    providers: [AccessoriesService],
    exports: [AccessoriesService]
})
export class AccessoriesModule {}
