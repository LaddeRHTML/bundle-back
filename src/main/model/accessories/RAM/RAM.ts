import { ApiProperty } from '@nestjs/swagger';

import { IsNotEmpty, Max, MaxLength, Min, MinLength } from 'class-validator';
import { Column, Entity, JoinColumn, OneToMany } from 'typeorm';

import { Product } from 'model/product/Product';
import { MemoryType, Package, RAMMaker } from './RAMEnums';
import { BaseAccessory } from '../BaseAccessory';

@Entity()
export class RAM extends BaseAccessory {
    constructor(maker: string, model: string, memory_type: string, memory_Gb: number) {
        super();
        this.name = `${maker} ${model} ${memory_type} ${memory_Gb}`;
    }

    @ApiProperty()
    @Column({ name: 'maker', type: 'enum', enum: RAMMaker })
    public maker: RAMMaker;

    @ApiProperty()
    @Column({ name: 'memory_type', type: 'enum', enum: MemoryType })
    public memory_type: MemoryType;

    @ApiProperty({
        maximum: 512,
        minimum: 1
    })
    @Column({
        name: 'memory_Gb',
        type: 'smallint',
        nullable: false
    })
    @Max(512)
    @Min(1)
    @IsNotEmpty()
    public memory_Gb: number;

    @ApiProperty({
        maximum: 10000,
        minimum: 1
    })
    @Column({
        name: 'memory_clock_MHz',
        type: 'smallint',
        nullable: false
    })
    @Max(10000)
    @Min(1)
    @IsNotEmpty()
    public memory_clock_MHz: number;

    @ApiProperty({
        maximum: 10,
        minimum: 0.5
    })
    @Column({
        name: 'supply_voltage',
        type: 'double precision',
        nullable: false
    })
    @Max(10)
    @Min(0.5)
    @IsNotEmpty()
    public supply_voltage: number;

    @ApiProperty({
        maximum: 100,
        minimum: 1
    })
    @Column({
        name: 'timings',
        type: 'smallint',
        array: true,
        default: [],
        nullable: false
    })
    @Max(100)
    @Min(1)
    @IsNotEmpty()
    public timings: number[];

    @ApiProperty({
        required: false
    })
    @Column({
        name: 'peculiarities',
        type: 'text',
        nullable: true
    })
    @IsNotEmpty()
    public peculiarities: string;

    @ApiProperty({
        maxLength: 455,
        minLength: 6,
        required: false
    })
    @Column({
        name: 'more',
        type: 'text',
        nullable: true
    })
    @MaxLength(455)
    @MinLength(6)
    public more: string;

    @ApiProperty()
    @Column({ type: 'enum', enum: Package, default: Package.BOX })
    @IsNotEmpty()
    public package: Package;

    @ApiProperty({
        maximum: 15,
        minimum: 1
    })
    @Column({
        name: 'ram_height_cm',
        type: 'double precision',
        nullable: false
    })
    @Max(15)
    @Min(1)
    @IsNotEmpty()
    public ram_height_cm: number;

    @ApiProperty({
        maximum: 8,
        minimum: 1,
        default: 1,
        required: false
    })
    @Column({
        name: 'count_included',
        type: 'smallint',
        precision: 10,
        default: 1
    })
    @Max(8)
    @Min(1)
    @IsNotEmpty()
    public count_included: number;

    @ApiProperty({
        maximum: 1000000,
        minimum: 10000,
        default: 6000
    })
    @Column({
        name: 'price',
        type: 'numeric',
        precision: 10,
        scale: 2,
        nullable: false,
        default: 6000
    })
    @Max(1000000)
    @Min(10000)
    @IsNotEmpty()
    public price: number;

    @JoinColumn({ name: 'product' })
    @OneToMany(() => Product, (p: Product) => p.RAM, {
        nullable: true
    })
    public products: Product[];
}
