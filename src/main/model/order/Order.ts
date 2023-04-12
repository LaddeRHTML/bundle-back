import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne } from 'typeorm';

import { BaseEntity } from 'model/base';
import { User } from 'model/user/User';
import { Product } from 'model/product/Product';

import { DeliveryType, PaymentMethod, Source, Status } from './OrderEnums';

@Entity()
export class Order extends BaseEntity {
    @Column({ type: 'smallint', nullable: true })
    public close_interval: number;

    @Column({ type: 'timestamptz', nullable: true })
    public delivery_date: Date;

    @Column({ type: 'timestamptz' })
    public purchase_date: Date;

    @Column({ type: 'timestamptz' })
    public planned_delivery_date: Date;

    @Column({ type: 'enum', enum: DeliveryType, default: DeliveryType.teamMember })
    public delivery_type: DeliveryType;

    @Column({ type: 'enum', enum: PaymentMethod, default: PaymentMethod.cash })
    public payment_method: PaymentMethod;

    @Column({ type: 'enum', enum: Source, default: Source.webSite })
    public source: Source;

    @Column({ type: 'enum', enum: Status, default: Status.open })
    public status: Status;

    @ManyToOne(() => User, (u) => u.orders, {
        cascade: true,
        eager: true
    })
    public client: User;

    @JoinColumn({ name: 'current_manager' })
    @ManyToOne(() => User, {
        eager: true,
        cascade: true,
        nullable: true
    })
    public current_manager: User;

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

    @JoinColumn({ name: 'delivered_by' })
    @ManyToOne(() => User, {
        eager: true,
        cascade: true,
        nullable: true
    })
    public delivered_by: User;
}
