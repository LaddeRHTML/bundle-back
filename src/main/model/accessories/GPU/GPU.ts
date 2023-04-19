import { ApiProperty } from '@nestjs/swagger';

import { IsNotEmpty, Max, MaxLength, Min, MinLength } from 'class-validator';
import { Column, Entity, JoinColumn, OneToMany } from 'typeorm';

import { Product } from 'model/product/Product';
import { BaseAccessory } from '../BaseAccessory';
import {
    Connectors,
    Cooling,
    GPUMaker,
    GPUManufacturer,
    GraphicsCardSeries,
    GraphicsRam,
    GraphicsRamSize,
    Package,
    PowerConnectors,
    SupportedMulti_GPU,
    Technologies
} from './GPUEnums';

@Entity()
export class GPU extends BaseAccessory {
    constructor(maker: string, model: string, graphics_ram_size_Gb: number) {
        super();
        this.name = `${maker} ${model} ${graphics_ram_size_Gb}`;
    }

    @ApiProperty()
    @Column({ name: 'maker', type: 'enum', enum: GPUMaker })
    public maker: GPUMaker;

    @ApiProperty()
    @Column({
        name: 'graphics_card_series',
        type: 'enum',
        enum: GraphicsCardSeries,
        nullable: false
    })
    public graphics_card_series: GraphicsCardSeries;

    @ApiProperty()
    @Column({
        name: 'GPU_manufacturer',
        type: 'enum',
        enum: GPUManufacturer,
        nullable: false
    })
    public GPU_manufacturer: GPUManufacturer;

    @ApiProperty({
        maximum: 30,
        minimum: 1
    })
    @Column({
        name: 'chipset_model',
        type: 'text',
        nullable: false
    })
    @MaxLength(30)
    @MinLength(1)
    @IsNotEmpty()
    public chipset_model: string;

    @ApiProperty({
        maximum: 5000,
        minimum: 1000,
        required: false
    })
    @Column({
        name: 'frequency_OC_Mode_MHz',
        type: 'smallint',
        nullable: true
    })
    @Max(5000)
    @Min(1000)
    public frequency_OC_Mode_MHz: number;

    @ApiProperty({
        maximum: 5000,
        minimum: 1000,
        required: false
    })
    @Column({
        name: 'frequency_Gaming_Mode_MHz',
        type: 'smallint',
        nullable: true
    })
    @Max(5000)
    @Min(1000)
    public frequency_Gaming_Mode_MHz: number;

    @ApiProperty({
        maximum: 30000,
        minimum: 100,
        required: false
    })
    @Column({
        name: 'memory_clock_speed',
        type: 'smallint',
        nullable: true
    })
    @Max(30000)
    @Min(100)
    public memory_clock_speed: number;

    @ApiProperty()
    @Column({
        name: 'graphics_ram',
        type: 'enum',
        enum: GraphicsRam,
        nullable: false
    })
    public graphics_ram: GraphicsRam;

    @ApiProperty()
    @Column({
        name: 'graphics_ram_size_Gb',
        type: 'enum',
        enum: GraphicsRamSize,
        nullable: false
    })
    public graphics_ram_size_Gb: GraphicsRamSize;

    @ApiProperty({
        maximum: 512,
        minimum: 1,
        required: false
    })
    @Column({
        name: 'memory_bus_width_bit',
        type: 'smallint',
        nullable: true
    })
    @Max(512)
    @Min(1)
    public memory_bus_width_bit: number;

    @ApiProperty({
        maximum: 2000,
        minimum: 100
    })
    @Column({
        name: 'memory_bandwidth_Gb',
        type: 'smallint',
        nullable: false
    })
    @Max(2000)
    @Min(100)
    @IsNotEmpty()
    public memory_bandwidth_Gb: number;

    @ApiProperty({
        maximum: 25000,
        minimum: 100
    })
    @Column({
        name: 'count_universal_processors',
        type: 'smallint',
        nullable: false
    })
    @Max(25000)
    @Min(100)
    @IsNotEmpty()
    public count_universal_processors: number;

