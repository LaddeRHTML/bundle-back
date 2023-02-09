import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { KeyValueObject } from 'src/common/interfaces/product.interface';

export type ProductsDocument = Product & Document;

@Schema({ versionKey: false, collection: process.env.COLLECTION_KEY_PRODUCTS })
export class Product {
    @Prop({ required: true, default: 'home_c' })
    category: string;

    @Prop({ default: [] })
    characteristics: [KeyValueObject];

    @Prop({ required: false, default: '' })
    class: string;

    @Prop({ required: false, default: 1 })
    count: number;

    @Prop({ required: false, default: '' })
    description: string;

    @Prop({ required: false, default: 0 })
    discountPrice: number;

    @Prop({ required: false, default: false })
    isHidden: boolean;

    @Prop({ required: false, default: false })
    isImported: boolean;

    @Prop({ required: false, default: '' })
    maker: string;

    @Prop({ required: true, default: 0 })
    marketPrice: number;

    @Prop({ required: false, default: '' })
    model: string;

    @Prop({ required: true, default: '' })
    name: string;

    @Prop({ required: false })
    pictures: [string];

    @Prop({ required: false })
    previewPicture: string;

    @Prop({ required: true, default: 0 })
    price: number;

    @Prop({ required: false, default: 0, min: 0, max: 5 })
    rating: number;

    @Prop({ required: true, default: 0 })
    supplierPrice: number;

    @Prop({ required: false, default: new Date() })
    updateDate: Date;

    @Prop({ required: false, default: new Date() })
    uploadDate: Date;

    @Prop({ required: true })
    warrantyDays: number;

    @Prop({ required: false, default: '' })
    vendorСode: string;

    @Prop({ required: false, default: '' })
    weight: string;
}

export const ProductsSchema = SchemaFactory.createForClass(Product);
