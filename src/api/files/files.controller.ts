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
import { HasRoles } from 'api/auth/decorators/roles-decorator';
import RoleGuard from 'api/auth/guards/role-auth.guard';
import { Role } from 'api/users/enum';
import { Request, Response } from 'express';
import { apiVersion } from 'src/common/constants/api-const';
import { MAX_FILE_SIZE_IN_B } from 'src/common/constants/file-size';
import { Readable } from 'stream';
import { DeleteResult } from 'typeorm';

import { File } from './entitiy/file.entity';
import { FilesService } from './files.service';

@Controller(`${apiVersion}/files`)
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
        file: Express.Multer.File,
        @Req() req: Request
    ): Promise<File> {
        const userId = req.user['userId'];
        return await this.filesService.uploadFile(file, userId);
    }

    @HasRoles(Role.Manager, Role.Admin)
    @UseGuards(RoleGuard)
    @UseInterceptors(FilesInterceptor('images'))
    @Post('/many')
    async uploadFiles(
        @UploadedFiles()
        files: Express.Multer.File[],
        @Req() req: Request
    ): Promise<File[]> {
        const userId = req.user['userId'];
        return await this.filesService.uploadFiles(files, userId, true);
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
            throw new NotFoundException();
        }

        return await this.filesService.deleteFile(id);
    }

    @HasRoles(Role.Admin)
    @UseGuards(RoleGuard)
    @Delete('delete-many/')
    async deleteFiles(@Body() filesId: string[]): Promise<string[]> {
        let affectedImages = [];

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
