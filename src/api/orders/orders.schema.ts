import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type OrderDocument = Order & Document;

@Schema({ versionKey: false })
export class Order {
    @Prop({ required: true, default: '', ref: 'clients' })
    client: string;

    @Prop({ required: true, default: '' })
    purchasedProducts: [string];

    @Prop({ required: true, default: 0 })
    purchasedProductsPrice: number;

    @Prop({ required: true, default: new Date() })
    purchaseDate: Date;

    @Prop({ required: false, default: 0 })
    askedPrice: number;

    @Prop({ required: true, default: 0 })
    marketPrice: number;

    @Prop({ required: true, default: 0 })
    supplierPrice: number;

    /* 0 - deliveried by us, 1 - taked by client - 2 curier */
    @Prop({ required: true, default: 0 })
    deliveryMethod: number;

    @Prop({ required: true, default: new Date() })
    deliveryDate: Date;

    @Prop({ required: true, default: '' })
    deliveredBy: 'Kirill' | 'Stepan' | 'Roman' | 'Oleg' | 'Azamat' | 'Curier';

    @Prop({ required: true, default: new Date() })
    pannedDeliveryDate: Date;

    @Prop({ required: true, default: '' })
    referal: string;

    @Prop({ required: true, default: '' })
    orderStatus:
        | 'first-call'
        | 'delivered'
        | 'call-from-client'
        | 'message-from-client'
        | 'on-pause'
        | 'unknown'
        | 'in process'
        | 'undelivered';

    @Prop({ required: false, default: 0 })
    potentialProfit: number;

    @Prop({ required: false, default: 0 })
    realProfit: number;

    @Prop({ required: true, default: 0 })
    payment: number;

    @Prop({ required: true, default: '' })
    paymentMethod: string;

    @Prop({ required: true, default: 'KZT' })
    paymentWallet: 'KZT';

    @Prop({ required: false, default: 0 })
    paymentRemainder: number;

    @Prop({ required: true, default: 'whiteWind' })
    provider: string;

    @Prop({ required: true, default: '' })
    review: string;

    @Prop({ required: false, default: 365 })
    daysInWarranty: number;

    @Prop({ required: true, default: new Date() })
    warrantyStartDate: Date;

    @Prop({ required: true, default: new Date() })
    warrantyEndDate: Date;

    @Prop({ required: true, default: '' })
    orderManaged: 'Kirill' | 'Stepan' | 'Roman' | 'Oleg' | 'Azamat';

    @Prop({ required: true, default: '' })
    comment: string;

    @Prop({ required: true, default: new Date() })
    firstContactDate: Date;

    @Prop({ required: true, default: new Date() })
    createDate: Date;

    @Prop({ required: false, default: 0 })
    closeRequestInterval: number;

    @Prop({ required: false })
    previewPicture: string;

    @Prop({ required: false })
    pictureList: [string];
}
export const OrdersSchema = SchemaFactory.createForClass(Order);
