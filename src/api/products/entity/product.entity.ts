import { File } from 'api/files/entitiy/file.entity';
import { IsArray } from 'class-validator';
import { BaseEntity } from 'common/base_entity';
import { Column, Entity, Index, JoinColumn, OneToOne, Unique } from 'typeorm';

@Entity()
@Unique(['name', 'model', 'maker'])
export class Product extends BaseEntity {
    @IsArray()
    categories: string[];

    @Column({ default: 1 })
    count: number;

    @Column({ default: '' })
    description: string;

    @Column({ default: 0 })
    discount_price: number;

    @Column({ default: false })
    is_hidden: boolean;

    @Column({ default: false })
    is_imported: boolean;

    @Column({ default: '' })
    maker: string;

    @Column({ default: 0 })
    market_price: number;

    @Column({ default: '' })
    model: string;

    @Index({ unique: true })
    @Column()
    name: string;

    @JoinColumn({ name: 'preview_picture' })
    @OneToOne(() => File, {
        nullable: true,
        cascade: true
    })
    public preview_picture?: File;

    @Column({ nullable: true })
    public preview_picture_id: string;

    @JoinColumn({ name: 'pictures' })
    @OneToOne(() => File, {
        nullable: true
    })
    public pictures?: File[];

    @Column('simple-array', { nullable: true })
    @IsArray()
    public pictures_id: string[];

    @Column({ default: 0 })
    price: number;

    @Column({ default: 0 })
    supplier_price: number;

    @Column({ nullable: true })
    warranty_days: number;

    @Column({ default: '' })
    vendor_code: string;

    @Column({ default: '' })
    weight: string;
}
