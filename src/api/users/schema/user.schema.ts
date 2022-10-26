import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

import { Role } from '../enum/roles.enum';

export type UserDocument = User & Document;
export type UserSettingsDocument = UserSettings & Document;

@Schema({ versionKey: false, collection: process.env.COLLECTION_KEY_USERS })
export class User {
    @Prop({ required: true })
    name: string;

    @Prop({ unique: true, required: true })
    email: string;

    @Prop({ required: true })
    password: string;

    @Prop({ enum: Role, default: Role.User })
    role: string;
}

@Schema({
    versionKey: false,
    collection: process.env.COLLECTION_KEY_USERS_SETTINGS
})
export class UserSettings {
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

    @Prop({ ref: User.name })
    user: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
export const UserSettingsSchema = SchemaFactory.createForClass(UserSettings);
