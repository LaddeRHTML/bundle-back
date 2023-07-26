import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';
import { BaseEntity } from 'model/base';
import { Column } from 'typeorm';

export abstract class BaseAccessory extends BaseEntity {
    @ApiProperty({
        type: 'text'
    })
    @Column({
        name: 'name',
        type: 'text',
        nullable: false,
        unique: true
    })
    @IsNotEmpty()
    public name: string;

    @ApiProperty({
        maximum: 15,
        minimum: 2,
        type: 'text'
    })
    @Column({
        name: 'maker',
        type: 'text',
        nullable: false
    })
    @MaxLength(15)
    @MinLength(2)
    @IsNotEmpty()
    public maker: string;

    @ApiProperty({
        maximum: 35,
        minimum: 2,
        type: 'text'
    })
    @Column({
        name: 'model',
        type: 'text',
        nullable: false
    })
    @MaxLength(35)
    @MinLength(2)
    @IsNotEmpty()
    public model: string;
}
