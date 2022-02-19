import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type AccessoriesDocument = Accessories & Document;
export type AssemblyDocument = Assembly & Document;

export class Product {

    @Prop({ default: 'assembly', required: true }) //assembly, periphery, accessories, services
    type: string;

    @Prop({required: true})
    name: string;

    @Prop({ default: 0, required: true })
    price: number;

    @Prop({ default: '' })
    description: string;

    @Prop({ default: 'pic' })
    pictures: [string];

    @Prop({ default: 0, min: 0, max: 5})
    rating: number;

    /* @Prop({default: ''})
    review: string; */

    @Prop({ default: new Date })
    uploadDate: Date;

}

@Schema({versionKey: false})
export class Accessories extends Product {

    type = this.type;

    price = this.price;

    description = this.description;

    pictures = this.pictures;

    rating = this.rating;

    uploadDate = this.uploadDate;

    name = this.name;

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

@Schema({versionKey: false})
export class Assembly extends Product {

    type = this.type;

    price = this.price;

    description = this.description;

    pictures = this.pictures;

    rating = this.rating;

    uploadDate = this.uploadDate;

    name = this.name;

    @Prop({ ref: 'accessories' })
    accessories: [string];
}

export const AccessoriesSchema = SchemaFactory.createForClass(Accessories);
export const AssemblySchema = SchemaFactory.createForClass(Assembly);