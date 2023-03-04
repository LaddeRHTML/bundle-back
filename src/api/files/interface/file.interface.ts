import { ObjectId } from 'mongoose';

import { File } from '../entitiy/file.entity';

export interface FilesId {
    filesId: string[];
}

export interface FilesResponse {
    message: string;
    files: File[] | [];
}

export interface FileResponse {
    message: string;
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

export interface MulterFile extends Express.Multer.File {
    id?: string;
}
