import {
    Body,
    Controller,
    Delete,
    Get,
    HttpStatus,
    NotFoundException,
    Param,
    ParseFilePipeBuilder,
    Post,
    Req,
    Res,
    StreamableFile,
    UploadedFile,
    UploadedFiles,
    UseGuards,
    UseInterceptors
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { Readable } from 'stream';
import { DeleteResult } from 'typeorm';
import { Response } from 'express';

import { HasRoles } from 'auth/decorators/roles-decorator';
import RoleGuard from 'auth/guards/role-auth.guard';

import { RequestWithUser } from 'service/AuthService';
import { FilesService, MulterFile } from 'service/FileService';

import { MAX_FILE_SIZE_IN_B } from 'common/constants';

import { Role } from 'model/user/UserEnums';
import { File } from 'model/file/File';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Files')
@Controller('/files')
export class FilesController {
    constructor(private readonly filesService: FilesService) {}

    @HasRoles(Role.Manager, Role.Admin)
    @UseGuards(RoleGuard)
    @UseInterceptors(FileInterceptor('image'))
    @Post()
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
        @UploadedFiles()
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
            'Content-Disposition': `inline; filename="${file.file_name}"`,
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
    async deleteFiles(@Body() filesId: string[]): Promise<string[]> {
        const affectedImages = [];

        for (const id of filesId) {
            const isExists = await this.filesService.isFileExists({ id });

            if (!isExists) {
                continue;
            }

            const result = await this.filesService.deleteFile(id);

            if (result.affected !== 0) {
                affectedImages.push(id);
            }
        }

        return affectedImages;
    }
}
