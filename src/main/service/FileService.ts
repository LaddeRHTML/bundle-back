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
            const fileName = file.filename ?? file.originalname;
            const isExists = await this.isFileExists({
                sizeInBytes: file.size,
                fileName
            });

            if (isExists) {
                return await this.getFile(
                    {
                        originalName: file.originalname,
                        sizeInBytes: file.size,
                        mimeType: file.mimetype
                    },
                    ['id'] as unknown as FindOptionsSelect<File>
                );
            }

            const newFile = this.fileRepository.create({
                ...file,
                fileName: fileName,
                originalName: file.originalname,
                mimeType: file.mimetype,
                sizeInBytes: file.size,
                data: file.buffer
            });

            console.log({ newFile });

            const savedFile = await this.fileRepository.save({
                ...newFile,
                createdBy: userId,
                lastChangedBy: userId
            });

            return deleteObjectProperty(savedFile, 'data');
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
                        fileName: fileName,
                        originalName: f.originalname,
                        mimeType: f.mimetype,
                        sizeInBytes: f.size,
                        data: f.buffer,
                        createdBy: userId,
                        lastChangedBy: userId
                    };
                })
            );

            const result = await this.fileRepository.upsert(filesEntities, {
                conflictPaths: ['sizeInBytes', 'originalName', 'mimeType'],
                skipUpdateIfNoValuesChanged: !!skipUpdateIfNoValuesChanged
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

    async deleteFiles(files: string[]) {
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
