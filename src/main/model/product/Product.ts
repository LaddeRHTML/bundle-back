import { ApiProperty } from '@nestjs/swagger';
import {
    Column,
    Entity,
    Index,
    JoinColumn,
    JoinTable,
    ManyToMany,
    ManyToOne,
    Unique
} from 'typeorm';
import { IsArray, Max, Min } from 'class-validator';

import { BaseEntity } from 'model/base';
import { Order } from 'model/order/Order';
import { Motherboard } from 'model/accessories/Motherboard/Motherboard';
import { CPU } from 'model/accessories/CPU/CPU';
import { RAM } from 'model/accessories/RAM/RAM';
import { HDD } from 'model/accessories/HDD/HDD';
import { Cooler } from 'model/accessories/Cooler/Cooler';
import sumArray from 'common/utils/array/sumArray';
import { PowerUnit } from 'model/accessories/PowerUnit/PowerUnit';
import { GPU } from 'model/accessories/GPU/GPU';
import { PCCase } from 'model/accessories/PCCase/PCCase';

@Entity('product')
@Unique(['name'])
export class Product extends BaseEntity {
    constructor(prices: number[]) {
        super();
        this.price = sumArray(prices);
    }

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

    @ApiProperty({ name: 'cpu', type: () => CPU, required: true })
    @ManyToOne(() => CPU, (c: CPU) => c, { cascade: true, eager: true, nullable: false })
    @JoinColumn({ name: 'cpu' })
    public cpu: CPU;

    @ApiProperty({ name: 'motherboard', type: () => Motherboard, required: true })
    @ManyToOne(() => Motherboard, (m: Motherboard) => m, {
        cascade: true,
        eager: true,
        nullable: false
    })
    @JoinColumn({ name: 'motherboard' })
    public motherboard: Motherboard;

    @ApiProperty({ name: 'ramCount', type: 'smallint', maximum: 8, required: true })
    @Column({ name: 'ram_count', type: 'smallint', nullable: true })
    @Max(8)
    public ramCount: number;

    @ApiProperty({ name: 'ram', type: () => RAM, required: true })
    @ManyToOne(() => RAM, (r: RAM) => r, { cascade: true, eager: true, nullable: false })
    @JoinColumn({ name: 'ram' })
    public ram: RAM[];

    @ApiProperty({ name: 'hdd', type: () => HDD, nullable: false })
    @ManyToMany(() => HDD, (h: HDD) => h, { cascade: true, eager: true, nullable: false })
    @JoinTable({
        name: 'hdd_in_products',
        joinColumn: {
            name: 'product_id',
            referencedColumnName: 'id'
        },
        inverseJoinColumn: {
            name: 'hdd_id',
            referencedColumnName: 'id'
        }
    })
    public hdd: HDD[];

    @ApiProperty({ name: 'cooler', type: () => Cooler, required: true, nullable: false })
    @ManyToOne(() => Cooler, (c: Cooler) => c, { cascade: true, eager: true, nullable: false })
    @JoinColumn({ name: 'cooler' })
    public cooler: Cooler;

    @ApiProperty({ name: 'powerUnit', type: () => PowerUnit, required: true })
    @ManyToOne(() => PowerUnit, (p: PowerUnit) => p, {
        cascade: true,
        eager: true,
        nullable: false
    })
    @JoinColumn({ name: 'powerUnit' })
    public powerUnit: PowerUnit;

    @ApiProperty({ name: 'gpu', type: () => GPU, required: true })
    @ManyToOne(() => GPU, (g: GPU) => g, { cascade: true, eager: true, nullable: false })
    @JoinColumn({ name: 'gpu' })
    public gpu: GPU;

    @ApiProperty({ name: 'pccase', type: () => PCCase, required: true })
    @ManyToOne(() => PCCase, (p: PCCase) => p, { cascade: true, eager: true, nullable: false })
    @JoinColumn({ name: 'pccase' })
    public pccase: PCCase;

    @ApiProperty({ name: 'picturesId', isArray: true, type: 'string', required: false })
    @Column({ name: 'pictures_id', type: 'simple-array', nullable: true })
    @IsArray()
    public picturesId: string[];

    @ApiProperty({ name: 'orders', isArray: true, required: false })
    @ManyToMany(() => Order, (o: Order) => o.products, { nullable: true })
    public orders: Order[];
}
