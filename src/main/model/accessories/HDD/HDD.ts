import { ApiProperty } from '@nestjs/swagger';
import { Max, Min, IsNotEmpty, MaxLength, MinLength } from 'class-validator';
import { Column, Entity, JoinColumn, OneToMany } from 'typeorm';

import { Product } from 'model/product/Product';
import { BaseAccessory } from '../BaseAccessory';
import { FormFactor, HDDMaker } from './HDDEnums';

@Entity()
export class HDD extends BaseAccessory {
    constructor(maker: string, diskCapacityGb: number, model: string, formFactor: string) {
        super();
        this.name = `${maker} ${diskCapacityGb} ${model} ${formFactor}`;
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
    public formFactor: FormFactor;

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
        minimum: 1,
        required: false
    })
    @Column({
        name: 'interface_baud_rate_Gbps',
        type: 'smallint',
        nullable: true
    })
    @Max(12)
    @Min(1)
    @IsNotEmpty()
    public interfaceBaudRateGbps: number;

    @ApiProperty({
        maximum: 30000,
        minimum: 1000
    })
    @Column({
        name: 'disk_capacity_Gb',
        type: 'smallint',
        nullable: false
    })
    @Max(30000)
    @Min(1000)
    @IsNotEmpty()
    public diskCapacityGb: number;

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
    public sequentialReadMbS: number;

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
    public sequentialWriteMbS: number;

    @ApiProperty({
        required: false
    })
    @Column({
        name: 'memory_chip_layout',
        type: 'text',
        nullable: true
    })
    public memoryChipLayout: string;

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
    public totalDataVolumeTBW: number;

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
    public bufferMb: number;

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
    public spindleSpeedRpm: number;

    @ApiProperty({
        maximum: 110,
        minimum: 1,
        required: false
    })
    @Column({
        name: 'noise_level_dB',
        type: 'smallint',
        nullable: true
    })
    @Max(110)
    @Min(1)
    @IsNotEmpty()
    public noiseLevelDb: number;

    @ApiProperty({
        maximum: 100,
        minimum: 1,
        required: false
    })
    @Column({
        name: 'max_overload_during_operation_G',
        type: 'smallint',
        nullable: true
    })
    @Max(100)
    @Min(1)
    @IsNotEmpty()
    public maxOverloadDuringOperationG: number;

    @ApiProperty({
        maximum: 500,
        minimum: 1,
        required: false
    })
    @Column({
        name: 'max_overloads_in_the_off_state',
        type: 'smallint',
        nullable: true
    })
    @Max(500)
    @Min(1)
    public maxOverloadsOffStateG: number;

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
    public powerConsumptionActiveModeWt: number;

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
    public powerConsumptionIdleModeWt: number;

    @ApiProperty({
        required: false
    })
    @Column({
        name: 'MTBF_hours',
        type: 'int',
        nullable: true
    })
    @IsNotEmpty()
    public MTBFHours: number;

    @ApiProperty({
        required: false
    })
    @Column({
        name: 'additional_technologies',
        type: 'text',
        nullable: true
    })
    public additionalTechnologies: string;

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
    public sizeVolumeMm: string;

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
