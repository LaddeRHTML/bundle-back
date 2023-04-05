import { IsNotEmpty, Max, Min } from 'class-validator';
import { Entity, Column, JoinColumn, OneToMany } from 'typeorm';

import { BaseAccessory } from '../BaseAccessory';
import { CoolerMaker, Package } from './CoolerEnums';
import { Product } from 'model/product/Product';
import { CPUSocket } from '../CPU/CPUEnums';

@Entity()
export class Cooler extends BaseAccessory {
    constructor(maker: string, model: string) {
        super();
        this.name = `${maker} ${model}`;
    }

    @Column({ type: 'enum', enum: CoolerMaker })
    public maker: CoolerMaker;

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

    @Column({
        name: 'max_TDP_wt',
        type: 'smallint',
        nullable: true
    })
    @Max(500)
    @Min(1)
    public max_TDP_wt: number;

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
        name: 'fan_diameter_mm',
        type: 'smallint',
        nullable: false
    })
    @Max(250)
    @Min(1)
    @IsNotEmpty()
    public fan_diameter_mm: number;

    @Column({
        name: 'min_rotation_speed_rpm',
        type: 'smallint',
        nullable: false
    })
    @Max(1000)
    @Min(100)
    @IsNotEmpty()
    public min_rotation_speed_rpm: number;

    @Column({
        name: 'max_rotation_speed_rpm',
        type: 'smallint',
        nullable: false
    })
    @Max(6000)
    @Min(100)
    @IsNotEmpty()
    public max_rotation_speed_rpm: number;

    @Column({
        name: 'possibility_speed_regulation',
        type: 'boolean',
        nullable: false
    })
    @IsNotEmpty()
    public possibility_speed_regulation: boolean;

    @Column({
        name: 'cooler_height_mm',
        type: 'smallint',
        nullable: true
    })
    @Max(250)
    @Min(1)
    public cooler_height_mm: number;

    @Column({
        name: 'min_noise_leve_dB',
        type: 'smallint',
        nullable: false
    })
    @Max(100)
    @Min(1)
    @IsNotEmpty()
    public min_noise_leve_dB: number;

    @Column({
        name: 'max_noise_leve_dB',
        type: 'smallint',
        nullable: false
    })
    @Max(200)
    @Min(1)
    @IsNotEmpty()
    public max_noise_leve_dB: number;

    @Column({
        name: 'connector',
        type: 'text',
        nullable: false
    })
    @IsNotEmpty()
    public connector: string;

    @Column({
        name: 'air_flow_CFM',
        type: 'double precision',
        nullable: false
    })
    @Max(150)
    @Min(1)
    @IsNotEmpty()
    public air_flow_CFM: number;

    @Column({
        name: 'MTBF_hours',
        type: 'int',
        nullable: false
    })
    @Max(400000)
    @Min(1)
    @IsNotEmpty()
    public MTBF_hours: number;

    @Column({
        name: 'supply_voltage',
        type: 'text',
        nullable: false
    })
    @IsNotEmpty()
    public supply_voltage_w: string;

    @Column({
        name: 'backlight',
        type: 'boolean',
        nullable: false
    })
    @IsNotEmpty()
    public backlight: boolean;

    @Column({
        name: 'backlight_color',
        type: 'text',
        nullable: true
    })
    public backlight_color: string;

    @Column({
        name: 'length_tubes_mm',
        type: 'smallint',
        nullable: true
    })
    @Max(500)
    @Min(1)
    public length_tubes_mm: number;

    @Column({
        name: 'radiator_size_mm',
        type: 'smallint',
        nullable: true
    })
    @Max(500)
    @Min(1)
    public radiator_size_mm: number;

    @Column({
        name: 'bearing_type',
        type: 'text',
        nullable: true
    })
    @IsNotEmpty()
    public bearing_type: string;

    @Column({
        name: 'number_heat_pipes',
        type: 'smallint',
        nullable: true
    })
    @Max(12)
    @Min(1)
    public number_heat_pipes: number;

    @Column({
        name: 'power_consumption_wt',
        type: 'double precision',
        nullable: true
    })
    @Max(12)
    @Min(0)
    public power_consumption_wt: number;

    @Column({
        name: 'more',
        type: 'text',
        nullable: true
    })
    public more: string;

    @Column({
        name: 'pump_size_cm',
        type: 'double precision',
        nullable: true
    })
    @Max(30)
    @Min(0)
    public pump_size_cm: number;

    @Column({
        name: 'radiator_size_cm',
        type: 'double precision',
        nullable: true
    })
    @Max(40)
    @Min(0)
    public radiator_size_cm: number;

    @Column({
        name: 'weight_kg',
        type: 'double precision',
        nullable: false
    })
    @Max(6)
    @Min(0)
    @IsNotEmpty()
    public weight_kg: number;

    @Column({
        name: 'size_volume_cm',
        type: 'text',
        nullable: true
    })
    public size_volume_cm: string;

    @Column({
        name: 'package',
        type: 'enum',
        enum: Package,
        default: Package.RTL
    })
    @IsNotEmpty()
    public package: Package;

    @Column({
        name: 'price',
        type: 'numeric',
        precision: 10,
        scale: 2,
        nullable: false,
        default: 1000
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
