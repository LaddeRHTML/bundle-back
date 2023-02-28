import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Order } from 'api/orders/schema/orders.schema';
import { Document } from 'mongoose';
import { EMAIL_REGEX } from 'src/common/regex/email';
import validateEmail from 'utils/validateEmail';

import { Role } from '../enum';

export type UserDocument = User & Document;

@Schema({ versionKey: false, collection: process.env.COLLECTION_KEY_USERS })
export class User {
    @Prop({ required: true })
    name: string;

    @Prop({
        unique: true,
        max: 30,
        validate: [validateEmail, 'Please fill a valid email address'],
        match: [EMAIL_REGEX, 'Please fill a valid email address']
    })
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
    allowed_to_login: boolean;

    @Prop({ required: false, ref: Order.name })
    orders: string[];

    @Prop({ required: false })
    family_name: string;

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
    is_legal_entity: boolean;

    @Prop({ required: false })
    iin: string;

    @Prop({ default: new Date() })
    update_date: Date;

    @Prop({ default: new Date() })
    registration_date: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
