import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Cooler } from 'model/accessories/Cooler/Cooler';

import { CoolerController } from 'controller/CoolerController';
import { CoolerService } from 'service/CoolerService';

@Module({
    imports: [TypeOrmModule.forFeature([Cooler])],
    controllers: [CoolerController],
    providers: [CoolerService]
})
export class CoolerModule {}
