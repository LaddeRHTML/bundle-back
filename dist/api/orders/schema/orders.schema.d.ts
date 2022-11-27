/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/schemaoptions" />
import { Document } from 'mongoose';
import type { DeliveredBy } from '../types/deliverer.types';
import type { OrderManaged } from '../types/order-managed.types';
import type { OrderStatus } from '../types/order-status.types';
export declare type OrderDocument = Order & Document;
export declare class Order {
    client: string;
    orderedProducts: string[];
    purchaseDate: Date;
    askedPrice: number;
    deliveryMethod: string;
    deliveryDate: Date;
    deliveredBy: DeliveredBy;
    plannedDeliveryDate: Date;
    referal: string;
    paymentMethod: string;
    paymentWallet: 'KZT';
    paymentRemainder: number;
    review: string;
    orderManaged: OrderManaged;
    comment: string;
    closeRequestInterval: number;
    orderStatus: OrderStatus;
    firstContactDate: Date;
    createDate: Date;
}
export declare const OrdersSchema: import("mongoose").Schema<Order, import("mongoose").Model<Order, any, any, any>, {}, {}>;
