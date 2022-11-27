"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilesService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongo_gridfs_class_1 = require("mongo-gridfs/dist/mongo-gridfs.class");
let FilesService = class FilesService {
    constructor(connection) {
        this.connection = connection;
        this.fileModel = new mongo_gridfs_class_1.MongoGridFS(this.connection.db, 'fs');
    }
    async readStream(id) {
        return await this.fileModel.readFileStream(id);
    }
    async findInfo(id) {
        const result = await this.fileModel
            .findById(id)
            .catch((err) => {
            throw new common_1.HttpException('File not found', common_1.HttpStatus.NOT_FOUND);
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
    async deleteFile(id) {
        try {
            const file = await this.fileModel.findById(id);
            await this.connection.db.collection('fs.chunks').deleteOne({ files_id: file._id });
            await this.connection.db.collection('fs.files').deleteOne({ _id: file._id });
            if (file)
                return true;
            return false;
        }
        catch (error) {
            throw new common_1.HttpException('File not found', common_1.HttpStatus.NOT_FOUND);
        }
    }
};
FilesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectConnection)()),
    __metadata("design:paramtypes", [Object])
], FilesService);
exports.FilesService = FilesService;
//# sourceMappingURL=files.service.js.map