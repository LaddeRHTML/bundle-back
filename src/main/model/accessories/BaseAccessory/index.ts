import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';
import { BaseEntity } from 'model/base';
import { Column } from 'typeorm';

export abstract class BaseAccessory extends BaseEntity {
    @Column({
        name: 'name',
        type: 'text',
        nullable: false,
        unique: true
    })
    name: string;

    @Column({
        name: 'maker',
        type: 'text',
        nullable: false
    })
    @MaxLength(15)
    @MinLength(2)
    @IsNotEmpty()
    maker: string;

    @Column({
        name: 'model',
        type: 'text',
        nullable: false,
        unique: true
    })
    @MaxLength(15)
    @MinLength(2)
    @IsNotEmpty()
    model: string;
}
