import { ObjectId } from 'mongoose';

export interface MulterFile {
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    size: number;
    destination: string;
    filename: string;
    path: string;
    buffer: Buffer;
    id: ObjectId;
    metadata: null | string;
    bucketName: string;
    chunkSize: number;
    md5: undefined | string;
    upload_date: Date;
    contentType: string;
}
