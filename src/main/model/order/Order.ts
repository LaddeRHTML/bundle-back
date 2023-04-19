import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

import { BaseEntity } from 'model/base';
import { User } from 'model/user/User';
import { Product } from 'model/product/Product';

import { DeliveryType, PaymentMethod, Source, Status } from './OrderEnums';

@Entity()
export class Order extends BaseEntity {
    @ApiProperty({
        name: 'closeInterval',
        type: 'smallint',
        nullable: true,
        required: false
    })
    @Column({ name: 'close_interval', type: 'smallint', nullable: true })
    public closeInterval: number;

    @ApiProperty({
        name: 'deliveryDate',
        type: 'timestamptz',
        nullable: true,
        required: false
    })
    @Column({ name: 'delivery_date', type: 'timestamptz', nullable: true })
    public deliveryDate: Date;

    @ApiProperty({
        name: 'purchaseDate',
        type: 'timestamptz',
        nullable: true,
        required: false
    })
    @Column({ name: 'purchase_date', type: 'timestamptz', nullable: true })
    public purchaseDate: Date;

    @ApiProperty({
        name: 'plannedDeliveryDate',
        type: 'timestamptz',
        nullable: true,
        required: false
    })
    @Column({ name: 'planned_delivery_date', type: 'timestamptz', nullable: true })
    public plannedDeliveryDate: Date;

    @ApiProperty({
        name: 'deliveryType',
        type: 'enum',
        enum: DeliveryType,
        default: DeliveryType.teamMember
    })
    @Column({
        name: 'delivery_type',
        type: 'enum',
        enum: DeliveryType,
        default: DeliveryType.teamMember
    })
    public deliveryType: DeliveryType;

    @ApiProperty({
        name: 'paymentMethod',
        type: 'enum',
        enum: PaymentMethod,
        nullable: true
    })
    @Column({ name: 'payment_method', type: 'enum', enum: PaymentMethod, nullable: true })
    public paymentMethod: PaymentMethod;

    @ApiProperty({
        name: 'source',
        type: 'enum',
        enum: Source
    })
    @Column({ name: 'source', type: 'enum', enum: Source })
    public source: Source;

    @ApiProperty({ name: 'status', type: 'enum', enum: Status, default: Status.open })
    @Column({ name: 'status', type: 'enum', enum: Status, default: Status.open })
    public status: Status;

    @ApiProperty({ name: 'client', type: () => User, nullable: true })
    @ManyToOne(() => User, (u) => u.orders, { cascade: true, eager: true, nullable: true })
    @JoinColumn({ name: 'client' })
    public client: User;

    @ApiProperty({ name: 'currentManager', type: () => User, nullable: true })
    @ManyToOne(() => User, { eager: true, cascade: true, nullable: true })
    @JoinColumn({ name: 'current_manager' })
    public currentManager: User;

    @ApiProperty({ name: 'products', type: () => Product, nullable: true })
    @ManyToMany(() => Product, (p: Product) => p.orders, {
        eager: true,
        cascade: true,
        nullable: true
    })
    @JoinTable({
        name: 'ordered_products',
        joinColumn: {
            name: 'order_id',
            referencedColumnName: 'id'
        },
        inverseJoinColumn: {
            name: 'product_id',
            referencedColumnName: 'id'
        }
    })
    public products?: Product[];

    @ApiProperty({ name: 'deliveredBy', type: () => User, nullable: true })
    @ManyToOne(() => User, { eager: true, cascade: true, nullable: true })
    @JoinColumn({ name: 'delivered_by' })
    public deliveredBy: User;
}
