import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccessoriesController } from 'controller/AccessoriesController';
import { AccessoriesService } from 'service/AccessoriesService';
import { CPU } from 'model/accessories/CPU/CPU';
import { Cooler } from 'model/accessories/Cooler/Cooler';
import { Fan } from 'model/accessories/Fan/Fan';
import { GPU } from 'model/accessories/GPU/GPU';
import { HDD } from 'model/accessories/HDD/HDD';
import { Motherboard } from 'model/accessories/Motherboard/Motherboard';
import { PCCase } from 'model/accessories/PCCase/PCCase';
import { PowerUnit } from 'model/accessories/PowerUnit/PowerUnit';
import { RAM } from 'model/accessories/RAM/RAM';

@Module({
    imports: [
        TypeOrmModule.forFeature([Cooler, CPU, Fan, GPU, HDD, Motherboard, PCCase, PowerUnit, RAM])
    ],
    controllers: [AccessoriesController],
    providers: [AccessoriesService]
})
export class AccessoriesModule {}
