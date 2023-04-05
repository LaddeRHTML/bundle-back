import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Motherboard } from 'model/accessories/Motherboard/Motherboard';

import { MotherboardController } from 'controller/MotherboardController';
import { MotherboardService } from 'service/MotherboardService';

@Module({
    imports: [TypeOrmModule.forFeature([Motherboard])],
    controllers: [MotherboardController],
    providers: [MotherboardService]
})
export class MotherboardModule {}
