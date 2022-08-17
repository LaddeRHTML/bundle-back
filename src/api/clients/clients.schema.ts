import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ClientDocument = Client & Document;

@Schema({ versionKey: false })
export class Client {
    @Prop({ required: false, ref: 'orders' })
    orders: string[];

    @Prop({ required: true, default: '' })
    clientName: string;

    @Prop({ required: true, default: '' })
    famalyName: string;

    @Prop({ required: false, default: '' })
    patronymic: string;

    @Prop({ required: true, default: new Date() })
    birthDay: Date;

    @Prop({ required: false, default: 0 })
    age: number;

    @Prop({ required: true, default: 0 })
    gender: number;

    @Prop({ required: false, default: '' })
    email: string;

    @Prop({ required: true, default: '' })
    phone: string;

    @Prop({ required: true, default: '' })
    country: string;

    @Prop({ required: true, default: '' })
    city: string;

    @Prop({ required: true, default: '' })
    address: string;

    @Prop({ required: true, default: '' })
    purchasedProducts: [string];

    @Prop({ required: true, default: '' })
    referal: string;

    @Prop({ required: true, default: false })
    isLegalEntity: boolean;

    @Prop({ required: true, default: new Date() })
    firstContactDate: Date;

    @Prop({ required: true, default: '' })
    callManaged: 'Kirill' | 'Stepan' | 'Roman' | 'Oleg' | 'Azamat';

    @Prop({ required: true, default: '' })
    comment: string;

    @Prop({ required: true, default: new Date() })
    createDate: Date;

    @Prop({ required: false })
    avatar: string;

    @Prop({ required: false })
    iin: string;
}
export const ClientSchema = SchemaFactory.createForClass(Client);
