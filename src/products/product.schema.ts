import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type AccessoriesDocument = Accessories & Document;
export type AssemblyDocument = Assembly & Document;

export class Product {

    @Prop({ default: 'assembly' }) //assembly, periphery, accessories, services
    type: string;

    @Prop({ default: 0 })
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

@Schema()
export class Accessories extends Product {

    type = this.type;

    price = this.price;

    description = this.description;

    pictures = this.pictures;

    rating = this.rating;

    uploadDate = this.uploadDate;

    /* @Prop({ ref: '' })
    accessories: [string]; */
}

@Schema()
export class Assembly extends Product {

    type = this.type;

    price = this.price;

    description = this.description;

    pictures = this.pictures;

    rating = this.rating;

    uploadDate = this.uploadDate;

    @Prop({ ref: 'accessories' })
    accessories: [string];
}

export const AccessoriesSchema = SchemaFactory.createForClass(Accessories);
export const AssemblySchema = SchemaFactory.createForClass(Assembly);