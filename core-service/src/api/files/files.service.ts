import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { MongoGridFS } from 'mongo-gridfs/dist/mongo-gridfs.class';
import { InjectConnection } from '@nestjs/mongoose';
import { MongooseConnectionInstance } from 'multer-gridfs-storage';
import { GridFSBucketReadStream } from 'mongodb';
import { FileInfo } from './entities/file.info.entity';

@Injectable()
export class FilesService {
    private fileModel: MongoGridFS;

    constructor(@InjectConnection() private readonly connection: MongooseConnectionInstance) {
        this.fileModel = new MongoGridFS(this.connection.db, 'fs');
    }

    async readStream(id: string): Promise<GridFSBucketReadStream> {
        return await this.fileModel.readFileStream(id);
    }

    async findInfo(id: string): Promise<FileInfo> {
        const result = await this.fileModel
            .findById(id)
            .catch((err) => {
                console.log(err);
                throw new HttpException('File not found', HttpStatus.NOT_FOUND);
            })
            .then((result) => result);

        return {
            filename: result.filename,
            length: result.length,
            chunkSize: result.chunkSize,
            md5: result.md5,
            contentType: result.contentType
        };
    }

    async deleteFile(id: string): Promise<boolean> {
        try {
            const file = await this.fileModel.findById(id);
            await this.connection.db.collection('fs.chunks').deleteOne({ files_id: file._id });
            await this.connection.db.collection('fs.files').deleteOne({ _id: file._id });

            if (file) return true;

            return false;
        } catch (error) {
            throw new HttpException('File not found', HttpStatus.NOT_FOUND);
        }
    }
}
