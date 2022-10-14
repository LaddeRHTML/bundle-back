import {
    Body,
    Controller,
    Delete,
    Get,
    HttpException,
    HttpStatus,
    Param,
    Post,
    Res,
    UploadedFile,
    UseGuards,
    UseInterceptors
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'api/auth/guards/jwt-auth.guard';
import { MulterFile } from 'api/files/interface/multer.interface';
import { apiVersion } from 'src/common/constants/api-const';

import { FileResponse } from './interface/file.response';
import { FilesService } from './service/files.service';

@Controller(`${apiVersion}/files`)
export class FilesController {
    constructor(private readonly filesService: FilesService) {}

    @UseGuards(JwtAuthGuard)
    @Post()
    @UseInterceptors(FileInterceptor('image'))
    async uploadFile(@UploadedFile() file: MulterFile): Promise<any> {
        const response = {
            originalname: file.originalname,
            encoding: file.encoding,
            mimetype: file.mimetype,
            id: file.id,
            filename: file.filename,
            metadata: file.metadata,
            bucketName: file.bucketName,
            chunkSize: file.chunkSize,
            size: file.size,
            md5: file.md5,
            uploadDate: file.uploadDate,
            contentType: file.contentType
        };

        return response;
    }

    @UseGuards(JwtAuthGuard)
    @Get('info/:id')
    async getFileInfo(@Param('id') id: string): Promise<FileResponse> {
        const file = await this.filesService.findInfo(id);
        const filestream = await this.filesService.readStream(id);
        if (!filestream) {
            throw new HttpException(
                'An error occurred while retrieving file info',
                HttpStatus.EXPECTATION_FAILED
            );
        }
        return {
            message: 'File has been detected',
            file: file
        };
    }

    @Get(':id')
    async getFile(@Param('id') id: string, @Res() res): Promise<any> {
        const file = await this.filesService.findInfo(id);
        const filestream = await this.filesService.readStream(id);
        if (!filestream) {
            throw new HttpException(
                'An error occurred while retrieving file',
                HttpStatus.EXPECTATION_FAILED
            );
        }
        res.header('Content-Type', file.contentType);
        return filestream.pipe(res);
    }

    @Get('download/:id')
    async downloadFile(@Param('id') id: string, @Res() res): Promise<any> {
        const file = await this.filesService.findInfo(id);
        const filestream = await this.filesService.readStream(id);
        if (!filestream) {
            throw new HttpException(
                'An error occurred while retrieving file',
                HttpStatus.EXPECTATION_FAILED
            );
        }
        res.header('Content-Type', file.contentType);
        res.header('Content-Disposition', 'attachment; filename=' + file.filename);
        return filestream.pipe(res);
    }

    @UseGuards(JwtAuthGuard)
    @Delete('delete/:id')
    async deleteFile(@Param('id') id: string): Promise<FileResponse> {
        const file = await this.filesService.findInfo(id);
        const filestream = await this.filesService.deleteFile(id);
        if (!filestream) {
            throw new HttpException(
                'An error occurred during file deletion',
                HttpStatus.EXPECTATION_FAILED
            );
        }
        return {
            message: 'File has been deleted',
            file: file
        };
    }
}
