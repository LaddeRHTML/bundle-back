import { Module } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { ClientsController } from './clients.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ClientSchema } from './clients.schema';

@Module({
    imports: [MongooseModule.forFeature([{ name: 'clients', schema: ClientSchema }])],
    controllers: [ClientsController],
    providers: [ClientsService],
    exports: [ClientsService]
})
export class ClientsServiceModule {}
