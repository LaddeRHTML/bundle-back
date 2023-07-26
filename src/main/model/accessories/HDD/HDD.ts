import { ApiProperty } from '@nestjs/swagger';
import { Max, Min, IsNotEmpty, MaxLength, MinLength } from 'class-validator';
import { Column, Entity, ManyToMany } from 'typeorm';

import { Product } from 'model/product/Product';
import { BaseAccessory } from '../BaseAccessory';
import { FormFactor, HDDMaker, HDDType } from './HDDEnums';

@Entity()
export class HDD extends BaseAccessory {
    constructor(
        type: HDDType,
        maker: string,
        diskCapacityGb: number,
        model: string,
        formFactor: string,
        hddinterface: string
    ) {
        super();
        this.name = `${type} ${diskCapacityGb}GB ${maker} ${model}, ${formFactor}, ${hddinterface}`;
    }

    @ApiProperty({
        name: 'maker',
        type: 'enum',
        enum: HDDMaker,
        required: true,
        nullable: false
    })
    @Column({ name: 'maker', type: 'enum', enum: HDDMaker, nullable: false })
    maker: HDDMaker;

    @ApiProperty({
        name: 'type',
        type: 'enum',
        enum: HDDType,
        required: true,
        nullable: false
    })
    @Column({ name: 'type', type: 'enum', enum: HDDType, nullable: false })
    public type: HDDType;

    @ApiProperty({
        name: 'line',
        type: 'text',
        maximum: 35,
        minimum: 2,
        required: false,
        nullable: true
    })
    @Column({
        name: 'line',
        type: 'text',
        nullable: true
    })
    @MaxLength(35)
    @MinLength(2)
    public line: string;

    @ApiProperty({
        name: 'form_factor',
        type: 'enum',
        enum: FormFactor,
        required: true,
        nullable: false
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
        name: 'interface',
        type: 'text',
        maximum: 100,
        minimum: 6,
        required: true,
        nullable: false
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
        name: 'interfaceBaudRateGbps',
        type: 'smallint',
        maximum: 12,
        minimum: 1,
        required: false,
        nullable: true
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
        name: 'diskCapacity',
        type: 'smallint',
        maximum: 30000,
        minimum: 1000,
        required: true,
        nullable: false
    })
    @Column({
        name: 'disk_capacity',
        type: 'smallint',
        nullable: false
    })
    @Max(30000)
    @Min(1000)
    @IsNotEmpty()
    public diskCapacity: number;

    @ApiProperty({
        name: 'sequentialReadMbS',
        type: 'smallint',
        maximum: 15000,
        minimum: 100,
        required: false,
        nullable: true
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
        name: 'sequentialWriteMbS',
        type: 'smallint',
        maximum: 15000,
        minimum: 100,
        required: false,
        nullable: true
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
        name: 'memoryChipLayout',
        type: 'text',
        maximum: 30,
        minimum: 0,
        required: false,
        nullable: true
    })
    @Column({
        name: 'memory_chip_layout',
        type: 'text',
        nullable: true
    })
    @MaxLength(30)
    @MinLength(0)
    public memoryChipLayout: string;

    @ApiProperty({
        name: 'totalDataVolumeTBW',
        type: 'smallint',
        maximum: 1000,
        minimum: 1,
        required: false,
        nullable: true
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
        name: 'bufferMb',
        type: 'smallint',
        maximum: 1024,
        minimum: 1,
        required: false,
        nullable: true
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
        name: 'spindleSpeedRpm',
        type: 'smallint',
        maximum: 7200,
        minimum: 1,
        required: false,
        nullable: true
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
        name: 'noiseLevelDb',
        type: 'smallint',
        maximum: 110,
        minimum: 1,
        required: false,
        nullable: true
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
        name: 'maxOverloadDuringOperationG',
        type: 'smallint',
        maximum: 100,
        minimum: 1,
        required: false,
        nullable: true
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
        name: 'maxOverloadsOffStateG',
        type: 'smallint',
        maximum: 500,
        minimum: 1,
        required: false,
        nullable: true
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
        name: 'powerConsumptionActiveModeWt',
        type: 'double precision',
        maximum: 10,
        minimum: 1,
        required: true,
        nullable: false
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
        name: 'powerConsumptionIdleModeWt',
        type: 'double precision',
        maximum: 10,
        minimum: 1,
        required: false,
        nullable: true
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
        name: 'MTBFHours',
        type: 'int',
        maximum: 6000000,
        minimum: 0,
        required: false,
        nullable: true
    })
    @Column({
        name: 'MTBF_hours',
        type: 'int',
        nullable: true
    })
    @MaxLength(6000000)
    @MinLength(0)
    @IsNotEmpty()
    public MTBFHours: number;

    @ApiProperty({
        name: 'additionalTechnologies',
        type: 'text',
        maximum: 30,
        minimum: 0,
        required: false,
        nullable: true
    })
    @Column({
        name: 'additional_technologies',
        type: 'text',
        nullable: true
    })
    @MaxLength(30)
    @MinLength(0)
    public additionalTechnologies: string;

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
        name: 'price',
        type: 'numeric',
        maximum: 1000000,
        minimum: 10000,
        required: true,
        nullable: false
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

    @ApiProperty({ name: 'products', isArray: true, nullable: true, required: false })
    @ManyToMany(() => Product, (p: Product) => p.hdd, { nullable: true })
    public products: Product[];
}
