import {
    Body,
    Controller,
    Delete,
    Get,
    HttpException,
    HttpStatus,
    Param,
    ParseFilePipeBuilder,
    Post,
    Res,
    UploadedFile,
    UploadedFiles,
    UseGuards,
    UseInterceptors
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { HasRoles } from 'api/auth/decorators/roles-decorator';
import RoleGuard from 'api/auth/guards/role-auth.guard';
import { MulterFile } from 'api/files/interface/multer.interface';
import { Role } from 'api/users/enum/roles.enum';
import { Response } from 'express';
import { apiVersion } from 'src/common/constants/api-const';
import { MAX_FILE_SIZE_IN_B } from 'src/common/constants/file-size';

import { FileInfo } from './entities/file.info.entity';
import { FileResponse, FilesResponse, UploadFileResponse } from './interface/file.response';
import { FilesService } from './service/files.service';

@Controller(`${apiVersion}/files`)
export class FilesController {
    constructor(private readonly filesService: FilesService) {}

    @HasRoles(Role.Manager, Role.Admin)
    @UseGuards(RoleGuard)
    @Post()
    @UseInterceptors(FileInterceptor('image'))
    async uploadFile(
        @UploadedFile(
            new ParseFilePipeBuilder()
                .addMaxSizeValidator({
                    maxSize: MAX_FILE_SIZE_IN_B
                })
                .build({
                    errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY
                })
        )
        file: MulterFile
    ): Promise<UploadFileResponse> {
        const response = {
            originalname: file.originalname,
            encoding: file.encoding,
            mimetype: file.mimetype,
            id: file.id,
            filename: file.filename,
            metadata: file.metadata,
            bucketName: file.bucketName,
            chunk_size: file.chunk_size,
            size: file.size,
            md5: file.md5,
            upload_date: file.upload_date,
            content_type: file.content_type
        };

        return response;
    }

    @HasRoles(Role.Manager, Role.Admin)
    @UseGuards(RoleGuard)
    @Post('/many')
    @UseInterceptors(FilesInterceptor('images'))
    async uploadFiles(
        @UploadedFiles()
        files: MulterFile[]
    ): Promise<UploadFileResponse[]> {
        const UploadedFilesResponse = files.map((f) => ({
            originalname: f.originalname,
            encoding: f.encoding,
            mimetype: f.mimetype,
            id: f.id,
            filename: f.filename,
            metadata: f.metadata,
            bucketName: f.bucketName,
            chunk_size: f.chunk_size,
            size: f.size,
            md5: f.md5,
            upload_date: f.upload_date,
            content_type: f.content_type
        }));

        return UploadedFilesResponse;
    }

    @HasRoles(Role.User, Role.Manager, Role.Admin)
    @UseGuards(RoleGuard)
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
    async getFile(@Param('id') id: string, @Res() res: Response): Promise<any> {
        const file = await this.filesService.findInfo(id);
        const filestream = await this.filesService.readStream(id);
        if (!filestream) {
            throw new HttpException(
                'An error occurred while retrieving file',
                HttpStatus.EXPECTATION_FAILED
            );
        }
        res.header('Content-Type', file.content_type);
        return filestream.pipe(res);
    }

    @HasRoles(Role.User, Role.Manager, Role.Admin)
    @UseGuards(RoleGuard)
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
        res.header('Content-Type', file.content_type);
        res.header('Content-Disposition', 'attachment; filename=' + file.filename);
        return filestream.pipe(res);
    }

    @HasRoles(Role.Admin)
    @UseGuards(RoleGuard)
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

    @HasRoles(Role.Admin)
    @UseGuards(RoleGuard)
    @Delete('delete-many/')
    async deleteFiles(@Body() filesId: string[]): Promise<FilesResponse> {
        let files: FileInfo[] = [];

        for (const id of filesId) {
            const file = await this.filesService.findInfo(id);
            if (!file) {
                throw new HttpException(
                    'An error occurred during file searching',
                    HttpStatus.EXPECTATION_FAILED
                );
            }
            const filestream = await this.filesService.deleteFile(id);
            if (!filestream) {
                throw new HttpException(
                    'An error occurred during file deletion',
                    HttpStatus.EXPECTATION_FAILED
                );
            }
            files.push(file);
        }

        if (files.length === 0) {
            throw new HttpException('0 files deleted!', HttpStatus.EXPECTATION_FAILED);
        }

        return {
            message: 'Files has been deleted',
            files
        };
    }
}
