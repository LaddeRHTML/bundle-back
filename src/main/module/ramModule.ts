import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RAM } from 'model/accessories/RAM/RAM';

import { RAMController } from 'controller/RAMController';
import { RAMService } from 'service/RAMService';

@Module({
    imports: [TypeOrmModule.forFeature([RAM])],
    controllers: [RAMController],
    providers: [RAMService]
})
export class RAMModule {}
