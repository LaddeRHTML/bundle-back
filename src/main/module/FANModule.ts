import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FAN } from 'model/accessories/FAN/FAN';

import { FANController } from 'controller/FANController';
import { FANService } from 'service/FANService';

@Module({
    imports: [TypeOrmModule.forFeature([FAN])],
    controllers: [FANController],
    providers: [FANService]
})
export class FANModule {}
