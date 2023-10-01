import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, Index, ManyToMany, Unique } from 'typeorm';
import { IsArray, Length, Max, Min } from 'class-validator';

import { BaseEntity } from 'model/base';
import { Order } from 'model/order/Order';

@Entity('product')
@Unique(['name'])
export class Product extends BaseEntity {
    @ApiProperty({ name: 'discountPrice', type: 'integer', default: 0 })
    @Column({ name: 'discount_price', type: 'integer', default: 0 })
    public discountPrice: number;

    @ApiProperty({ name: 'name', type: 'varchar', required: true })
    @Index({ unique: true })
    @Column({ name: 'name', type: 'varchar' })
    public name: string;

    @ApiProperty({ name: 'previewPictureId', type: 'varchar', required: false })
    @Column({ name: 'preview_picture_id', type: 'varchar', nullable: true })
    public previewPictureId: string | null;

    @ApiProperty({ name: 'price', type: 'numeric', required: false })
    @Column({
        name: 'price',
        type: 'numeric',
        precision: 10,
        scale: 2,
        nullable: false,
        default: 300000
    })
    @Max(10000000)
    @Min(300000)
    public price: number;

    @ApiProperty({ name: 'warrantyDays', type: 'smallint', required: false })
    @Column({ name: 'warranty_days', type: 'smallint', nullable: true })
    public warrantyDays: number;

    @ApiProperty({ name: 'weight', type: 'varchar', required: false })
    @Column({ name: 'weight', type: 'varchar', default: '', nullable: true })
    public weight: string;

    @ApiProperty({ name: 'picturesId', isArray: true, type: 'string', required: false })
    @Column({ name: 'pictures_id', type: 'simple-array', nullable: true })
    @IsArray()
    public picturesId: string[];

    @ApiProperty({ name: 'orders', isArray: true, required: false })
    @ManyToMany(() => Order, (o: Order) => o.products, { nullable: true })
    public orders: Order[];

    @ApiProperty({ name: 'category', type: 'string', required: false })
    @Column({ name: 'category', type: 'varchar', nullable: true })
    @Length(1, 255)
    public category: string;

    @ApiProperty({ name: 'marketprice', type: 'number', required: false })
    @Column({ name: 'market_price', type: 'float', nullable: true })
    public marketprice: number;

    @ApiProperty({ name: 'supplierPrice', type: 'number', required: false })
    @Column({ name: 'supplier_price', type: 'float', nullable: true })
    public supplierPrice: number;

    @ApiProperty({ name: 'description', type: 'string', required: false })
    @Column({ name: 'description', type: 'text', nullable: true })
    @Length(1, 5000) // Adjust the length accordingly
    public description: string;

    @ApiProperty({ name: 'rating', type: 'number', required: false })
    @Column({ name: 'rating', type: 'float', nullable: true })
    @Min(0)
    @Max(5)
    public rating: number;

    @ApiProperty({ name: 'count', type: 'number', required: false })
    @Column({ name: 'count', type: 'int', nullable: true })
    public count: number;

    @ApiProperty({ name: 'characteristics', type: 'object', required: false })
    @Column({ name: 'characteristics', type: 'jsonb', nullable: true })
    public characteristics: Record<string, string>;

    @ApiProperty({ name: 'vendorСode', type: 'string', required: false })
    @Column({ name: 'vendor_code', type: 'varchar', nullable: true })
    @Length(1, 255)
    public vendorСode: string;

    @ApiProperty({ name: 'maker', type: 'string', required: false })
    @Column({ name: 'maker', type: 'varchar', nullable: true })
    @Length(1, 255)
    public maker: string;

    @ApiProperty({ name: 'model', type: 'string', required: false })
    @Column({ name: 'model', type: 'varchar', nullable: true })
    @Length(1, 255)
    public model: string;
}
