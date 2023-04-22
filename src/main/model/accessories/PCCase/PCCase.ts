import { ApiProperty } from '@nestjs/swagger';

import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany } from 'typeorm';
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
    PowerUnitLocation
} from './PCCaseEnum';
import { BaseAccessory } from '../BaseAccessory';
import { Fan } from '../Fan/Fan';
import { FanDiameter } from '../Fan/FanEnums';

@Entity()
export class PCCase extends BaseAccessory {
    constructor(maker: string, model: string, color: string, formFactor: string) {
        super();
        this.name = `Case ${maker} ${model}, ${color}, ${formFactor}`;
    }

    @ApiProperty({
        name: 'maker',
        type: 'enum',
        enum: PCCaseMaker,
        required: true
    })
    @Column({
        name: 'maker',
        type: 'enum',
        enum: PCCaseMaker,
        nullable: false
    })
    public maker: PCCaseMaker;

    @ApiProperty({
        name: 'formFactor',
        type: 'enum',
        enum: FormFactor,
        required: true
    })
    @Column({
        name: 'form_factor',
        type: 'enum',
        enum: FormFactor,
        nullable: false
    })
    @IsNotEmpty()
    public formFactor: FormFactor;

    @ApiProperty({
        name: 'motherboardCompatibleFormFactor',
        type: 'enum',
        enum: MotherboardCompatibleFormFactor,
        isArray: true,
        default: [],
        required: true
    })
    @Column({
        name: 'motherboard_compatible_form_factor',
        type: 'enum',
        enum: MotherboardCompatibleFormFactor,
        array: true,
        default: [],
        nullable: false
    })
    public motherboardCompatibleFormFactor: MotherboardCompatibleFormFactor[];

