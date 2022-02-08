import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId, PromiseProvider } from 'mongoose';

export type UserDocument = User & Document;
export type UserSettingsDocument = UserSettings & Document;

@Schema({versionKey: false})
export class User {

    @Prop({ required: true })
    name: string;

    @Prop({ unique: true, required: true })
    email: string;

    @Prop({ required: true })
    password: string;
}

@Schema({versionKey: false})
export class UserSettings {

    @Prop({ ref: 'user' })
    userId: string;

    @Prop({ default: new Date() })
    registrationDate: Date;

    @Prop({ default: 0 })
    age: number;

    @Prop()
    avatar: string;

    @Prop({ default: 0 })
    gender: number;

    @Prop({ default: true })
    allowToLogin: boolean;

    @Prop({ ref: 'user' })
    user: string;

}

export const UserSchema = SchemaFactory.createForClass(User);
export const UserSetgingsSchema = SchemaFactory.createForClass(UserSettings);