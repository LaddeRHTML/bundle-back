/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/schemaoptions" />
import { Document } from 'mongoose';
import { Role } from '../enum/roles.enum';
export declare type UserDocument = User & Document;
export declare type UserSettingsDocument = UserSettings & Document;
export declare class User {
    name: string;
    email: string;
    password: string;
    role: Role;
}
export declare class UserSettings {
    registrationDate: Date;
    updateDate: Date;
    age: number;
    avatar: string;
    gender: number;
    allowToLogin: boolean;
    user: string;
}
export declare const UserSchema: import("mongoose").Schema<User, import("mongoose").Model<User, any, any, any>, {}, {}>;
export declare const UserSettingsSchema: import("mongoose").Schema<UserSettings, import("mongoose").Model<UserSettings, any, any, any>, {}, {}>;
