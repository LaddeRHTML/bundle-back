import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import { MulterModule } from '@nestjs/platform-express';
import { GridFsMulterConfigService } from './multer-service.service';

@Module({
    imports: [
        MulterModule.registerAsync({
            useClass: GridFsMulterConfigService
        })
    ],
    controllers: [FilesController],
    providers: [GridFsMulterConfigService, FilesService]
})
export class FilesModule {}
