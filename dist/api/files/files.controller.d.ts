import { MulterFile } from 'api/files/interface/multer.interface';
import { Response } from 'express';
import { FileResponse, UploadFileResponse } from './interface/file.response';
import { FilesService } from './service/files.service';
export declare class FilesController {
    private readonly filesService;
    constructor(filesService: FilesService);
    uploadFile(file: MulterFile): Promise<UploadFileResponse>;
    getFileInfo(id: string): Promise<FileResponse>;
    getFile(id: string, res: Response): Promise<any>;
    downloadFile(id: string, res: any): Promise<any>;
    deleteFile(id: string): Promise<FileResponse>;
}
