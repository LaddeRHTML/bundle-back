import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FanController } from 'controller/FanController';
import { FanService } from 'service/FanService';
import { Fan } from 'model/accessories/Fan/Fan';

@Module({
    imports: [TypeOrmModule.forFeature([Fan])],
    controllers: [FanController],
    providers: [FanService]
})
export class FanModule {}
