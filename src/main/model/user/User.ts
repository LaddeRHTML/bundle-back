import { IsBoolean, IsDate, IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';
import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

import { Order } from 'model/order/Order';

import { Gender, Role } from './UserEnums';

@Entity('user')
export class User {
    @ApiProperty({ name: 'id', uniqueItems: true })
    @PrimaryGeneratedColumn('uuid')
    public id: string;

    @ApiProperty({ name: 'name', type: 'varchar', required: true })
    @Column({ name: 'name', type: 'varchar' })
    @IsNotEmpty()
    public name: string;

    @ApiProperty({ maximum: 30, minimum: 13, uniqueItems: true, required: true })
    @Column({ name: 'email', type: 'varchar', unique: true })
    @MaxLength(30)
    @MinLength(13)
    @IsEmail()
    @IsNotEmpty()
    public email: string;

    @ApiProperty({ type: 'varchar', maxLength: 30, minLength: 6, required: true })
    @Column({ name: 'password', type: 'varchar', select: false })
    @MaxLength(30)
    @MinLength(6)
    @IsNotEmpty()
    public password: string;

    @ApiProperty({ name: 'role', enum: Role, default: Role.User, required: false })
    @Column({ name: 'role', type: 'enum', enum: Role, default: Role.User })
    public role: Role;

    @ApiProperty({ name: 'age', type: 'smallint', default: 0, required: true })
    @Column({ name: 'age', type: 'smallint', default: 0 })
    public age: number;

    @ApiProperty({
        name: 'gender',
        type: 'enum',
        enum: Gender,
        default: Gender.Unknown,
        required: false
    })
    @Column({ name: 'gender', type: 'enum', enum: Gender, default: Gender.Unknown })
    public gender: string;

    @ApiProperty({ name: 'allowedToLogin', type: 'boolean', default: true, required: false })
    @Column({ name: 'allowed_to_login', type: 'boolean', default: true })
    @IsBoolean()
    public allowedToLogin: boolean;

    @ApiProperty({ name: 'familyName', type: 'varchar', required: true })
    @Column({ name: 'family_name', type: 'varchar' })
    public familyName: string;

    @ApiProperty({ name: 'patronymic', type: 'varchar', maxLength: 40, required: false })
    @Column({ name: 'patronymic', type: 'varchar', nullable: true })
    @MaxLength(40)
    public patronymic: string;

    @ApiProperty({ name: 'birthday', type: 'timestamptz', default: new Date(), required: false })
    @Column({ name: 'birthday', type: 'timestamptz', default: new Date() })
    @IsDate()
    public birthday: Date;

    @ApiProperty({
        name: 'phoneNumber',
        type: 'varchar',
        maxLength: 11,
        minLength: 11,
        uniqueItems: true
    })
    @Column({ name: 'phone_number', type: 'varchar', unique: true })
    @MaxLength(11)
    @MinLength(11)
    @IsNotEmpty()
    public phoneNumber: string;

    @ApiProperty({
        name: 'country',
        type: 'varchar',
        default: 'Kazakhstan',
        maxLength: 30,
        required: false
    })
    @Column({ name: 'country', type: 'varchar', default: 'Kazakhstan' })
    @MaxLength(30)
    public country: string;

    @ApiProperty({
        name: 'city',
        type: 'varchar',
        default: 'Almaty',
        maxLength: 30,
        required: false
    })
    @Column({ name: 'city', type: 'varchar', default: 'Almaty' })
    @MaxLength(30)
    public city: string;

    @ApiProperty({ name: 'address', type: 'varchar', maxLength: 70, required: false })
    @Column({ name: 'address', type: 'varchar', nullable: true })
    @MaxLength(70)
    public address: string;

    @ApiProperty({ name: 'isLegalEntity', type: 'boolean', default: false, required: false })
    @Column({ name: 'is_legal_entity', type: 'boolean', default: false })
    @IsBoolean()
    public isLegalEntity: boolean;

    @ApiProperty({ name: 'iin', type: 'varchar', required: false })
    @Column({ name: 'iin', type: 'varchar', nullable: true })
    public iin: string;

    @ApiProperty({ name: 'updateDate', type: 'timestamptz', default: new Date(), required: false })
    @Column({ name: 'update_date', type: 'timestamptz', default: new Date() })
    @IsDate()
    public updateDate: Date;

    @ApiProperty({
        name: 'registrationDate',
        type: 'timestamptz',
        default: new Date(),
        required: false
    })
    @Column({ name: 'registration_date', type: 'timestamptz', default: new Date() })
    @IsDate()
    public registrationDate: Date;

    @ApiProperty({ name: 'avatarId', type: 'varchar', required: false })
    @Column({ name: 'avatar_id', type: 'varchar', nullable: true })
    public avatarId: string | null;

    @ApiProperty({ name: 'orders', type: () => [Order], required: false })
    @JoinColumn({ name: 'orders' })
    @OneToMany(() => Order, (o: Order) => o.client, { nullable: true })
    public orders: Order[];
}
