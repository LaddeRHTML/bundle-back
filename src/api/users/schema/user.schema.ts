import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Order } from 'api/orders/schema/orders.schema';
import { Document } from 'mongoose';

import { Role } from '../enum/roles.enum';

export type UserDocument = User & Document;

@Schema({ versionKey: false, collection: process.env.COLLECTION_KEY_USERS })
export class User {
    @Prop({ required: true })
    name: string;

    @Prop({ unique: true, required: true, max: 30 })
    email: string;

    @Prop({ required: true, type: String, default: null, min: 6, max: 50 })
    password: string;

    @Prop({ type: String, enum: Role, default: Role.User })
    role: Role;

    @Prop({ default: 0 })
    age: number;

    @Prop()
    avatar: string;

    @Prop({ default: 0 })
    gender: number;

    @Prop({ default: true })
    allowedToLogin: boolean;

    @Prop({ required: false, ref: Order.name })
    orders: string[];

    @Prop({ required: false })
    familyName: string;

    @Prop({ required: false })
    patronymic: string;

    @Prop({ required: true })
    birthday: Date;

    @Prop({ required: true, min: 11, max: 11 })
    phone: string;

    @Prop({ required: false, default: 'kazakhstan' })
    country: string;

    @Prop({ required: false, default: 'Almaty' })
    city: string;

    @Prop({ required: false, default: '' })
    address: string;

    @Prop({ required: false, default: false })
    isLegalEntity: boolean;

    @Prop({ required: false })
    iin: string;

    @Prop({ default: new Date() })
    update_date: Date;

    @Prop({ default: new Date() })
    registrationDate: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
