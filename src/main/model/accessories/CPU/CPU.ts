import { IsNotEmpty, Max, MaxLength, Min, MinLength } from 'class-validator';
import { Column, Entity, JoinColumn, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

import { Product } from 'model/product/Product';
import { CPUMaker, CPUSocket, Package } from './CPUEnums';
import { BaseAccessory } from '../BaseAccessory';

interface Ram {
    name: 'ddr4' | 'ddr5';
    max_mghz: number;
}

@Entity()
export class CPU extends BaseAccessory {
    constructor(maker: string, type: string, model: string, socket: CPUSocket) {
        super();
        this.name = `${maker} ${type} ${model} ${socket}`;
    }

    @ApiProperty()
    @Column({ name: 'maker', type: 'enum', enum: CPUMaker })
    public maker: CPUMaker;

    @ApiProperty({
        maxLength: 10,
        minLength: 1
    })
    @Column({
        name: 'type',
        type: 'text',
        nullable: false
    })
    @MaxLength(10)
    @MinLength(1)
    @IsNotEmpty()
    public type: string;

    @ApiProperty({})
    @Column({
        name: 'socket',
        enum: CPUSocket,
        type: 'enum',
        nullable: false
    })
    @IsNotEmpty()
    public socket: CPUSocket;

    @ApiProperty({
        maximum: 256,
        minimum: 2
    })
    @Column({
        name: 'core_count',
        type: 'smallint',
        nullable: false
    })
    @Max(256)
    @Min(2)
    @IsNotEmpty()
    public core_count: number;

    @ApiProperty({
        maximum: 100000,
        minimum: 1
    })
    @Column({
        name: 'thread_count',
        type: 'smallint',
        nullable: false
    })
    @Max(100000)
    @Min(1)
    @IsNotEmpty()
    public thread_count: number;

    @ApiProperty({
        maximum: 7,
        minimum: 1.8
    })
    @Column({
        name: 'clock_frequency_max_ghz',
        type: 'double precision',
        nullable: true
    })
    @Max(7)
    @Min(1.8)
    @IsNotEmpty()
    public clock_frequency_max_ghz: number;

    @ApiProperty({
        maximum: 7,
        minimum: 1.8
    })
    @Column({
        name: 'clock_frequency_min_ghz',
        type: 'double precision',
        nullable: true
    })
    @Max(7)
    @Min(1.8)
    @IsNotEmpty()
    public clock_frequency_min_ghz: number;

    @ApiProperty()
    @Column({
        name: 'microarchitecture',
        type: 'text',
        nullable: false
    })
    @IsNotEmpty()
    public microarchitecture: string;

    @ApiProperty()
    @Column({
        name: 'cache_size_l2',
        type: 'double precision',
        nullable: false
    })
    @Max(30)
    @Min(0.5)
    @IsNotEmpty()
    public cache_size_l2: number;

    @ApiProperty()
    @Column({
        name: 'cache_size_l3',
        type: 'double precision',
        nullable: false
    })
    @Max(30)
    @Min(0.5)
    @IsNotEmpty()
    public cache_size_l3: number;

    @ApiProperty()
    @Column({
        name: 'support_ram',
        type: 'jsonb',
        default: () => "'[]'"
    })
    @IsNotEmpty()
    public support_ram: Ram[];

    @ApiProperty({
        maximum: 256,
        minimum: 1
    })
    @Column({
        name: 'max_ram_gb',
        type: 'smallint',
        nullable: false
    })
    @Max(256)
    @Min(1)
    @IsNotEmpty()
    public max_ram_gb: number;

    @ApiProperty()
    @Column({
        name: 'support_ess',
        type: 'boolean',
        nullable: false
    })
    @IsNotEmpty()
    public support_ess: boolean;

    @ApiProperty({
        maximum: 40,
        minimum: 4
    })
    @Column({
        name: 'integrated_graphics_system',
        type: 'text',
        nullable: true
    })
    @MaxLength(40)
    @MinLength(4)
    @IsNotEmpty()
    public integrated_graphics_system: string;

    @ApiProperty({
        maximum: 256,
        minimum: 1
    })
    @Column({
        name: 'techproc_nm',
        type: 'smallint',
        nullable: false
    })
    @Max(256)
    @Min(1)
    @IsNotEmpty()
    public techproccess_nm: number;

    @ApiProperty({
        maximum: 1000,
        minimum: 1,
        required: false
    })
    @Column({
        name: 'TDP',
        type: 'smallint',
        nullable: true
    })
    @Max(1000)
    @Min(1)
    public TDP_wt: number;

    @ApiProperty({
        maximum: 1000,
        minimum: 1,
        required: false
    })
    @Column({
        name: 'max_TDP_wt',
        type: 'smallint',
        nullable: true
    })
    @Max(1000)
    @Min(1)
    public max_TDP_wt: number;

    @ApiProperty({
        required: false
    })
    @Column({
        name: 'instruction_set',
        type: 'text',
        array: true,
        default: [],
        nullable: true
    })
    public instruction_set: string[];

    @ApiProperty()
    @Column({
        name: 'support_hyper_threading',
        type: 'boolean',
        nullable: false
    })
    @IsNotEmpty()
    public support_hyper_threading: boolean;

    @ApiProperty()
    @Column({
        name: 'support_64_b',
        type: 'boolean',
        nullable: false
    })
    @IsNotEmpty()
    public support_64_b: boolean;

    @ApiProperty()
    @Column({
        type: 'enum',
        enum: Package,
        default: Package.OEM,
        nullable: false
    })
    @IsNotEmpty()
    public package: Package;

    @ApiProperty()
    @Column({
        name: 'critical_temperature_c',
        type: 'smallint',
        nullable: false
    })
    @IsNotEmpty()
    public critical_temperature_c: number;

    @ApiProperty({
        maximum: 455,
        minimum: 6,
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

    @ApiProperty({
        maximum: 1000000,
        minimum: 6000
    })
    @Column({
        name: 'price',
        type: 'numeric',
        precision: 10,
        scale: 2,
        nullable: true
    })
    @Max(1000000)
    @Min(6000)
    @IsNotEmpty()
    public price: number;

    @JoinColumn({ name: 'product' })
    @OneToMany(() => Product, (p: Product) => p.cpu, {
        nullable: true
    })
    public products: Product[];
}
