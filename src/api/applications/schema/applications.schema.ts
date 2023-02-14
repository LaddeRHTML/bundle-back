import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ApplicationsDocument = Application & Document;

@Schema({
    versionKey: false,
    collection: process.env.COLLECTION_KEY_APPLICATIONS
})
export class Application {
    @Prop({ required: true })
    creatorName: string;

    @Prop({ required: false })
    email: string;

    @Prop({ required: true })
    phone: string;

    @Prop({ required: true })
    message: string;

    @Prop({ default: new Date() })
    create_date: Date;
}
export const ApplicationsSchema = SchemaFactory.createForClass(Application);