    @ApiProperty({
        name: 'material',
        type: 'text',
        isArray: true,
        default: [],
        required: true
    })
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
        name: 'peculiarities',
        type: 'text',
        maximum: 300,
        minimum: 10,
        required: false
    })
    @Column({
        name: 'peculiarities',
        type: 'text',
        nullable: true
    })
    @MaxLength(300)
    @MinLength(10)
    @IsNotEmpty()
    public peculiarities: string;

    @ApiProperty({
        name: 'powerUnitLocation',
        type: 'enum',
        enum: PowerUnitLocation,
        default: PowerUnitLocation.Lower
    })
    @Column({
        name: 'power_unit_location',
        type: 'enum',
        enum: PowerUnitLocation,
        default: PowerUnitLocation.Lower,
        nullable: false
    })
    @IsNotEmpty()
    public powerUnitLocation: PowerUnitLocation;

    @ApiProperty({
        name: 'hddMount',
        type: 'enum',
        enum: HDDMount,
        isArray: true,
        default: [],
        required: false
    })
    @Column({
        name: 'hdd_mount',
        type: 'enum',
        enum: HDDMount,
        array: true,
        default: [],
        nullable: true
    })
    @IsNotEmpty()
    public hddMount: HDDMount[];

    @ApiProperty({
        name: 'countInternalCompartments25',
        type: 'smallint',
        maximum: 20,
        minimum: 1,
        required: true
    })
    @Column({
        name: 'count_internal_compartments_2_5',
        type: 'smallint',
        nullable: false
    })
    @Max(20)
    @Min(1)
    @IsNotEmpty()
    public countInternalCompartments25: number;

    @ApiProperty({
        name: 'countInternalCompartments35',
        type: 'smallint',
        maximum: 20,
        minimum: 1,
        required: true
    })
    @Column({
        name: 'count_internal_compartments_3_5',
        type: 'smallint',
        nullable: false
    })
    @Max(20)
    @Min(1)
    @IsNotEmpty()
    public countInternalCompartments35: number;

    @ApiProperty({
        name: 'buttons',
        type: 'enum',
        enum: Buttons,
        isArray: true,
        default: [],
        required: false
    })
    @Column({
        name: 'buttons',
        type: 'enum',
        enum: Buttons,
        array: true,
        default: [],
        nullable: true
    })
    @IsNotEmpty()
    public buttons: Buttons[];

    @ApiProperty({
        name: 'indicators',
        type: 'enum',
        enum: Indicators,
        isArray: true,
        default: [],
        required: false
    })
    @Column({
        name: 'indicators',
        type: 'enum',
        enum: Indicators,
        array: true,
        default: [],
        nullable: true
    })
    @IsNotEmpty()
    public indicators: Indicators[];

    @ApiProperty({
        name: 'countExpansionSlots',
        type: 'text',
        maximum: 35,
        minimum: 6,
        required: false
    })
    @Column({
        name: 'count_expansion_slots',
        type: 'text',
        nullable: true
    })
    @MaxLength(35)
    @MinLength(6)
    @IsNotEmpty()
    public countExpansionSlots: string;

    @ApiProperty({
        name: 'GPUInstallationType',
        type: 'enum',
        enum: GPUInstallationType,
        isArray: true,
        default: [],
        required: false
    })
    @Column({
        name: 'GPU_installation_type',
        type: 'enum',
        enum: GPUInstallationType,
        array: true,
        default: [],
        nullable: true
    })
    @IsNotEmpty()
    public GPUInstallationType: GPUInstallationType[];

    @ApiProperty({
        name: 'maxGPULengthMm',
        type: 'smallint',
        maximum: 600,
        minimum: 100,
        required: true
    })
    @Column({
        name: 'max_GPU_length_mm',
        type: 'smallint',
        nullable: false
    })
    @Max(600)
    @Min(100)
    @IsNotEmpty()
    public maxGPULength: number;

    @ApiProperty({
        name: 'maxCPUCoolerHeightMm',
        type: 'smallint',
        maximum: 300,
        minimum: 50,
        required: true
    })
    @Column({
        name: 'max_CPU_cooler_height_mm',
        type: 'smallint',
        nullable: false
    })
    @Max(300)
    @Min(50)
    @IsNotEmpty()
    public maxCPUCoolerHeight: number;

    @ApiProperty({
        name: 'installedCooling',
        type: 'text',
        maximum: 255,
        minimum: 1,
        required: false
    })
    @Column({
        name: 'installed_cooling',
        type: 'text',
        nullable: true
    })
    @MaxLength(255)
    @MinLength(1)
    @IsNotEmpty()
    public installedCooling: string;

    @ApiProperty({
        name: 'supportedFanDiametersMm',
        type: 'enum',
        enum: SupportedFanDiameters,
        isArray: true,
        default: [],
        required: true
    })
    @Column({
        name: 'supported_fan_diameters_mm',
        type: 'enum',
        enum: FanDiameter,
        array: true,
        default: [],
        nullable: false
    })
    @IsNotEmpty()
    public supportedFanDiameters: FanDiameter[];

    @ApiProperty({
        name: 'fanInstallationSupport',
        type: 'text',
        maximum: 255,
        minimum: 6,
        required: false
    })
    @Column({
        name: 'fan_installation_support',
        type: 'text',
        nullable: true
    })
    @MaxLength(255)
    @MinLength(6)
    @IsNotEmpty()
    public fanInstallationSupport: string;

    @ApiProperty({
        name: 'maxLengthWCSRadiatorMm',
        type: 'smallint',
        maximum: 800,
        minimum: 50,
        required: false
    })
    @Column({
        name: 'max_length_WCS_radiator_mm',
        type: 'smallint',
        nullable: true
    })
    @Max(800)
    @Min(50)
    @IsNotEmpty()
    public maxLengthWCSRadiator: number;

    @ApiProperty({
        name: 'placesMountingWCSRadiator',
        type: 'text',
        maximum: 255,
        minimum: 6,
        required: false
    })
    @Column({
        name: 'places_mounting_WCS_radiator',
        type: 'text',
        nullable: true
    })
    @MaxLength(255)
    @MinLength(6)
    @IsNotEmpty()
    public placesMountingWCSRadiator: string;

    @ApiProperty({
        name: 'dustFilter',
        type: 'enum',
        enum: DustFilter,
        isArray: true,
        default: [],
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
    public dustFilter: DustFilter[];

    @ApiProperty({
        name: 'additionalConnectors',
        type: 'enum',
        enum: AdditionalConnectors,
        isArray: true,
        default: [],
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
    public additionalConnectors: AdditionalConnectors[];

    @ApiProperty({
        name: 'more',
        type: 'text',
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
        name: 'color',
        type: 'enum',
        enum: Color,
        required: true
    })
    @Column({
        name: 'color',
        type: 'enum',
        enum: Color,
        nullable: false
    })
    @IsNotEmpty()
    public color: Color;

    @ApiProperty({
        name: 'weightKg',
        type: 'double precision',
        maximum: 30,
        minimum: 1,
        required: true
    })
    @Column({
        name: 'weight_kg',
        type: 'double precision',
        nullable: false
    })
    @Max(30)
    @Min(1)
    @IsNotEmpty()
    public weight: number;

    @ApiProperty({
        name: 'sizeVolumeMm',
        type: 'text',
        maximum: 100,
        minimum: 6,
        required: false
    })
    @Column({
        name: 'size_volume_mm',
        type: 'text',
        nullable: true
    })
    @MaxLength(100)
    @MinLength(6)
    public sizeVolume: string;

    @ApiProperty({ name: 'fans', type: () => Fan, nullable: false })
    @ManyToMany(() => Fan, (f: Fan) => f.cases, {
        eager: true,
        cascade: true,
        nullable: false
    })
    @JoinTable({
        name: 'fans_in_pc_case',
        joinColumn: {
            name: 'pc_case_id',
            referencedColumnName: 'id'
        },
        inverseJoinColumn: {
            name: 'fan_id',
            referencedColumnName: 'id'
        }
    })
    public fans: Fan[];

    @JoinColumn({ name: 'product' })
    @OneToMany(() => Product, (p: Product) => p.pccase, {
        nullable: true
    })
    public products: Product[];

    @ApiProperty({
        name: 'price',
        type: 'numeric',
        maximum: 2000000,
        minimum: 5000,
        required: false
    })
    @Column({
        name: 'price',
        type: 'numeric',
        precision: 10,
        scale: 2,
        nullable: true,
        default: 5000
    })
    @Max(2000000)
    @Min(5000)
    @IsNotEmpty()
    public price: number;
}
