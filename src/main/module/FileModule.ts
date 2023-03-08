import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FilesController } from 'controller/FileController';

import { File } from 'model/file/File';

import { FilesService } from 'service/FileService';

@Module({
    imports: [TypeOrmModule.forFeature([File])],
    controllers: [FilesController],
    providers: [FilesService]
})
export class FilesModule {}
