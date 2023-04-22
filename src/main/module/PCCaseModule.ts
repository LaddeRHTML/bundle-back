import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PCCaseController } from 'controller/PCCaseController';
import { PCCaseService } from 'service/PCCaseService';
import { PCCase } from 'model/accessories/PCCase/PCCase';

import { FanService } from 'service/FanService';
import { Fan } from 'model/accessories/Fan/Fan';

@Module({
    imports: [TypeOrmModule.forFeature([PCCase, Fan])],
    controllers: [PCCaseController],
    providers: [PCCaseService, FanService]
})
export class PCCaseModule {}
