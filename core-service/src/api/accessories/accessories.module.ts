import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AccessoriesController } from './accessories.controller';
import { AccessorySchema } from './accessories.schema';
import { AccessoriesService } from './accessories.service';

@Module({
    imports: [MongooseModule.forFeature([{ name: 'accessories', schema: AccessorySchema }])],
    controllers: [AccessoriesController],
    providers: [AccessoriesService],
    exports: [AccessoriesService]
})
export class AccessoriesModule {}
