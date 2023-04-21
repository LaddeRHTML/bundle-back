import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Max, MaxLength, Min, MinLength } from 'class-validator';
import { Column, Entity } from 'typeorm';

import { BaseAccessory } from '../BaseAccessory';
import { FANDiameter, FANMaker, Package } from './FANEnums';

@Entity()
export class FAN extends BaseAccessory {
    constructor(maker: string, model: string, diameter: number, color: string) {
        super();
        this.name = `${maker} ${model}, ${diameter}mm, ${color}`;
    }

    @ApiProperty({ name: 'maker', type: 'enum', enum: FANMaker, required: true })
    @Column({ name: 'maker', type: 'enum', enum: FANMaker, nullable: false })
    public maker: FANMaker;

    @ApiProperty({ name: 'diameter', type: 'enum', enum: FANDiameter, required: true })
    @Column({ name: 'diameter', type: 'enum', enum: FANDiameter, nullable: false })
    public diameter: FANDiameter;

    @ApiProperty({
        name: 'minRotationSpeed',
        type: 'smallint',
        maximum: 1000,
        minimum: 100,
        required: false
    })
    @Column({
        name: 'min_rotation_speed',
        type: 'smallint',
        nullable: true
    })
    @Max(1000)
    @Min(100)
    @IsNotEmpty()
    public minRotationSpeed: number;

    @ApiProperty({
        name: 'maxRotationSpeed',
        type: 'smallint',
        maximum: 6000,
        minimum: 100,
        required: false
    })
    @Column({
        name: 'max_rotation_speed',
        type: 'smallint',
        nullable: true
    })
    @Max(6000)
    @Min(100)
    @IsNotEmpty()
    public maxRotationSpeed: number;

    @ApiProperty({
        name: 'possibilitySpeedRegulation',
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
        name: 'maxNoiseLeveDb',
        type: 'smallint',
        maximum: 200,
        minimum: 1,
        required: true
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
        required: true
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
        required: true
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
        name: 'bearingType',
        type: 'text',
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
        name: 'MTBFHours',
        type: 'int',
        maximum: 60000,
        minimum: 1,
        required: true
    })
    @Column({
        name: 'MTBF_hours',
        type: 'int',
        nullable: false
    })
    @Max(60000)
    @Min(1)
    @IsNotEmpty()
    public MTBFHours: number;

    @ApiProperty({
        name: 'powerConsumptionWt',
        type: 'double precision',
        maximum: 12,
        minimum: 0,
        required: false
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
        name: 'supplyVoltage',
        type: 'text',
        maximum: 255,
        minimum: 6,
        required: true
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
    public sizeVolumeMm: string;

    @ApiProperty({
        name: 'weightKg',
        type: 'double precision',
        maximum: 2,
        minimum: 0,
        required: true
    })
    @Column({
        name: 'weight_kg',
        type: 'double precision',
        nullable: false
    })
    @Max(2)
    @Min(0)
    @IsNotEmpty()
    public weightKg: number;

    @ApiProperty({
        name: 'package',
        type: 'enum',
        enum: Package,
        default: Package.RTL,
        required: true
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
        name: 'kit',
        type: 'boolean',
        required: false
    })
    @Column({
        name: 'kit',
        type: 'boolean',
        nullable: true
    })
    @IsNotEmpty()
    public kit: boolean;

    @ApiProperty({
        name: 'count',
        type: 'smallint',
        maximum: 10,
        minimum: 1,
        required: false
    })
    @Column({
        name: 'count',
        type: 'smallint',
        nullable: true
    })
    @Max(10)
    @Min(1)
    @IsNotEmpty()
    public count: number;

    @ApiProperty({
        name: 'color',
        type: 'text',
        required: false
    })
    @Column({
        name: 'color',
        type: 'text',
        nullable: true
    })
    @IsNotEmpty()
    public color: string;

    @ApiProperty({
        name: 'price',
        type: 'numeric',
        maximum: 1000000,
        minimum: 6000,
        required: false
    })
    @Column({
        name: 'price',
        type: 'numeric',
        precision: 10,
        scale: 2,
        nullable: true
    })
    @Max(150000)
    @Min(800)
    @IsNotEmpty()
    public price: number;
}
