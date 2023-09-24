import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Max, MaxLength, Min, MinLength } from 'class-validator';
import { Column, Entity, ManyToMany } from 'typeorm';

import { BaseAccessory } from '../BaseAccessory';
import { FanDiameter, FanMaker, Package } from './FanEnums';
import { PCCase } from '../PCCase/PCCase';

@Entity('fan')
export class Fan extends BaseAccessory {
    constructor(maker: string, model: string, diameter: number, color: string) {
        super();
        this.name = `Fan ${maker} ${model}, ${diameter}mm, ${color}`;
    }

    @ApiProperty({ name: 'maker', type: 'enum', enum: FanMaker, required: true, nullable: false })
    @Column({ name: 'maker', type: 'enum', enum: FanMaker, nullable: false })
    public maker: FanMaker;

    @ApiProperty({
        name: 'diameter',
        type: 'enum',
        enum: FanDiameter,
        required: true,
        nullable: false
    })
    @Column({ name: 'diameter', type: 'enum', enum: FanDiameter, nullable: false })
    public diameter: FanDiameter;

    @ApiProperty({
        name: 'minRotationSpeed',
        type: 'smallint',
        maximum: 1000,
        minimum: 100,
        required: false,
        nullable: true
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
        required: false,
        nullable: true
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
        name: 'minNoiseLevel',
        type: 'smallint',
        maximum: 100,
        minimum: 1,
        required: false,
        nullable: true
    })
    @Column({
        name: 'min_noise_level_db',
        type: 'smallint',
        nullable: true
    })
    @Max(100)
    @Min(1)
    @IsNotEmpty()
    public minNoiseLevel: number;

    @ApiProperty({
        name: 'maxNoiseLevel',
        type: 'double precision',
        maximum: 200,
        minimum: 1,
        required: true,
        nullable: false
    })
    @Column({
        name: 'max_noise_level_db',
        type: 'double precision',
        nullable: false
    })
    @Max(200)
    @Min(1)
    @IsNotEmpty()
    public maxNoiseLevel: number;

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
        name: 'MTBFHours',
        type: 'int',
        maximum: 60000,
        minimum: 1,
        required: true,
        nullable: false
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
        name: 'powerConsumption',
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
    public powerConsumption: number;

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
        required: true,
        nullable: false
    })
    @Column({
        name: 'backlight',
        type: 'boolean',
        nullable: false
    })
    @IsNotEmpty()
    public backlight: boolean;

    @ApiProperty({
        name: 'backlight_connector',
        type: 'text',
        maximum: 20,
        minimum: 0,
        required: false,
        nullable: true
    })
    @Column({
        name: 'backlight_connector',
        type: 'text',
        nullable: true
    })
    @MaxLength(20)
    @MinLength(0)
    @IsNotEmpty()
    public backlightConnector: string;

    @ApiProperty({
        name: 'controller',
        type: 'text',
        required: false,
        nullable: true
    })
    @Column({
        name: 'controller',
        type: 'text',
        nullable: true
    })
    @MaxLength(255)
    @MinLength(6)
    @IsNotEmpty()
    public controller: string;

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
        name: 'sizeVolume',
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
    public sizeVolume: string;

    @ApiProperty({
        name: 'weight',
        type: 'double precision',
        maximum: 2,
        minimum: 0,
        required: true,
        nullable: false
    })
    @Column({
        name: 'weight_kg',
        type: 'double precision',
        nullable: false
    })
    @Max(2)
    @Min(0)
    @IsNotEmpty()
    public weight: number;

    @ApiProperty({
        name: 'package',
        type: 'enum',
        enum: Package,
        default: Package.RTL,
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
        name: 'kit',
        type: 'boolean',
        required: false,
        nullable: true
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
        required: false,
        nullable: true
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
        maximum: 15,
        minimum: 0,
        required: false,
        nullable: true
    })
    @Column({
        name: 'color',
        type: 'text',
        nullable: true
    })
    @MaxLength(15)
    @MinLength(0)
    @IsNotEmpty()
    public color: string;

    @ApiProperty({ name: 'cases', isArray: true, nullable: true, required: false })
    @ManyToMany(() => PCCase, (p: PCCase) => p.fans, { nullable: true })
    public cases: PCCase[];

    @ApiProperty({
        name: 'price',
        type: 'numeric',
        maximum: 150000,
        minimum: 800,
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
