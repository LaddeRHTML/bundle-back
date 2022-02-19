import { Module } from '@nestjs/common';
import { ApplicationsService } from './applications.service';
import { ApplicationsController } from './applications.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ApplicationsSchema } from './applications.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{name: "applications", schema: ApplicationsSchema}])
  ],
  controllers: [ApplicationsController],
  providers: [ApplicationsService]
})
export class ApplicationsModule {}
