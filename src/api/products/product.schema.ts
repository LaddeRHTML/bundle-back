import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ProductCharacteristic } from 'src/interfaces/product.interface';

export type AccessoriesDocument = Accessories & Document;
export type AssemblyDocument = Assembly & Document;

export class Product {
    @Prop({ default: 'assembly', required: true }) //assembly, periphery, accessories, services
    type: string;

    @Prop({ required: true })
    name: string;

    @Prop({ default: 0, required: true })
    price: number;

    @Prop({})
    discountPrice: number;

    @Prop({ default: '' })
    description: string;

    @Prop({ default: 'pic' })
    pictures: [string];

    @Prop()
    previewPicture: string;

    @Prop({ default: 0, min: 0, max: 5 })
    rating: number;

    /* @Prop({default: ''})
    review: string; */

    @Prop({ default: new Date() })
    uploadDate: Date;

    @Prop({ default: new Date() })
    updateDate: Date;

    @Prop({ default: [] })
    characteristic: [ProductCharacteristic];
}

@Schema({ versionKey: false })
export class Accessories extends Product {
    type = this.type;

    price = this.price;

    discountPrice = this.discountPrice;

    description = this.description;

    pictures = this.pictures;

    previewPicture = this.previewPicture;

    rating = this.rating;

    uploadDate = this.uploadDate;

    updateDate = this.updateDate;

    name = this.name;

    characteristic = this.characteristic;

    @Prop({ default: 0 })
    buyPrice: number;

    // разновидность, например видеокарта
    @Prop()
    class: string;

    @Prop()
    vendorСode: string;

    @Prop()
    maker: string;

    @Prop()
    weight: string;

    @Prop()
    additionalData: string;

    @Prop()
    model: string;

    /* @Prop({ ref: '' })
    accessories: [string]; */
}

@Schema({ versionKey: false })
export class Assembly extends Product {
    type = this.type;

    price = this.price;

    discountPrice = this.discountPrice;

    description = this.description;

    pictures = this.pictures;

    previewPicture = this.previewPicture;

    rating = this.rating;

    uploadDate = this.uploadDate;

    updateDate = this.updateDate;

    name = this.name;

    characteristic = this.characteristic;

    @Prop({ ref: 'accessories' })
    accessories: [string];
}

export const AccessoriesSchema = SchemaFactory.createForClass(Accessories);
export const AssemblySchema = SchemaFactory.createForClass(Assembly);
