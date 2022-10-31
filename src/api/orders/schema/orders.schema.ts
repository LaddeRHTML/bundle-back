import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Product } from 'api/products/schema/products.schema';
import { Document } from 'mongoose';

import type { DeliveredBy } from '../types/deliverer.types';
import type { OrderManaged } from '../types/order-managed.types';
import type { OrderStatus } from '../types/order-status.types';

export type OrderDocument = Order & Document;

@Schema({ versionKey: false, collection: process.env.COLLECTION_KEY_ORDERS })
export class Order {
    @Prop({ required: true, default: '', ref: 'clients' })
    client: string;

    @Prop({ required: true, default: [''], ref: Product.name })
    orderedProducts: string[];

    @Prop({ required: false, default: new Date() })
    purchaseDate: Date;

    @Prop({ required: false, default: 0 })
    askedPrice: number;

    /* 0 - deliveried by us, 1 - taked by client - 2 curier */
    @Prop({ required: true, default: 'delivery' })
    deliveryMethod: string;

    @Prop({ required: true, default: new Date() })
    deliveryDate: Date;

    @Prop({ required: true, default: '', type: String })
    deliveredBy: DeliveredBy;

    @Prop({ required: true, default: new Date() })
    plannedDeliveryDate: Date;

    @Prop({ required: true, default: '' })
    referal: string;

    @Prop({ required: false, default: 'cash' })
    paymentMethod: string;

    @Prop({ required: false, default: 'KZT' })
    paymentWallet: 'KZT';

    @Prop({ required: false, default: 0 })
    paymentRemainder: number;

    @Prop({ required: false, default: '' })
    review: string;

    @Prop({ required: true, default: '', type: String })
    orderManaged: OrderManaged;

    @Prop({ required: false, default: '' })
    comment: string;

    @Prop({ required: false, default: 0 })
    closeRequestInterval: number;

    @Prop({ required: false, default: 'first-touch', type: String })
    orderStatus: OrderStatus;

    @Prop({ required: true, default: new Date() })
    firstContactDate: Date;

    @Prop({ required: true, default: new Date() })
    createDate: Date;
}
export const OrdersSchema = SchemaFactory.createForClass(Order);
