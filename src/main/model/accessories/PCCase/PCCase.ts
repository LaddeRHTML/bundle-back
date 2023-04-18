import { ApiProperty } from '@nestjs/swagger';

import { Column, Entity, JoinColumn, OneToMany } from 'typeorm';
import { IsNotEmpty, Max, MaxLength, Min, MinLength } from 'class-validator';
import { Product } from 'model/product/Product';
import {
    AdditionalConnectors,
    Buttons,
    Color,
    DustFilter,
    FormFactor,
    GPUInstallationType,
    HDDMount,
    Indicators,
    MotherboardCompatibleFormFactor,
    PCCaseMaker,
    PowerUnitLocation,
    SupportedFanDiameters
} from './PCCaseEnum';
import { BaseAccessory } from '../BaseAccessory';

@Entity()
export class PCCase extends BaseAccessory {
    constructor(maker: string, model: string, color: string, form_factor: string) {
        super();
        this.name = `${maker} ${model} ${color} ${form_factor}`;
    }

    @ApiProperty()
    @Column({
        name: 'maker',
        type: 'enum',
        enum: PCCaseMaker
    })
    public maker: PCCaseMaker;

    @ApiProperty({
        enum: FormFactor
    })
    @Column({
        name: 'form_factor',
        type: 'enum',
        enum: FormFactor,
        nullable: false
    })
    @IsNotEmpty()
    public form_factor: FormFactor;

    @ApiProperty()
    @Column({
        name: 'motherboard_compatible_form_factor',
        type: 'enum',
        enum: MotherboardCompatibleFormFactor,
        array: true,
        default: [],
        nullable: false
    })
    public motherboard_compatible_form_factor: MotherboardCompatibleFormFactor[];

    @ApiProperty()
    @Column({
        name: 'material',
        type: 'text',
        array: true,
        default: [],
        nullable: false
    })
    @IsNotEmpty()
    public material: string[];

    @ApiProperty({
        maximum: 300,
        minimum: 10
    })
    @Column({
        name: 'peculiarities',
        type: 'text',
        nullable: false
    })
    @MaxLength(300)
    @MinLength(10)
    @IsNotEmpty()
    public peculiarities: string;

    @ApiProperty()
    @Column({
        name: 'power_unit_location',
        type: 'enum',
        enum: PowerUnitLocation,
        default: PowerUnitLocation.Lower,
        nullable: false
    })
    @IsNotEmpty()
    public power_unit_location: PowerUnitLocation;

    @ApiProperty()
    @Column({
        name: 'hdd_mount',
        type: 'enum',
        enum: HDDMount,
        array: true,
        default: [],
        nullable: false
    })
    @IsNotEmpty()
    public hdd_mount: HDDMount[];

    @ApiProperty({
        maximum: 20,
        minimum: 1
    })
    @Column({
        name: 'count_internal_compartments_2_5',
        type: 'smallint',
        nullable: false
    })
    @Max(20)
    @Min(1)
    @IsNotEmpty()
    public count_internal_compartments_2_5: number;

    @ApiProperty({
        maximum: 20,
        minimum: 1
    })
    @Column({
        name: 'count_internal_compartments_3_5',
        type: 'smallint',
        nullable: false
    })
    @Max(20)
    @Min(1)
    @IsNotEmpty()
    public count_internal_compartments_3_5: number;

    @ApiProperty()
    @Column({
        name: 'buttons',
        type: 'enum',
        enum: Buttons,
        array: true,
        default: [],
        nullable: false
    })
    @IsNotEmpty()
    public buttons: Buttons[];

    @ApiProperty()
    @Column({
        name: 'indicators',
        type: 'enum',
        enum: Indicators,
        array: true,
        default: [],
        nullable: false
    })
    @IsNotEmpty()
    public indicators: Indicators[];

    @ApiProperty({
        maximum: 35,
        minimum: 6
    })
    @Column({
        name: 'count_expansion_slots',
        type: 'text',
        nullable: false
    })
    @MaxLength(35)
    @MinLength(6)
    @IsNotEmpty()
    public count_expansion_slots: string;

