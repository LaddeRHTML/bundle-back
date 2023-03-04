import { File } from 'api/files/entitiy/file.entity';
import { Order } from 'api/orders/entity/order.entity';
import { IsArray } from 'class-validator';
import { BaseEntity } from 'common/base_entity';
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

@Entity()
@Unique(['name', 'model', 'maker'])
export class Product extends BaseEntity {
    @IsArray()
    categories: string[];

    @Column({ type: 'smallint', default: 1 })
    count: number;

    @Column({ type: 'varchar', default: '' })
    description: string;

    @Column({ type: 'money', default: 0 })
    discount_price: number;

    @Column({ type: 'boolean', default: false })
    is_hidden: boolean;

    @Column({ type: 'boolean', default: false })
    is_imported: boolean;

    @Column({ type: 'varchar', default: '' })
    maker: string;

    @Column({ type: 'money', default: 0 })
    market_price: number;

    @Column({ type: 'varchar', default: '' })
    model: string;

    @Index({ unique: true })
    @Column({ type: 'varchar' })
    name: string;

    @Column({ type: 'varchar', nullable: true })
    public preview_picture_id: string;

    @Column({ type: 'money', default: 0 })
    price: number;

    @Column({ type: 'money', default: 0 })
    supplier_price: number;

    @Column({ type: 'smallint', nullable: true })
    warranty_days: number;

    @Column({ type: 'varchar', default: '' })
    vendor_code: string;

    @Column({ type: 'varchar', default: '' })
    weight: string;

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
