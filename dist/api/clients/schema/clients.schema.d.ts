/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/schemaoptions" />
import type { OrderManaged } from 'api/orders/types/order-managed.types';
import { Document } from 'mongoose';
export declare type ClientDocument = Client & Document;
export declare class Client {
    orders: string[];
    clientName: string;
    famalyName: string;
    patronymic: string;
    birthDay: Date;
    age: number;
    gender: number;
    email: string;
    phone: string;
    country: string;
    city: string;
    address: string;
    purchasedProducts: [string];
    referal: string;
    isLegalEntity: boolean;
    firstContactDate: Date;
    callManaged: OrderManaged;
    comment: string;
    createDate: Date;
    avatar: string;
    iin: string;
}
export declare const ClientSchema: import("mongoose").Schema<Client, import("mongoose").Model<Client, any, any, any>, {}, {}>;
