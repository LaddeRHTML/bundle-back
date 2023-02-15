import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Product } from 'api/products/schema/products.schema';
import { Document } from 'mongoose';

import type { OrderStatus } from '../types/order-status.types';
import { payment_methodType } from '../types/payment-method.types';
import { SourceType } from '../types/source.types';

export type OrderDocument = Order & Document;

@Schema({ versionKey: false, collection: process.env.COLLECTION_KEY_ORDERS })
export class Order {
    @Prop({ required: true, default: '', ref: 'users' })
    client: string;

    @Prop({ required: true, ref: 'users' })
    creator: string;

    @Prop({ required: true, ref: 'users' })
    current_manager: string;

    @Prop({ required: false })
    comment: string;

    @Prop({ required: false })
    close_interval: number;

    @Prop()
    delivery_date: Date;

    @Prop({ required: false })
    delivered_by: string;

    @Prop({ required: true, default: [''], ref: Product.name })
    products: string[];

    @Prop({ required: false })
    purchase_date: Date;

    @Prop({ required: true })
    planned_delivery_date: Date;

    @Prop({ required: false, default: 'cash', type: String })
    payment_method: payment_methodType;

    @Prop({ required: true, type: String })
    source: SourceType;

    @Prop({ required: false, ref: 'users' })
    last_editor: string;

    @Prop({ required: true, default: 'open', type: String })
    status: OrderStatus;

    @Prop({ required: true, default: new Date() })
    update_date: Date;

    @Prop({ required: true, default: new Date() })
    create_date: Date;
}
export const OrdersSchema = SchemaFactory.createForClass(Order);
