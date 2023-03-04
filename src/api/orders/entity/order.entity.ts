import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToOne } from 'typeorm';

import { BaseEntity } from 'common/base_entity';
import { User } from 'api/users/entity/user.entity';
import { Product } from 'api/products/entity/product.entity';

import { DeliveryType, PaymentMethod, Source, Status } from '../enums/order.enums';

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

    @JoinColumn({ name: 'client' })
    @ManyToOne(() => User, (u) => u.orders, {
        cascade: true
    })
    public client: User;

    @JoinColumn({ name: 'current_manager' })
    @OneToOne(() => User, {
        eager: true,
        cascade: true
    })
    public current_manager: string;

    @ManyToMany(() => Product, (p: Product) => p.orders, {
        eager: true,
        cascade: true
    })
    @JoinTable()
    public products: Product[];

    @JoinColumn({ name: 'delivered_by' })
    @OneToOne(() => User, {
        eager: true,
        cascade: true,
        nullable: true
    })
    public delivered_by: User;
}
