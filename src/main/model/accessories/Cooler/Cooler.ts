import { IsNotEmpty, Max, MaxLength, Min, MinLength } from 'class-validator';
import { Entity, Column, JoinColumn, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

import { Product } from 'model/product/Product';
import { BaseAccessory } from '../BaseAccessory';
import { CoolerMaker, CoolerType, Package } from './CoolerEnums';
import { CPUSocket } from '../CPU/CPUEnums';

@Entity()
export class Cooler extends BaseAccessory {
    constructor(type: CoolerType, maker: string, model: string) {
        super();
        this.name = `${type} ${maker} ${model}`;
    }

    @ApiProperty()
    @Column({ type: 'enum', enum: CoolerMaker })
    public maker: CoolerMaker;

    @ApiProperty()
    @Column({
        name: 'socket',
        type: 'enum',
        enum: CPUSocket,
        array: true,
        default: [],
        nullable: false
    })
    @IsNotEmpty()
    public socket: CPUSocket[];

    @ApiProperty({
        name: 'type',
        type: 'enum',
        enum: CoolerType
    })
    @Column({ name: 'type', type: 'enum', enum: CoolerType })
    public type: CoolerType;

    @ApiProperty({
        maximum: 500,
        minimum: 1,
        required: false
    })
    @Column({
        name: 'max_TDP',
        type: 'smallint',
        nullable: true
    })
    @Max(500)
    @Min(1)
    public maxTDP: number;

    @ApiProperty({})
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
        maximum: 250,
        minimum: 1
    })
    @Column({
        name: 'fan_diameter_mm',
        type: 'smallint',
        nullable: false
    })
    @Max(250)
    @Min(1)
    @IsNotEmpty()
    public fanDiameterMm: number;

    @ApiProperty({
        maximum: 1000,
        minimum: 100
    })
    @Column({
        name: 'min_rotation_speed',
        type: 'smallint',
        nullable: false
    })
    @Max(1000)
    @Min(100)
    @IsNotEmpty()
    public minRotationSpeed: number;

    @ApiProperty({
        maximum: 6000,
        minimum: 100
    })
    @Column({
        name: 'max_rotation_speed',
        type: 'smallint',
        nullable: false
    })
    @Max(6000)
    @Min(100)
    @IsNotEmpty()
    public maxRotationSpeed: number;

    @ApiProperty({
        name: 'possibility_speed_regulation',
        type: 'boolean',
        required: true
    })
    @Column({
        name: 'possibility_speed_regulation',
        type: 'boolean',
        nullable: false
    })
    @IsNotEmpty()
    public possibilitySpeedRegulation: boolean;

    @ApiProperty({
        maximum: 250,
        minimum: 1,
        required: false
    })
    @Column({
        name: 'cooler_height_mm',
        type: 'smallint',
        nullable: true
    })
    @Max(250)
    @Min(1)
    public coolerHeightMm: number;

    @ApiProperty({
        maximum: 100,
        minimum: 1
    })
    @Column({
        name: 'min_noise_leve_dB',
        type: 'smallint',
        nullable: true
    })
    @Max(100)
    @Min(1)
    @IsNotEmpty()
    public minNoiseLeveDb: number;

    @ApiProperty({
        maximum: 200,
        minimum: 1
    })
    @Column({
        name: 'max_noise_leve_dB',
        type: 'smallint',
        nullable: false
    })
    @Max(200)
    @Min(1)
    @IsNotEmpty()
    public maxNoiseLeveDb: number;

    @ApiProperty({
        maximum: 255,
        minimum: 6
    })
    @Column({
        name: 'connector',
        type: 'text',
        nullable: false
    })
    @MaxLength(255)
    @MinLength(6)
    @IsNotEmpty()
    public connector: string;

    @ApiProperty({
        maximum: 150,
        minimum: 1
    })
    @Column({
        name: 'air_flow_CFM',
        type: 'double precision',
        nullable: false
    })
    @Max(150)
    @Min(1)
    @IsNotEmpty()
    public airFlowCFM: number;

    @ApiProperty({
        maximum: 400000,
        minimum: 1
    })
    @Column({
        name: 'MTBF_hours',
        type: 'int',
        nullable: false
    })
    @Max(400000)
    @Min(1)
    @IsNotEmpty()
    public MTBFHours: number;

    @ApiProperty({
        maximum: 255,
        minimum: 6
    })
    @Column({
        name: 'supply_voltage',
        type: 'text',
        nullable: false
    })
    @MaxLength(255)
    @MinLength(6)
    @IsNotEmpty()
    public supplyVoltage: string;

    @ApiProperty()
    @Column({
        name: 'backlight',
        type: 'boolean',
        nullable: false
    })
    @IsNotEmpty()
    public backlight: boolean;

    @ApiProperty({
        maximum: 100,
        minimum: 6,
        required: false
    })
    @Column({
        name: 'backlight_color',
        type: 'text',
        nullable: true
    })
    @MaxLength(100)
    @MinLength(6)
    public backlightColor: string;

    @ApiProperty({
        maximum: 500,
        minimum: 1,
        required: false
    })
    @Column({
        name: 'length_tubes_mm',
        type: 'smallint',
        nullable: true
    })
    @Max(500)
    @Min(1)
    public lengthTubesMm: number;

    @ApiProperty({
        maximum: 500,
        minimum: 1,
        required: false
    })
    @Column({
        name: 'radiator_size_mm',
        type: 'smallint',
        nullable: true
    })
    @Max(500)
    @Min(1)
    public radiatorSizeMm: number;

    @ApiProperty({
        required: false
    })
    @Column({
        name: 'bearing_type',
        type: 'text',
        nullable: true
    })
    @IsNotEmpty()
    public bearingType: string;

    @ApiProperty({
        maximum: 12,
        minimum: 1,
        required: false
    })
    @Column({
        name: 'number_heat_pipes',
        type: 'smallint',
        nullable: true
    })
    @Max(12)
    @Min(1)
    public numberHeatPipes: number;

    @ApiProperty({
        maximum: 12,
        minimum: 0,
        required: false,
        nullable: true
    })
    @Column({
        name: 'power_consumption_wt',
        type: 'double precision',
        nullable: true
    })
    @Max(12)
    @Min(0)
    public powerConsumptionWt: number;

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
        maximum: 300,
        minimum: 0,
        required: false
    })
    @Column({
        name: 'pump_size_mm',
        type: 'smallint',
        nullable: true
    })
    @Max(300)
    @Min(0)
    public pumpSizeMm: number;

    @ApiProperty({
        maximum: 6,
        minimum: 0
    })
    @Column({
        name: 'weight_kg',
        type: 'double precision',
        nullable: false
    })
    @Max(6)
    @Min(0)
    @IsNotEmpty()
    public weightKg: number;

    @ApiProperty({
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
    public sizeVolumeMm: string;

    @ApiProperty()
    @Column({
        name: 'package',
        type: 'enum',
        enum: Package,
        default: Package.RTL
    })
    @IsNotEmpty()
    public package: Package;

    @ApiProperty({
        maximum: 500000,
        minimum: 1000
    })
    @Column({
        name: 'price',
        type: 'numeric',
        precision: 10,
        scale: 2,
        nullable: true
    })
    @Max(500000)
    @Min(1000)
    @IsNotEmpty()
    public price: number;

    @JoinColumn({ name: 'product' })
    @OneToMany(() => Product, (p: Product) => p.cooler, {
        nullable: true
    })
    public products: Product[];
}
