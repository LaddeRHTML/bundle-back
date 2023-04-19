import { ApiProperty } from '@nestjs/swagger';
import { Max, Min, IsNotEmpty, MaxLength, MinLength } from 'class-validator';
import { Column, Entity, JoinColumn, OneToMany } from 'typeorm';

import { Product } from 'model/product/Product';
import { BaseAccessory } from '../BaseAccessory';
import { FormFactor, HDDMaker } from './HDDEnums';

@Entity()
export class HDD extends BaseAccessory {
    constructor(maker: string, disk_capacity_Gb: number, model: string, form_factor: string) {
        super();
        this.name = `${maker} ${disk_capacity_Gb} ${model} ${form_factor}`;
    }

    @ApiProperty()
    @Column({ name: 'maker', type: 'enum', enum: HDDMaker })
    maker: HDDMaker;

    @ApiProperty({
        maximum: 35,
        minimum: 2,
        required: false
    })
    @Column({
        name: 'line',
        type: 'text',
        nullable: true
    })
    @MaxLength(35)
    @MinLength(2)
    line: string;

    @ApiProperty()
    @Column({
        name: 'form_factor',
        type: 'enum',
        enum: FormFactor,
        default: FormFactor.FormFactor_3
    })
    @IsNotEmpty()
    public form_factor: FormFactor;

    @ApiProperty({
        maximum: 100,
        minimum: 6,
        required: true
    })
    @Column({
        name: 'interface',
        type: 'text',
        nullable: false
    })
    @MaxLength(100)
    @MinLength(6)
    @IsNotEmpty()
    public interface: string;

    @ApiProperty({
        maximum: 12,
        minimum: 1
    })
    @Column({
        name: 'interface_baud_rate_Gbps',
        type: 'smallint',
        nullable: false
    })
    @Max(12)
    @Min(1)
    @IsNotEmpty()
    public interface_baud_rate_Gbps: number;

    @ApiProperty({
        maximum: 30000,
        minimum: 1000
    })
    @Column({
        name: 'disk_capacity',
        type: 'smallint',
        nullable: false
    })
    @Max(30000)
    @Min(1000)
    @IsNotEmpty()
    public disk_capacity_Gb: number;

    @ApiProperty({
        maximum: 15000,
        minimum: 100,
        required: false
    })
    @Column({
        name: 'sequential_read_mb_s',
        type: 'smallint',
        nullable: true
    })
    @Max(15000)
    @Min(100)
    public sequential_read_mb_s: number;

    @ApiProperty({
        maximum: 15000,
        minimum: 100,
        required: false
    })
    @Column({
        name: 'sequential_write_mb_s',
        type: 'smallint',
        nullable: true
    })
    @Max(15000)
    @Min(100)
    public sequential_write_mb_s: number;

    @ApiProperty({
        required: false
    })
    @Column({
        name: 'memory_chip_layout',
        type: 'text',
        nullable: true
    })
    public memory_chip_layout: string;

    @ApiProperty({
        maximum: 1000,
        minimum: 1,
        required: false
    })
    @Column({
        name: 'total_data_volume_TBW',
        type: 'smallint',
        nullable: true
    })
    @Max(1000)
    @Min(1)
    public total_data_volume_TBW: number;

    @ApiProperty({
        maximum: 1024,
        minimum: 1,
        required: false
    })
    @Column({
        name: 'buffer_mb',
        type: 'smallint',
        nullable: true
    })
    @Max(1024)
    @Min(1)
    public buffer_mb: number;

    @ApiProperty({
        maximum: 7200,
        minimum: 1,
        required: false
    })
    @Column({
        name: 'spindle_speed_rpm',
        type: 'smallint',
        nullable: true
    })
    @Max(7200)
    @Min(1)
    public spindle_speed_rpm: number;

    @ApiProperty({
        maximum: 110,
        minimum: 1
    })
    @Column({
        name: 'noise_level_dB',
        type: 'smallint',
        nullable: false
    })
    @Max(110)
    @Min(1)
    @IsNotEmpty()
    public noise_level_dB: number;

    @ApiProperty({
        maximum: 100,
        minimum: 1
    })
    @Column({
        name: 'max_overload_during_operation_G',
        type: 'smallint',
        nullable: false
    })
    @Max(100)
    @Min(1)
    @IsNotEmpty()
    public max_overload_during_operation_G: number;

    @ApiProperty({
        maximum: 500,
        minimum: 1
    })
    @Column({
        name: 'max_overloads_in_the_off_state',
        type: 'smallint',
        nullable: true
    })
    @Max(500)
    @Min(1)
    public max_overloads_off_state_G: number;

    @ApiProperty({
        maximum: 10,
        minimum: 1
    })
    @Column({
        name: 'power_consumption_active_mode_wt',
        type: 'double precision',
        nullable: false
    })
    @Max(10)
    @Min(1)
    @IsNotEmpty()
    public power_consumption_active_mode_wt: number;

    @ApiProperty({
        maximum: 10,
        minimum: 1,
        required: false
    })
    @Column({
        name: 'power_consumption_idle_mode_wt',
        type: 'double precision',
        nullable: true
    })
    @Max(10)
    @Min(1)
    @IsNotEmpty()
    public power_consumption_idle_mode_wt: number;

    @ApiProperty()
    @Column({
        name: 'MTBF_hours',
        type: 'int',
        nullable: true
    })
    @IsNotEmpty()
    public MTBF_hours: number;

    @ApiProperty({
        required: false
    })
    @Column({
        name: 'additional_technologies',
        type: 'text',
        nullable: true
    })
    public additional_technologies: string;

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
    public size_volume_mm: string;

    @ApiProperty({
        maximum: 1000000,
        minimum: 10000
    })
    @Column({
        name: 'price',
        type: 'numeric',
        precision: 10,
        scale: 2,
        nullable: false,
        default: 10000
    })
    @Max(1000000)
    @Min(10000)
    @IsNotEmpty()
    public price: number;

    @JoinColumn({ name: 'product' })
    @OneToMany(() => Product, (p: Product) => p.hdd, {
        nullable: true
    })
    public products: Product[];
}
