import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Max, MaxLength, Min, MinLength } from 'class-validator';
import { Column, Entity, JoinColumn, OneToMany } from 'typeorm';

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
    @ApiProperty({
        name: 'maker',
        type: 'enum',
        enum: CoolerMaker,
        required: true,
        nullable: false
    })
    @Column({
        name: 'maker',
        type: 'enum',
        enum: CoolerMaker,
        nullable: false
    })
    public maker: CoolerMaker;

    @ApiProperty({
        name: 'socket',
        type: 'enum',
        enum: CPUSocket,
        isArray: true,
        default: [],
        required: true
    })
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
        name: 'maxTDP',
        type: 'smallint',
        maximum: 500,
        minimum: 1,
        required: false,
        nullable: true
    })
    @Column({
        name: 'max_TDP',
        type: 'smallint',
        nullable: true
    })
    @Max(500)
    @Min(1)
    public maxTDP: number;

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
        name: 'fanDiameterMm',
        type: 'smallint',
        maximum: 250,
        minimum: 1,
        required: true,
        nullable: false
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
        name: 'minRotationSpeedRpm',
        type: 'smallint',
        maximum: 1000,
        minimum: 100,
        required: true,
        nullable: false
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
        name: 'maxRotationSpeedRpm',
        type: 'smallint',
        maximum: 6000,
        minimum: 100,
        required: true,
        nullable: false
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
        name: 'possibilitySpeedRegulation',
        type: 'boolean',
        required: true,
        nullable: false
    })
    @Column({
        name: 'possibility_speed_regulation',
        type: 'boolean',
        nullable: false
    })
    @IsNotEmpty()
    public possibilitySpeedRegulation: boolean;

    @ApiProperty({
        name: 'coolerHeightMm',
        type: 'smallint',
        maximum: 250,
        minimum: 1,
        required: false,
        nullable: true
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
        name: 'minNoiseLeveDb',
        type: 'smallint',
        maximum: 100,
        minimum: 1,
        required: false,
        nullable: true
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
        name: 'maxNoiseLeveDb',
        type: 'smallint',
        maximum: 200,
        minimum: 1,
        required: true,
        nullable: false
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
        name: 'connector',
        type: 'text',
        maximum: 255,
        minimum: 6,
        required: true,
        nullable: false
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
        name: 'airFlowCFM',
        type: 'double precision',
        maximum: 150,
        minimum: 1,
        required: true,
        nullable: false
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
        name: 'MTBFHours',
        type: 'int',
        maximum: 400000,
        minimum: 1,
        required: true,
        nullable: false
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
        name: 'supplyVoltage',
        type: 'text',
        maximum: 255,
        minimum: 6,
        required: true,
        nullable: false
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

    @ApiProperty({
        name: 'backlight',
        type: 'boolean',
        required: true
    })
    @Column({
        name: 'backlight',
        type: 'boolean',
        nullable: false
    })
    @IsNotEmpty()
    public backlight: boolean;

    @ApiProperty({
        name: 'backlightColor',
        type: 'text',
        maximum: 100,
        minimum: 6,
        required: false,
        nullable: true
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
        name: 'lengthTubesMm',
        type: 'smallint',
        maximum: 500,
        minimum: 1,
        required: false,
        nullable: true
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
        name: 'radiatorSizeMm',
        type: 'smallint',
        maximum: 500,
        minimum: 1,
        required: false,
        nullable: true
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
        name: 'bearingType',
        type: 'text',
        maximum: 30,
        minimum: 0,
        required: false,
        nullable: true
    })
    @Column({
        name: 'bearing_type',
        type: 'text',
        nullable: true
    })
    @MaxLength(30)
    @MinLength(0)
    @IsNotEmpty()
    public bearingType: string;

    @ApiProperty({
        name: 'numberHeatPipes',
        type: 'smallint',
        maximum: 12,
        minimum: 1,
        required: false,
        nullable: true
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
        name: 'powerConsumptionWt',
        type: 'double precision',
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
        name: 'more',
        type: 'text',
        maximum: 455,
        minimum: 6,
        required: false,
        nullable: true
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
        name: 'pumpSizeMm',
        type: 'smallint',
        maximum: 300,
        minimum: 0,
        required: false,
        nullable: true
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
        name: 'weightKg',
        type: 'double precision',
        maximum: 6,
        minimum: 0,
        required: true,
        nullable: false
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
        name: 'sizeVolumeMm',
        type: 'text',
        maximum: 100,
        minimum: 6,
        required: false,
        nullable: true
    })
    @Column({
        name: 'size_volume_mm',
        type: 'text',
        nullable: true
    })
    @MaxLength(100)
    @MinLength(6)
    public sizeVolumeMm: string;

    @ApiProperty({
        name: 'package',
        type: 'enum',
        enum: Package,
        required: true,
        nullable: false
    })
    @Column({
        name: 'package',
        type: 'enum',
        enum: Package,
        default: Package.RTL,
        nullable: false
    })
    @IsNotEmpty()
    public package: Package;

    @ApiProperty({
        name: 'price',
        type: 'numeric',
        maximum: 500000,
        minimum: 1000,
        required: false,
        nullable: true
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
