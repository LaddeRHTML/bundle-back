import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId, PromiseProvider } from 'mongoose';

export type ApplicationsDocument = Application & Document;

@Schema({versionKey: false})
export class Application {

    @Prop({required: true})
    creatorName: string;

    @Prop({ required: true })
    email: string;

    @Prop({ required: true })
    phone: string;

    @Prop({ required: true })
    message: string;

    @Prop({ default: new Date()})
    createDate: Date;
}
export const ApplicationsSchema = SchemaFactory.createForClass(Application);