import { IsDate, IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';
import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Order } from 'model/order/Order';

import { Gender, Role } from './UserEnums';
import { ApiProperty } from '@nestjs/swagger';
import { Controller } from '@nestjs/common';

@Entity()
@Controller('/users')
export class User {
    @ApiProperty()
    @PrimaryGeneratedColumn('uuid')
    public id: string;

    @ApiProperty()
    @Column({ type: 'varchar' })
    @IsNotEmpty()
    public name: string;

    @ApiProperty({
        minimum: 13,
        maximum: 30,
        uniqueItems: true
    })
    @Column({
        unique: true
    })
    @MaxLength(30)
    @MinLength(13)
    @IsEmail()
    @IsNotEmpty()
    public email: string;

    @ApiProperty({
        minimum: 6,
        maximum: 30
    })
    @Column({ type: 'varchar', select: false })
    @MaxLength(30)
    @MinLength(6)
    @IsNotEmpty()
    public password: string;

    @ApiProperty()
    @Column({ type: 'enum', enum: Role, default: Role.User })
    public role: Role;

    @ApiProperty()
    @Column({ type: 'smallint', default: 0 })
    public age: number;

    @ApiProperty()
    @Column({ type: 'enum', enum: Gender, default: Gender.Unknown })
    public gender: string;

    @ApiProperty()
    @Column({ default: true })
    public allowed_to_login: boolean;

    @ApiProperty()
    @Column({ type: 'varchar' })
    public family_name: string;

    @ApiProperty()
    @Column({ type: 'varchar', nullable: true })
    public patronymic: string;

    @ApiProperty()
    @Column({ type: 'timestamptz', default: new Date() })
    @IsDate()
    public birthday: Date;

    @ApiProperty()
    @Column({ type: 'varchar', unique: true })
    @MaxLength(11)
    @MinLength(11)
    @IsNotEmpty()
    public phone_number: string;

    @ApiProperty()
    @Column({ type: 'varchar', default: 'Kazakhstan' })
    public country: string;

    @ApiProperty()
    @Column({ type: 'varchar', default: 'Almaty' })
    public city: string;

    @ApiProperty()
    @Column({ type: 'varchar', default: '' })
    public address: string;

    @ApiProperty()
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

    @ApiProperty()
    @Column({ name: 'avatar_id', type: 'varchar', nullable: true })
    public avatar_id: string | null;

    @ApiProperty()
    @JoinColumn({ name: 'orders' })
    @OneToMany(() => Order, (o: Order) => o.client, {
        nullable: true
    })
    public orders: Order[];
}
