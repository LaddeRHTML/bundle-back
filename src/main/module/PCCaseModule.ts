import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PCCaseController } from 'controller/PCCaseController';
import { PCCase } from 'model/accessories/PCCase/PCCase';
import { PCCaseService } from 'service/PCCaseService';

@Module({
    imports: [TypeOrmModule.forFeature([PCCase])],
    controllers: [PCCaseController],
    providers: [PCCaseService]
})
export class PCCaseModule {}
