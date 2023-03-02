import { File } from 'api/files/entitiy/file.entity';
import { IsArray, IsDate, IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Gender, Role } from '../enum';

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    public id: string;

    @Column()
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

    @Column({ select: false })
    @MaxLength(30)
    @MinLength(6)
    @IsNotEmpty()
    public password: string;

    @Column({ type: 'enum', enum: Role, default: Role.User })
    public role: Role;

    @Column({ default: 0 })
    public age: number;

    @JoinColumn({ name: 'avatar_id' })
    @OneToOne(() => File, {
        nullable: true
    })
    public avatar?: File;

    @Column({ nullable: true })
    public avatar_id: string;

    @Column({ type: 'enum', enum: Gender, default: Gender.Unknown })
    public gender: string;

    @Column({ default: true })
    public allowed_to_login: boolean;

    //     @OneToOne(() => Order)
    //   @JoinColumn()
    /* После создания этой ентити, необходимо создать ентити заказов и связать из как на снппете выше  */
    // @Column({ ref: Order.name, array: true })
    @IsArray()
    public orders: string[];

    @Column({})
    public family_name: string;

    @Column({})
    public patronymic: string;

    @Column({})
    @IsDate()
    public birthday: Date;

    @Column({ unique: true })
    @MaxLength(11)
    @MinLength(11)
    @IsNotEmpty()
    public phone_number: string;

    @Column({ default: 'Kazakhstan' })
    public country: string;

    @Column({ default: 'Almaty' })
    public city: string;

    @Column({ default: '' })
    public address: string;

    @Column({ default: false })
    public is_legal_entity: boolean;

    @Column({ default: '', nullable: true })
    public iin: string;

    @Column({ default: new Date() })
    @IsDate()
    public update_date: Date;

    @Column({ default: new Date() })
    @IsDate()
    public registration_date: Date;
}
