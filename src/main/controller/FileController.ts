import {
    Body,
    Controller,
    Delete,
    FileTypeValidator,
    Get,
    MaxFileSizeValidator,
    NotFoundException,
    Param,
    ParseFilePipe,
    Post,
    Req,
    Res,
    StreamableFile,
    UploadedFile,
    UploadedFiles,
    UseGuards,
    UseInterceptors
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { Readable } from 'stream';
import { DeleteResult } from 'typeorm';
import { Response } from 'express';

import { HasRoles } from 'auth/decorators/roles-decorator';
import RoleGuard from 'auth/guards/role-auth.guard';

import { RequestWithUser } from 'service/AuthService';
import { FilesService, MulterFile } from 'service/FileService';

import { Role } from 'model/user/UserEnums';
import { File } from 'model/file/File';

@ApiTags('Files')
@Controller('/files')
@ApiBearerAuth('JWT-auth')
export class FilesController {
    constructor(private readonly filesService: FilesService) {}

    @HasRoles(Role.Manager, Role.Admin)
    @UseGuards(RoleGuard)
    @UseInterceptors(FileInterceptor('image'))
    @Post()
    async uploadFile(
        @UploadedFile(
            new ParseFilePipe({
                validators: [
                    new FileTypeValidator({ fileType: '.(png|jpeg|jpg)' }),
                    new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 4 })
                ]
            })
        )
        file: MulterFile,
        @Req() { user: { id } }: RequestWithUser
    ): Promise<Partial<File>> {
        return await this.filesService.uploadFile(file, id);
    }

    @HasRoles(Role.Manager, Role.Admin)
    @UseGuards(RoleGuard)
    @UseInterceptors(FilesInterceptor('images'))
    @Post('/many')
    async uploadFiles(
        @UploadedFiles(
            new ParseFilePipe({
                validators: [
                    new FileTypeValidator({ fileType: '.(png|jpeg|jpg)' }),
                    new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 4 })
                ]
            })
        )
        files: MulterFile[],
        @Req() { user: { id } }: RequestWithUser
    ): Promise<Partial<File>[]> {
        return await this.filesService.uploadFiles(files, id, true);
    }

    @Get(':id')
    async getFile(
        @Param('id') id: string,
        @Res({ passthrough: true }) response: Response
    ): Promise<StreamableFile> {
        const file = await this.filesService.getFileById(id);
        const stream = Readable.from(file.data);

        response.set({
            'Content-Disposition': `inline; filename="${file.fileName}"`,
            'Content-Type': 'image'
        });

        return new StreamableFile(stream);
    }

    @HasRoles(Role.Admin)
    @UseGuards(RoleGuard)
    @Delete('delete/:id')
    async deleteFile(@Param('id') id: string): Promise<DeleteResult> {
        const isFileExists = await this.filesService.isFileExists({ id });

        if (!isFileExists) {
            throw new NotFoundException('File not found!');
        }

        return await this.filesService.deleteFile(id);
    }

    @HasRoles(Role.Admin)
    @UseGuards(RoleGuard)
    @Delete('delete-many/')
    async deleteFiles(@Body() filesId: string[]): Promise<DeleteResult> {
        return await this.filesService.deleteFiles(filesId);
    }
}
