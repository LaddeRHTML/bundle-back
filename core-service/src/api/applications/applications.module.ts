import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ApplicationsController } from './applications.controller';
import { ApplicationsService } from './applications.service';
import { ApplicationsSchema } from './schemas/applications.schema';

@Module({
    imports: [MongooseModule.forFeature([{ name: 'applications', schema: ApplicationsSchema }])],
    controllers: [ApplicationsController],
    providers: [ApplicationsService]
})
export class ApplicationsModule {}
