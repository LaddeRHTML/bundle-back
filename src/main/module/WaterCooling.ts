import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { WaterCooling } from 'model/accessories/WaterCooling/WaterCooling';

import { WaterCoolingController } from 'controller/WaterCoolingController';
import { WaterCoolingService } from 'service/WaterCooling';

@Module({
    imports: [TypeOrmModule.forFeature([WaterCooling])],
    controllers: [WaterCoolingController],
    providers: [WaterCoolingService]
})
export class WaterCoolingModule {}
