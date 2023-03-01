import { IsArray, IsDate, IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { Gender, Role } from '../enum';

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    @IsNotEmpty()
    name: string;

    @Column({
        unique: true
    })
    @MaxLength(30)
    @MinLength(13)
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @Column({ select: false })
    @MaxLength(30)
    @MinLength(6)
    @IsNotEmpty()
    password: string;

    @Column({ type: 'enum', enum: Role, default: Role.User })
    role: Role;

    @Column({ default: 0 })
    age: number;

    @Column({ default: '' })
    avatar: string;

    @Column({ type: 'enum', enum: Gender, default: Gender.Unknown })
    gender: string;

    @Column({ default: true })
    allowed_to_login: boolean;

    //     @OneToOne(() => Order)
    //   @JoinColumn()
    /* После создания этой ентити, необходимо создать ентити заказов и связать из как на снппете выше  */
    // @Column({ ref: Order.name, array: true })
    @IsArray()
    orders: string[];

    @Column({})
    family_name: string;

    @Column({})
    patronymic: string;

    @Column({})
    @IsDate()
    birthday: Date;

    @Column({ unique: true })
    @MaxLength(11)
    @MinLength(11)
    @IsNotEmpty()
    phone_number: string;

    @Column({ default: 'Kazakhstan' })
    country: string;

    @Column({ default: 'Almaty' })
    city: string;

    @Column({ default: '' })
    address: string;

    @Column({ default: false })
    is_legal_entity: boolean;

    @Column({ default: '', nullable: true })
    iin: string;

    @Column({ default: new Date() })
    @IsDate()
    update_date: Date;

    @Column({ default: new Date() })
    @IsDate()
    registration_date: Date;
}
