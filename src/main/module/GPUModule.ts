import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GPUController } from 'controller/GPUController';
import { GPU } from 'model/accessories/GPU/GPU';
import { GPUService } from 'service/GPUService';

@Module({
    imports: [TypeOrmModule.forFeature([GPU])],
    controllers: [GPUController],
    providers: [GPUService]
})
export class GPUModule {}
