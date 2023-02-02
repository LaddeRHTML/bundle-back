import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { KeyValueObject } from 'src/common/interfaces/product.interface';

export type ProductsDocument = Product & Document;

@Schema({ versionKey: false, collection: process.env.COLLECTION_KEY_PRODUCTS })
export class Product {
    @Prop({ required: true, default: 'home_c' })
    category: string;

    @Prop({ required: true, default: '' })
    name: string;

    @Prop({ required: true, default: 0 })
    marketPrice: number;

    @Prop({ required: true, default: 0 })
    supplierPrice: number;

    @Prop({ required: true, default: 0 })
    price: number;

    @Prop({ required: false, default: 0 })
    discountPrice: number;

    @Prop({ required: false, default: '' })
    description: string;

    @Prop({ required: false })
    pictures: [string];

    @Prop({ required: false })
    previewPicture: string;

    @Prop({ required: false, default: 0, min: 0, max: 5 })
    rating: number;

    @Prop({ required: false, default: 1 })
    count: number;

    @Prop({ default: [] })
    characteristics: [KeyValueObject];

    // notebook/other
    @Prop({ required: false, default: '' })
    class: string;

    @Prop({ required: false, default: '' })
    vendorСode: string;

    @Prop({ required: false, default: '' })
    maker: string;

    @Prop({ required: false, default: '' })
    weight: string;

    @Prop({ required: false, default: '' })
    model: string;

    @Prop({ required: true })
    warrantyDays: number;

    @Prop({ required: false, default: new Date() })
    uploadDate: Date;

    @Prop({ required: false, default: new Date() })
    updateDate: Date;
}

export const ProductsSchema = SchemaFactory.createForClass(Product);
