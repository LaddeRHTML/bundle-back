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
export declare type ProductsDocument = Product & Document;
export declare class Product {
    category: string;
    includedInOrders: string[];
    buyers: string[];
    name: string;
    marketPrice: number;
    supplierPrice: number;
    price: number;
    discountPrice: number;
    description: string;
    pictures: [string];
    previewPicture: string;
    rating: number;
    count: number;
    characteristics: [KeyValueObject];
    class: string;
    vendorСode: string;
    maker: string;
    weight: string;
    model: string;
    warrantyDays: number;
    uploadDate: Date;
    updateDate: Date;
}
export declare const ProductsSchema: import("mongoose").Schema<Product, import("mongoose").Model<Product, any, any, any>, {}, {}>;