    @ApiProperty()
    @Column({
        name: 'GPU_installation_type',
        type: 'enum',
        enum: GPUInstallationType,
        array: true,
        default: [],
        nullable: false
    })
    @IsNotEmpty()
    public GPU_installation_type: GPUInstallationType[];

    @ApiProperty({
        maximum: 600,
        minimum: 100
    })
    @Column({
        name: 'max_GPU_length_mm',
        type: 'smallint',
        nullable: false
    })
    @Max(600)
    @Min(100)
    @IsNotEmpty()
    public max_GPU_length_mm: number;

    @ApiProperty({
        maximum: 300,
        minimum: 50
    })
    @Column({
        name: 'max_CPU_cooler_height_mm',
        type: 'smallint',
        nullable: false
    })
    @Max(300)
    @Min(50)
    @IsNotEmpty()
    public max_CPU_cooler_height_mm: number;

    @ApiProperty({
        maximum: 255,
        minimum: 1
    })
    @Column({
        name: 'installed_cooling',
        type: 'text',
        nullable: false
    })
    @MaxLength(255)
    @MinLength(1)
    @IsNotEmpty()
    public installed_cooling: string;

    @ApiProperty()
    @Column({
        name: 'supported_fan_diameters_mm',
        type: 'enum',
        enum: SupportedFanDiameters,
        array: true,
        default: [],
        nullable: false
    })
    @IsNotEmpty()
    public supported_fan_diameters_mm: SupportedFanDiameters[];

    @ApiProperty({
        maximum: 255,
        minimum: 6
    })
    @Column({
        name: 'fan_installation_support',
        type: 'text',
        nullable: false
    })
    @MaxLength(255)
    @MinLength(6)
    @IsNotEmpty()
    public fan_installation_support: string;

    @ApiProperty({
        maximum: 800,
        minimum: 50
    })
    @Column({
        name: 'max_lengtht_WCS_radiator_mm',
        type: 'smallint',
        nullable: false
    })
    @Max(800)
    @Min(50)
    @IsNotEmpty()
    public max_lengtht_WCS_radiator_mm: number;

    @ApiProperty({
        maximum: 255,
        minimum: 6
    })
    @Column({
        name: 'places_mounting_WCS_radiator',
        type: 'text',
        nullable: false
    })
    @MaxLength(255)
    @MinLength(6)
    @IsNotEmpty()
    public places_mounting_WCS_radiator: string;

    @ApiProperty({
        required: false
    })
    @Column({
        name: 'dust_filter',
        type: 'enum',
        enum: DustFilter,
        array: true,
        default: [],
        nullable: true
    })
    public dust_filter: DustFilter[];

    @ApiProperty({
        required: false
    })
    @Column({
        name: 'additional_connectors',
        type: 'enum',
        enum: AdditionalConnectors,
        array: true,
        default: [],
        nullable: true
    })
    @IsNotEmpty()
    public additional_connectors: AdditionalConnectors[];

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

    @ApiProperty()
    @Column({
        name: 'color',
        type: 'enum',
        enum: Color,
        nullable: false
    })
    @IsNotEmpty()
    public color: Color;

    @ApiProperty({
        maximum: 30,
        minimum: 1
    })
    @Column({
        name: 'weight_kg',
        type: 'double precision',
        nullable: false
    })
    @Max(30)
    @Min(1)
    @IsNotEmpty()
    public weight_kg: number;

    @ApiProperty({
        maximum: 100,
        minimum: 6,
        required: false
    })
    @Column({
        name: 'size_volume_cm',
        type: 'text',
        nullable: true
    })
    @MaxLength(100)
    @MinLength(6)
    public size_volume_cm: string;

    @ApiProperty({
        maximum: 2000000,
        minimum: 5000
    })
    @Column({
        name: 'price',
        type: 'numeric',
        precision: 10,
        scale: 2,
        nullable: false,
        default: 5000
    })
    @Max(2000000)
    @Min(5000)
    @IsNotEmpty()
    public price: number;

    @JoinColumn({ name: 'product' })
    @OneToMany(() => Product, (p: Product) => p.PCCase, {
        nullable: true
    })
    public products: Product[];
}
