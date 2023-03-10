import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CPU } from 'model/accessories/CPU/CPU';

import { CPUController } from './../controller/CPUController';
import { CPUService } from './../service/CPUService';

@Module({
    imports: [TypeOrmModule.forFeature([CPU])],
    controllers: [CPUController],
    providers: [CPUService]
})
export class CPUModule {}
