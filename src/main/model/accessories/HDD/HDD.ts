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
        required: true
    })
    @Column({ name: 'maker', type: 'enum', enum: HDDMaker, nullable: false })
    maker: HDDMaker;

    @ApiProperty({
        name: 'type',
        type: 'enum',
        enum: HDDType
    })
    @Column({ name: 'type', type: 'enum', enum: HDDType })
    public type: HDDType;

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
    public line: string;

    @ApiProperty({
        name: 'form_factor',
        type: 'enum',
        enum: FormFactor
    })
    @Column({
        name: 'form_factor',
        type: 'enum',
        enum: FormFactor
    })
    @IsNotEmpty()
    public formFactor: FormFactor;

    @ApiProperty({
        name: 'interface',
        type: 'text',
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
        name: 'interfaceBaudRateGbps',
        type: 'smallint',
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
        name: 'diskCapacity',
        type: 'smallint',
        maximum: 30000,
        minimum: 1000,
        required: true
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
        name: 'sequentialWriteMbS',
        type: 'smallint',
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
        name: 'memoryChipLayout',
        type: 'text',
        required: false
    })
    @Column({
        name: 'memory_chip_layout',
        type: 'text',
        nullable: true
    })
    public memoryChipLayout: string;

    @ApiProperty({
        name: 'totalDataVolumeTBW',
        type: 'smallint',
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
        name: 'bufferMb',
        type: 'smallint',
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
        name: 'spindleSpeedRpm',
        type: 'smallint',
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
        name: 'noiseLevelDb',
        type: 'smallint',
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
        name: 'maxOverloadDuringOperationG',
        type: 'smallint',
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
        name: 'maxOverloadsOffStateG',
        type: 'smallint',
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
        name: 'powerConsumptionActiveModeWt',
        type: 'double precision',
        maximum: 10,
        minimum: 1,
        required: true
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
        name: 'MTBFHours',
        type: 'int',
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
        name: 'additionalTechnologies',
        type: 'text',
        required: false
    })
    @Column({
        name: 'additional_technologies',
        type: 'text',
        nullable: true
    })
    public additionalTechnologies: string;

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
        name: 'price',
        type: 'numeric',
        maximum: 1000000,
        minimum: 10000,
        required: true
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
