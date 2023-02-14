import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Characteristic } from 'src/common/interfaces/product.interface';

export type ProductsDocument = Product & Document;

@Schema({ versionKey: false, collection: process.env.COLLECTION_KEY_PRODUCTS })
export class Product {
    @Prop({ required: true })
    categories: string[];

    @Prop({ default: [] })
    characteristics: Characteristic[];

    @Prop({ required: false, default: '' })
    class: string;

    @Prop({ required: false, default: 1 })
    count: number;

    @Prop({ required: false, default: '' })
    description: string;

    @Prop({ required: false, default: 0 })
    discount_price: number;

    @Prop({ required: false, default: false })
    is_hidden: boolean;

    @Prop({ required: false, default: false })
    is_imported: boolean;

    @Prop({ required: false, default: '' })
    maker: string;

    @Prop({ required: true, default: 0 })
    market_price: number;

    @Prop({ required: false, default: '' })
    model: string;

    @Prop({ required: true, default: '' })
    name: string;

    @Prop({ required: false })
    pictures: [string];

    @Prop({ required: false })
    preview_picture: string;

    @Prop({ required: true, default: 0 })
    price: number;

    @Prop({ required: false, default: 0, min: 0, max: 5 })
    rating: number;

    @Prop({ required: true, default: 0 })
    supplier_price: number;

    @Prop()
    template: Characteristic[];

    @Prop({ required: false, default: new Date() })
    update_date: Date;

    @Prop({ required: false, default: new Date() })
    upload_date: Date;

    @Prop({ required: true })
    warranty_days: number;

    @Prop({ required: false, default: '' })
    vendor_code: string;

    @Prop({ required: false, default: '' })
    weight: string;
}

export const ProductsSchema = SchemaFactory.createForClass(Product);
