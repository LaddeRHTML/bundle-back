import { IsDate, IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

import { File } from 'api/files/entitiy/file.entity';

import { Order } from 'api/orders/entity/order.entity';
import { Gender, Role } from '../enum';

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    public id: string;

    @Column({ type: 'varchar' })
    @IsNotEmpty()
    public name: string;

    @Column({
        unique: true
    })
    @MaxLength(30)
    @MinLength(13)
    @IsEmail()
    @IsNotEmpty()
    public email: string;

    @Column({ type: 'varchar', select: false })
    @MaxLength(30)
    @MinLength(6)
    @IsNotEmpty()
    public password: string;

    @Column({ type: 'enum', enum: Role, default: Role.User })
    public role: Role;

    @Column({ type: 'smallint', default: 0 })
    public age: number;

    @Column({ type: 'varchar', nullable: true })
    public avatar_id: string;

    @Column({ type: 'enum', enum: Gender, default: Gender.Unknown })
    public gender: string;

    @Column({ default: true })
    public allowed_to_login: boolean;

    @Column({ type: 'varchar' })
    public family_name: string;

    @Column({ type: 'varchar' })
    public patronymic: string;

    @Column({})
    @IsDate()
    public birthday: Date;

    @Column({ type: 'varchar', unique: true })
    @MaxLength(11)
    @MinLength(11)
    @IsNotEmpty()
    public phone_number: string;

    @Column({ type: 'varchar', default: 'Kazakhstan' })
    public country: string;

    @Column({ type: 'varchar', default: 'Almaty' })
    public city: string;

    @Column({ type: 'varchar', default: '' })
    public address: string;

    @Column({ type: 'boolean', default: false })
    public is_legal_entity: boolean;

    @Column({ type: 'varchar', default: '', nullable: true })
    public iin: string;

    @Column({ type: 'timestamptz', default: new Date() })
    @IsDate()
    public update_date: Date;

    @Column({ type: 'timestamptz', default: new Date() })
    @IsDate()
    public registration_date: Date;

    @JoinColumn({ name: 'avatar_id' })
    @OneToOne(() => File, {
        nullable: true
    })
    public avatar?: File;

    @JoinColumn({ name: 'orders' })
    @OneToMany(() => Order, (o: Order) => o.client, {
        nullable: true
    })
    public orders: Order[];
}
