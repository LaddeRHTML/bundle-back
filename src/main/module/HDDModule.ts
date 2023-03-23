import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HDDController } from 'controller/HDDController';

import { HDD } from 'model/accessories/HDD/HDD';

import { HDDService } from 'service/HDDService';

@Module({
    imports: [TypeOrmModule.forFeature([HDD])],
    controllers: [HDDController],
    providers: [HDDService]
})
export class HDDModule {}
