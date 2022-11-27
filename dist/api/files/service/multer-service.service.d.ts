import { MulterModuleOptions, MulterOptionsFactory } from '@nestjs/platform-express';
export declare class GridFsMulterConfigService implements MulterOptionsFactory {
    gridFsStorage: {};
    constructor();
    createMulterOptions(): MulterModuleOptions;
}
