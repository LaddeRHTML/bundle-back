import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';

import { FilesController } from './files.controller';
import { FilesService } from './service/files.service';
import { GridFsMulterConfigService } from './service/multer-service.service';

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
