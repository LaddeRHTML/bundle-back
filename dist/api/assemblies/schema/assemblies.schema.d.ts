/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/schemaoptions" />
import { Document } from 'mongoose';
import { KeyValueObject } from 'src/common/interfaces/product.interface';
export declare type AssembliesDocument = Assembly & Document;
export declare class Assembly {
    category: string;
    accessories: [string];
    templateType: string;
    name: string;
    marketprice: number;
    supplierPrice: number;
    price: number;
    discountPrice: number;
    description: string;
    pictures: [string];
    previewPicture: string;
    rating: number;
    count: number;
    characteristics: [KeyValueObject];
    vendorСode: string;
    weight: string;
    warrantyDays: number;
    uploadDate: Date;
    updateDate: Date;
}
export declare const AssemblySchema: import("mongoose").Schema<Assembly, import("mongoose").Model<Assembly, any, any, any>, {}, {}>;
