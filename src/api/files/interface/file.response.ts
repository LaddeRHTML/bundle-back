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
    chunk_size: number;
    size: number;
    md5: string;
    upload_date: Date;
    content_type: string;
}
