import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PowerUnitController } from 'controller/PowerUnitController';
import { PowerUnit } from 'model/accessories/PowerUnit/PowerUnit';
import { PowerUnitService } from 'service/PowerUnitService';

@Module({
    imports: [TypeOrmModule.forFeature([PowerUnit])],
    controllers: [PowerUnitController],
    providers: [PowerUnitService]
})
export class PowerUnitModule {}
