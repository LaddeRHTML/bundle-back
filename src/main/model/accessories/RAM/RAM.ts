import { ApiProperty } from '@nestjs/swagger';

import { IsNotEmpty, Max, MaxLength, Min, MinLength } from 'class-validator';
import { Column, Entity, JoinColumn, OneToMany } from 'typeorm';

import { Product } from 'model/product/Product';
import { MemoryType, Package, RAMMaker } from './RAMEnums';
import { BaseAccessory } from '../BaseAccessory';

@Entity()
export class RAM extends BaseAccessory {
    constructor(
        memoryType: string,
        memoryGb: number,
        memoryClockMHz: number,
        firstTiming: number,
        model: string,
        maker: string,
        supplyVoltage: number,
        rpackage: Package
    ) {
        super();
        this.name = `${memoryType} DIMM ${memoryGb}GB/${memoryClockMHz}MHz/CL${firstTiming} ${model} ${maker}, ${supplyVoltage}V ${rpackage}`;
    }

    @ApiProperty({ name: 'maker', type: 'enum', enum: RAMMaker, required: true })
    @Column({ name: 'maker', type: 'enum', enum: RAMMaker, nullable: false })
    public maker: RAMMaker;

    @ApiProperty({ name: 'memoryType', type: 'enum', enum: MemoryType, required: true })
    @Column({ name: 'memory_type', type: 'enum', enum: MemoryType, nullable: false })
    public memoryType: MemoryType;

    @ApiProperty({
        name: 'memoryGb',
        type: 'smallint',
        maximum: 512,
        minimum: 1,
        required: true
    })
    @Column({
        name: 'memory_Gb',
        type: 'smallint',
        nullable: false
    })
    @Max(512)
    @Min(1)
    @IsNotEmpty()
    public memoryGb: number;

    @ApiProperty({
        name: 'memoryClockMHz',
        type: 'smallint',
        maximum: 10000,
        minimum: 1,
        required: true
    })
    @Column({
        name: 'memory_clock_MHz',
        type: 'smallint',
        nullable: false
    })
    @Max(10000)
    @Min(1)
    @IsNotEmpty()
    public memoryClockMHz: number;

    @ApiProperty({
        name: 'supplyVoltage',
        type: 'double precision',
        maximum: 10,
        minimum: 0.5,
        required: true
    })
    @Column({
        name: 'supply_voltage',
        type: 'double precision',
        nullable: false
    })
    @Max(10)
    @Min(0.5)
    @IsNotEmpty()
    public supplyVoltage: number;

    @ApiProperty({
        name: 'timings',
        type: 'smallint',
        isArray: true,
        default: [],
        maximum: 100,
        minimum: 1,
        required: true
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
        name: 'peculiarities',
        type: 'text',
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
        name: 'more',
        type: 'text',
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

    @ApiProperty({ type: 'enum', enum: Package, default: Package.BOX, required: true })
    @Column({ type: 'enum', enum: Package, default: Package.BOX, nullable: false })
    @IsNotEmpty()
    public package: Package;

    @ApiProperty({
        name: 'ramHeightMm',
        type: 'smallint',
        maximum: 150,
        minimum: 1,
        required: true
    })
    @Column({
        name: 'ram_height_mm',
        type: 'smallint',
        nullable: false
    })
    @Max(150)
    @Min(1)
    @IsNotEmpty()
    public ramHeightMm: number;

    @ApiProperty({
        name: 'countIncluded',
        type: 'smallint',
        maximum: 8,
        minimum: 1,
        default: 1,
        required: false
    })
    @Column({
        name: 'count_included',
        type: 'smallint',
        default: 1
    })
    @Max(8)
    @Min(1)
    @IsNotEmpty()
    public countIncluded: number;

    @ApiProperty({
        name: 'price',
        type: 'numeric',
        maximum: 1000000,
        minimum: 10000,
        default: 6000,
        required: true
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
    @OneToMany(() => Product, (p: Product) => p.ram, {
        nullable: true
    })
    public products: Product[];
}
