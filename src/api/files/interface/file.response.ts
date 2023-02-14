import { ObjectId } from 'mongoose';

import { FileInfo } from '../entities/file.info.entity';

export interface FileResponse {
    message: string;
    file: FileInfo;
}

export interface UploadFileResponse {
    originalname: string;
    encoding: string;
    mimetype: string;
    id: ObjectId;
    filename: string;
    metadata: string;
    bucketName: string;
    chunkSize: number;
    size: number;
    md5: string;
    upload_date: Date;
    contentType: string;
}
