/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/schemaoptions" />
import { Document } from 'mongoose';
export declare type ApplicationsDocument = Application & Document;
export declare class Application {
    creatorName: string;
    email: string;
    phone: string;
    message: string;
    createDate: Date;
}
export declare const ApplicationsSchema: import("mongoose").Schema<Application, import("mongoose").Model<Application, any, any, any>, {}, {}>;
