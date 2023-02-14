import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Characteristic } from 'src/common/interfaces/product.interface';

export type AssembliesDocument = Assembly & Document;

@Schema({ versionKey: false, collection: process.env.COLLECTION_KEY_ASSEMBLIES })
export class Assembly {
    @Prop({ required: true, default: 'assemblies' })
    category: string;

    @Prop({ required: false, ref: 'accessories' })
    accessories: [string];

    @Prop({ required: true, default: 'assemblies' })
    templateType: string;

    @Prop({ required: true, default: '' })
    name: string;

    @Prop({ required: true, default: 0 })
    market_price: number;

    @Prop({ required: true, default: 0 })
    supplier_price: number;

    @Prop({ required: true, default: 0 })
    price: number;

    @Prop({ required: false, default: 0 })
    discount_price: number;

    @Prop({ required: false, default: '' })
    description: string;

    @Prop({ required: false })
    pictures: [string];

    @Prop({ required: true })
    preview_picture: string;

    @Prop({ required: false, default: 0, min: 0, max: 5 })
    rating: number;

    @Prop({ required: true, default: 0 })
    count: number;

    @Prop({ default: [] })
    characteristics: Characteristic[];

    @Prop({ required: false, default: '' })
    vendorСode: string;

    @Prop({ required: true, default: '' })
    weight: string;

    @Prop({ required: true })
    warranty_days: number;

    @Prop({ required: false, default: new Date() })
    upload_date: Date;

    @Prop({ required: false, default: new Date() })
    update_date: Date;
}

export const AssemblySchema = SchemaFactory.createForClass(Assembly);
