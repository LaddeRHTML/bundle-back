import { IsNotEmpty, Max, Min } from 'class-validator';
import { Entity, Column } from 'typeorm';

import { BaseAccessory } from '../BaseAccessory';
import { CoolerMaker, Package } from './CoolerEnums';

// interface Socket{
//     name: 'Intel' | 'AMD';
//     socket_generation: string[]
// }

@Entity()
export class Cooler extends BaseAccessory {
    constructor(maker: string, model: string) {
        super();
        this.name = `${maker} ${model} `;
    }

    @Column({ type: 'enum', enum: CoolerMaker })
    maker: CoolerMaker;

    @Column({
        name: 'socket',
        type: 'text',
        array: true,
        default: [],
        nullable: false
    })
    @IsNotEmpty()
    socket: string[];

    @Column({
        name: 'max_TDP_wt',
        type: 'smallint',
        nullable: false
    })
    @Max(500)
    @Min(1)
    @IsNotEmpty()
    max_TDP_wt: number;

    @Column({
        name: 'material',
        type: 'text',
        array: true,
        default: [],
        nullable: false
    })
    @IsNotEmpty()
    material: string[];

    @Column({
        name: 'fan_diameter_mm',
        type: 'smallint',
        nullable: false
    })
    @Max(250)
    @Min(1)
    @IsNotEmpty()
    fan_diameter_mm: number;

    @Column({
        name: 'min_rotation_speed_rpm',
        type: 'smallint',
        nullable: false
    })
    @Max(1000)
    @Min(100)
    @IsNotEmpty()
    min_rotation_speed_rpm: number;

    @Column({
        name: 'max_rotation_speed_rpm',
        type: 'smallint',
        nullable: false
    })
    @Max(6000)
    @Min(100)
    @IsNotEmpty()
    max_rotation_speed_rpm: number;

    @Column({
        name: 'possibility_speed_regulation',
        type: 'boolean',
        nullable: false
    })
    @IsNotEmpty()
    possibility_speed_regulation: boolean;

    @Column({
        name: 'cooler_height_mm',
        type: 'smallint',
        nullable: false
    })
    @Max(250)
    @Min(1)
    @IsNotEmpty()
    cooler_height_mm: number;

    @Column({
        name: 'min_noise_leve_dB',
        type: 'smallint',
        nullable: false
    })
    @Max(100)
    @Min(1)
    @IsNotEmpty()
    min_noise_leve_dB: number;

    @Column({
        name: 'max_noise_leve_dB',
        type: 'smallint',
        nullable: false
    })
    @Max(200)
    @Min(1)
    @IsNotEmpty()
    max_noise_leve_dB: number;

    @Column({
        name: 'connector',
        type: 'text',
        nullable: false
    })
    @IsNotEmpty()
    connector: string;

    @Column({
        name: 'air_flow_CFM',
        type: 'double precision',
        nullable: false
    })
    @Max(150)
    @Min(1)
    @IsNotEmpty()
    air_flow_CFM: number;

    @Column({
        name: 'MTBF',
        type: 'int',
        nullable: false
    })
    @Max(400000)
    @Min(1)
    @IsNotEmpty()
    MTBF: number;

    @Column({
        name: 'supply_voltage',
        type: 'text',
        nullable: false
    })
    @IsNotEmpty()
    supply_voltage_w: string;

    @Column({
        name: 'backlight',
        type: 'boolean',
        nullable: false
    })
    @IsNotEmpty()
    backlight: boolean;

    @Column({
        name: 'bearing_type',
        type: 'text',
        nullable: false
    })
    @IsNotEmpty()
    bearing_type: string;

    @Column({
        name: 'number_heat_pipes',
        type: 'smallint',
        nullable: false
    })
    @Max(12)
    @Min(1)
    @IsNotEmpty()
    number_heat_pipes: number;

    @Column({
        name: 'power_consumption_wt',
        type: 'double precision',
        nullable: false
    })
    @Max(12)
    @Min(0)
    @IsNotEmpty()
    power_consumption_wt: number;

    @Column({
        name: 'more',
        type: 'text',
        nullable: true
    })
    more: string;

    @Column({
        name: 'dimensions_W_x_H_x_D_cm',
        type: 'double precision',
        array: true,
        default: [],
        nullable: false
    })
    @Max(30)
    @Min(0)
    @IsNotEmpty()
    dimensions_W_x_H_x_D_cm: number[];

    @Column({ type: 'enum', enum: Package, default: Package.RTL })
    @IsNotEmpty()
    package: Package;
}
