import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Product } from 'api/products/schema/products.schema';
import { Document } from 'mongoose';

import type { DeliveredBy } from '../types/deliverer.types';
import type { OrderStatus } from '../types/order-status.types';
import { PaymentMethodType } from '../types/payment-method.types';
import { SourceType } from '../types/source.types';

export type OrderDocument = Order & Document;

@Schema({ versionKey: false, collection: process.env.COLLECTION_KEY_ORDERS })
export class Order {
    @Prop({ required: true, default: '', ref: 'users' })
    client: string;

    @Prop({ required: true, ref: 'users' })
    creator: string;

    @Prop({ required: true, ref: 'users' })
    currentManager: string;

    @Prop({ required: false })
    comment: string;

    @Prop({ required: false })
    closeOrderInterval: number;

    @Prop()
    deliveryDate: Date;

    @Prop({ required: true, type: String })
    deliveredBy: DeliveredBy;

    @Prop({ required: true, default: [''], ref: Product.name })
    products: string[];

    @Prop({ required: false })
    purchaseDate: Date;

    @Prop({ required: true })
    plannedDeliveryDate: Date;

    @Prop({ required: false, default: 'cash', type: String })
    paymentMethod: PaymentMethodType;

    @Prop({ required: true, type: String })
    source: SourceType;

    @Prop({ required: false, ref: 'users' })
    lastEditor: string;

    @Prop({ required: true, default: 'open', type: String })
    status: OrderStatus;

    @Prop({ required: true, default: new Date() })
    updateDate: Date;

    @Prop({ required: true, default: new Date() })
    createDate: Date;
}
export const OrdersSchema = SchemaFactory.createForClass(Order);
