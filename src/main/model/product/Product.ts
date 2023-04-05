import {
    Column,
    Entity,
    Index,
    JoinColumn,
    ManyToMany,
    ManyToOne,
    OneToOne,
    Unique
} from 'typeorm';
import { IsArray, Max, Min } from 'class-validator';

import { BaseEntity } from 'model/base';
import { Order } from 'model/order/Order';
import { File } from 'model/file/File';
import { Motherboard } from 'model/accessories/Motherboard/Motherboard';
import sumArray from 'common/utils/array/sumArray';
import { CPU } from 'model/accessories/CPU/CPU';
import { RAM } from 'model/accessories/RAM/RAM';

@Entity()
@Unique(['name'])
export class Product extends BaseEntity {
    constructor(prices: number[]) {
        super();
        this.price = sumArray(prices);
    }

    @Column({ name: 'discount_price', type: 'integer', default: 0 })
    public discount_price: number;

    @Index({ unique: true })
    @Column({ name: 'name', type: 'varchar' })
    public name: string;

    @Column({ name: 'preview_picture_id', type: 'varchar', nullable: true })
    public preview_picture_id: string;

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

    @Column({ name: 'warranty_days', type: 'smallint', nullable: true })
    public warranty_days: number;

    @Column({ name: 'weight', type: 'varchar', default: '', nullable: true })
    public weight: string;

    @ManyToOne(() => CPU, (c: CPU) => c, {
        cascade: true,
        eager: true
    })
    public CPU: CPU;

    @ManyToOne(() => Motherboard, (m: Motherboard) => m, {
        cascade: true,
        eager: true
    })
    public motherboard: Motherboard;

    @ManyToOne(() => RAM, (r: RAM) => r, {
        cascade: true,
        eager: true
    })
    public RAM: RAM;

    @JoinColumn({ name: 'pictures' })
    @ManyToOne(() => File, {
        eager: true,
        cascade: true,
        nullable: true
    })
    public pictures?: File[];

    @Column('simple-array', { nullable: true })
    @IsArray()
    public pictures_id: string[];

    @ManyToMany(() => Order, (o: Order) => o.products, {
        nullable: true
    })
    public orders: Order[];

    @JoinColumn({ name: 'preview_picture' })
    @OneToOne(() => File, {
        eager: true,
        cascade: true,
        nullable: true
    })
    public preview_picture?: File;
}
