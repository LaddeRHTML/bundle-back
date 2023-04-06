import { IsNotEmpty, Max, MaxLength, Min, MinLength } from 'class-validator';
import { Column, Entity, JoinColumn, OneToMany } from 'typeorm';
import { BaseAccessory } from '../BaseAccessory';
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
import { Product } from 'model/product/Product';

@Entity()
export class PCCase extends BaseAccessory {
    constructor(maker: string, model: string, color: string, form_factor: string) {
        super();
        this.name = `${maker} ${model} ${color} ${form_factor}`;
    }

    @Column({
        name: 'maker',
        type: 'enum',
        enum: PCCaseMaker
    })
    public maker: PCCaseMaker;

    @Column({
        name: 'form_factor',
        type: 'enum',
        enum: FormFactor,
        nullable: false
    })
    @IsNotEmpty()
    public form_factor: FormFactor;

    @Column({
        name: 'motherboard_compatible_form_factor',
        type: 'enum',
        enum: MotherboardCompatibleFormFactor,
        array: true,
        default: [],
        nullable: false
    })
    public motherboard_compatible_form_factor: MotherboardCompatibleFormFactor[];

    @Column({
        name: 'material',
        type: 'text',
        array: true,
        default: [],
        nullable: false
    })
    @IsNotEmpty()
    public material: string[];

    @Column({
        name: 'peculiarities',
        type: 'text',
        nullable: false
    })
    @MaxLength(300)
    @MinLength(10)
    @IsNotEmpty()
    public peculiarities: string;

    @Column({
        name: 'power_unit_location',
        type: 'enum',
        enum: PowerUnitLocation,
        default: PowerUnitLocation.Lower,
        nullable: false
    })
    @IsNotEmpty()
    public power_unit_location: PowerUnitLocation;

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

    @Column({
        name: 'count_internal_compartments_2_5',
        type: 'smallint',
        nullable: false
    })
    @Max(20)
    @Min(1)
    @IsNotEmpty()
    public count_internal_compartments_2_5: number;

    @Column({
        name: 'count_internal_compartments_3_5',
        type: 'smallint',
        nullable: false
    })
    @Max(20)
    @Min(1)
    @IsNotEmpty()
    public count_internal_compartments_3_5: number;

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

    @Column({
        name: 'count_expansion_slots',
        type: 'text',
        nullable: false
    })
    @MaxLength(35)
    @MinLength(6)
    @IsNotEmpty()
    public count_expansion_slots: string;

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

    @Column({
        name: 'max_GPU_length_mm',
        type: 'smallint',
        nullable: false
    })
    @Max(600)
    @Min(100)
    @IsNotEmpty()
    public max_GPU_length_mm: number;

    @Column({
        name: 'max_CPU_cooler_height_mm',
        type: 'smallint',
        nullable: false
    })
    @Max(300)
    @Min(50)
    @IsNotEmpty()
    public max_CPU_cooler_height_mm: number;

    @Column({
        name: 'installed_cooling',
        type: 'text',
        nullable: false
    })
    @MaxLength(255)
    @MinLength(1)
    @IsNotEmpty()
    public installed_cooling: string;

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

    @Column({
        name: 'fan_installation_support',
        type: 'text',
        nullable: false
    })
    @MaxLength(255)
    @MinLength(6)
    @IsNotEmpty()
    public fan_installation_support: string;

    @Column({
        name: 'max_lengtht_WCS_radiator_mm',
        type: 'smallint',
        nullable: false
    })
    @Max(800)
    @Min(50)
    @IsNotEmpty()
    public max_lengtht_WCS_radiator_mm: number;

    @Column({
        name: 'places_mounting_WCS_radiator',
        type: 'text',
        nullable: false
    })
    @MaxLength(255)
    @MinLength(6)
    @IsNotEmpty()
    public places_mounting_WCS_radiator: string;

    @Column({
        name: 'dust_filter',
        type: 'enum',
        enum: DustFilter,
        array: true,
        default: [],
        nullable: true
    })
    public dust_filter: DustFilter[];

    @Column({
        name: 'additional_connectors',
        type: 'enum',
        enum: AdditionalConnectors,
        array: true,
        default: [],
        nullable: false
    })
    @IsNotEmpty()
    public additional_connectors: AdditionalConnectors[];

    @Column({
        name: 'more',
        type: 'text',
        nullable: true
    })
    @MaxLength(455)
    @MinLength(6)
    public more: string;

    @Column({
        name: 'color',
        type: 'enum',
        enum: Color,
        nullable: false
    })
    @IsNotEmpty()
    public color: Color;

    @Column({
        name: 'weight_kg',
        type: 'double precision',
        nullable: false
    })
    @Max(30)
    @Min(1)
    @IsNotEmpty()
    public weight_kg: number;

    @Column({
        name: 'size_volume_cm',
        type: 'text',
        nullable: true
    })
    @MaxLength(100)
    @MinLength(6)
    public size_volume_cm: string;

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
