import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';
import { BaseEntity } from 'model/base';
import { Column } from 'typeorm';

export abstract class BaseAccessory extends BaseEntity {
    @ApiProperty()
    @Column({
        name: 'name',
        type: 'text',
        nullable: false,
        unique: true
    })
    public name: string;

    @Column({
        name: 'maker',
        type: 'text',
        nullable: false
    })
    @MaxLength(15)
    @MinLength(2)
    @IsNotEmpty()
    public maker: string;

    @Column({
        name: 'model',
        type: 'text',
        nullable: false,
        unique: true
    })
    @MaxLength(35)
    @MinLength(2)
    @IsNotEmpty()
    public model: string;
}
