import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ApplicationsController } from './applications.controller';
import { ApplicationsService } from './applications.service';
import { Application, ApplicationsSchema } from './schema/applications.schema';

@Module({
    imports: [MongooseModule.forFeature([{ name: Application.name, schema: ApplicationsSchema }])],
    controllers: [ApplicationsController],
    providers: [ApplicationsService]
})
export class ApplicationsModule {}
