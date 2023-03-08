import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, FindOptionsSelect, FindOptionsWhere, In, Repository } from 'typeorm';

import { File } from 'model/file/File';

import getErrorMessage from 'common/utils/errors/getErrorMessage';
import deleteObjectProperty from 'common/utils/object/deleteObjectProperty';

export interface MulterFile extends Express.Multer.File {
    id?: string;
}

@Injectable()
export class FilesService {
    constructor(
        @InjectRepository(File)
        private fileRepository: Repository<File>
    ) {}

    async uploadFile(file: MulterFile, userId: string): Promise<File> {
        try {
            const fileName = file.filename || file.originalname;
            const isExists = await this.isFileExists({
                size_in_bytes: file.size,
                file_name: fileName
            });

            if (isExists) {
                return await this.getFile(
                    {
                        original_name: file.originalname,
                        size_in_bytes: file.size,
                        mime_type: file.mimetype
                    },
                    ['id'] as unknown as FindOptionsSelect<File>
                );
            }

            const newFile = this.fileRepository.create({
                ...file,
                file_name: fileName,
                original_name: file.originalname,
                mime_type: file.mimetype,
                size_in_bytes: file.size,
                data: file.buffer
            });

            await this.fileRepository.save({
                ...newFile,
                created_by: userId,
                last_changed_by: userId
            });
            return deleteObjectProperty(newFile, 'data');
        } catch (error) {
            throw new Error(`files.service | uploadFile error: ${getErrorMessage(error)}`);
        }
    }

    async uploadFiles(
        files: MulterFile[],
        userId: string,
        skipUpdateIfNoValuesChanged?: boolean
    ): Promise<File[]> {
        try {
            const filesEntities = this.fileRepository.create(
                files.map((f) => {
                    const fileName = f.filename || f.originalname;

                    return {
                        ...f,
                        file_name: fileName,
                        original_name: f.originalname,
                        mime_type: f.mimetype,
                        size_in_bytes: f.size,
                        data: f.buffer,
                        created_by: userId,
                        last_changed_by: userId
                    };
                })
            );

            const result = await this.fileRepository.upsert(filesEntities, {
                conflictPaths: ['size_in_bytes', 'original_name', 'mime_type'],
                skipUpdateIfNoValuesChanged: skipUpdateIfNoValuesChanged === true
            });

            if (result.raw.length === 0) return [];

            return filesEntities.map((f) => {
                return deleteObjectProperty(f, 'data');
            });
        } catch (error) {
            throw new Error(`files.service | uploadFiles error: ${getErrorMessage(error)}`);
        }
    }

    async getFileById(fileId: string): Promise<File> {
        try {
            const file = await this.fileRepository.findOne({ where: { id: fileId } });
            if (!file) {
                throw new NotFoundException('File not found!');
            }

            return file;
        } catch (error) {
            throw new Error(`files.service | uploadFile error: ${getErrorMessage(error)}`);
        }
    }

    async getFile(
        fileProperty: FindOptionsWhere<File>,
        select?: FindOptionsSelect<File>
    ): Promise<File> {
        try {
            const file = await this.fileRepository.findOne({ where: fileProperty, select });

            if (!file) {
                throw new NotFoundException('File not found!');
            }

            return file;
        } catch (error) {
            throw new Error(`files.service | getFile error: ${getErrorMessage(error)}`);
        }
    }

    async deleteFile(id: string): Promise<DeleteResult> {
        try {
            const isExists = await this.isFileExists({ id });

            if (!isExists) {
                throw new HttpException('File not found!', HttpStatus.BAD_REQUEST);
            }

            return await this.fileRepository.delete({ id });
        } catch (error) {
            throw new Error(`files.service | deleteFile error: ${getErrorMessage(error)}`);
        }
    }

    async deleteFiles(files: string[]): Promise<DeleteResult> {
        try {
            return await this.fileRepository.delete({ id: In(files) });
        } catch (error) {
            throw new Error(`files.service | deleteFiles error: ${getErrorMessage(error)}`);
        }
    }

    async isFileExists(fileProperty: FindOptionsWhere<File>): Promise<boolean> {
        try {
            return await this.fileRepository.exist({ where: fileProperty });
        } catch (error) {
            throw new Error(`files.service | isFileExists error: ${getErrorMessage(error)}`);
        }
    }
}
