import { GridFSBucketReadStream } from 'mongodb';
import { MongooseConnectionInstance } from 'multer-gridfs-storage';
import { FileInfo } from '../entities/file.info.entity';
export declare class FilesService {
    private readonly connection;
    private fileModel;
    constructor(connection: MongooseConnectionInstance);
    readStream(id: string): Promise<GridFSBucketReadStream>;
    findInfo(id: string): Promise<FileInfo>;
    deleteFile(id: string): Promise<boolean>;
}