    @ApiProperty()
    @Column({
        name: 'technologies',
        type: 'enum',
        array: true,
        default: [],
        enum: Technologies,
        nullable: false
    })
    public technologies: Technologies[];

    @ApiProperty({
        maximum: 255,
        minimum: 10
    })
    @Column({
        name: 'supported_APIs',
        type: 'text',
        nullable: false
    })
    @MaxLength(255)
    @MinLength(10)
    @IsNotEmpty()
    public supported_APIs: string;

    @ApiProperty({
        required: false
    })
    @Column({
        name: 'supported_Multi_GPU',
        type: 'enum',
        enum: SupportedMulti_GPU,
        nullable: true
    })
    public supported_Multi_GPU: SupportedMulti_GPU;

    @ApiProperty({
        maximum: 30,
        minimum: 1
    })
    @Column({
        name: 'connection_interface',
        type: 'text',
        nullable: false
    })
    @MaxLength(30)
    @MinLength(1)
    @IsNotEmpty()
    public connection_interface: string;

    @ApiProperty({
        maximum: 8,
        minimum: 1
    })
    @Column({
        name: 'count_supported_monitors',
        type: 'smallint',
        nullable: false
    })
    @Max(8)
    @Min(1)
    @IsNotEmpty()
    public count_supported_monitors: number;

    @ApiProperty()
    @Column({
        name: 'connectors',
        type: 'enum',
        array: true,
        default: [],
        enum: Connectors,
        nullable: false
    })
    public connectors: Connectors[];

    @ApiProperty({
        maximum: 100,
        minimum: 1
    })
    @Column({
        name: 'maximum_resolution',
        type: 'text',
        nullable: false
    })
    @MaxLength(100)
    @MinLength(1)
    @IsNotEmpty()
    public maximum_resolution: string;

    @ApiProperty()
    @Column({
        name: 'cooling',
        type: 'enum',
        array: true,
        default: [],
        enum: Cooling,
        nullable: false
    })
    public cooling: Cooling[];

    @ApiProperty()
    @Column({
        name: 'power_connectors',
        type: 'enum',
        enum: PowerConnectors,
        nullable: false
    })
    public power_connectors: PowerConnectors;

    @ApiProperty()
    @Column({
        name: 'backlight',
        type: 'boolean',
        nullable: false
    })
    @IsNotEmpty()
    public backlight: boolean;

    @ApiProperty({
        maximum: 2000,
        minimum: 200
    })
    @Column({
        name: 'minimum_power_supply_capacity_wt',
        type: 'smallint',
        nullable: false
    })
    @Max(2000)
    @Min(200)
    @IsNotEmpty()
    public minimum_power_supply_capacity_wt: number;

    @ApiProperty({
        maximum: 8,
        minimum: 1
    })
    @Column({
        name: 'count_occupied_expansion_slots',
        type: 'double precision',
        nullable: false
    })
    @Max(8)
    @Min(1)
    @IsNotEmpty()
    public count_occupied_expansion_slots: number;

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
        maximum: 50,
        minimum: 0,
        required: false
    })
    @Column({
        name: 'power_unit_length_mm',
        type: 'double precision',
        nullable: true
    })
    @Max(50)
    @Min(0)
    public GPU_length_cm: number;

    @ApiProperty()
    @Column({
        name: 'packege',
        type: 'enum',
        enum: Package,
        default: Package.RTL
    })
    @IsNotEmpty()
    public package: Package;

    @ApiProperty({
        maximum: 2000000,
        minimum: 60000
    })
    @Column({
        name: 'price',
        type: 'numeric',
        precision: 10,
        scale: 2,
        nullable: false,
        default: 60000
    })
    @Max(2000000)
    @Min(60000)
    @IsNotEmpty()
    public price: number;

    @JoinColumn({ name: 'product' })
    @OneToMany(() => Product, (p: Product) => p.gpu, {
        nullable: true
    })
    public products: Product[];
}
