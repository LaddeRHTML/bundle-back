/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/schemaoptions" />
import { Model } from 'mongoose';
import { Pagination } from 'src/common/interfaces/utils.interface';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationDto } from './dto/update-application.dto';
import { Application, ApplicationsDocument } from './schema/applications.schema';
export declare class ApplicationsService {
    private applicationsModel;
    constructor(applicationsModel: Model<ApplicationsDocument>);
    create(createApplicationDto: CreateApplicationDto): Promise<Application>;
    findSortedItems(page: number, limit: number): Promise<Pagination>;
    findAll(): Promise<Application[]>;
    findOne(_id: string): Promise<Application>;
    update(_id: string, updateApplicationDto: UpdateApplicationDto): Promise<Application>;
    remove(id: string): Promise<Application & import("mongoose").Document<any, any, any> & {
        _id: any;
    }>;
}
