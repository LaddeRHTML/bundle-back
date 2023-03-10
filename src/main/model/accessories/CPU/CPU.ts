import { IsNotEmpty, Max, MaxLength, Min, MinLength } from 'class-validator';
import { Column, Entity } from 'typeorm';

import { CPUMaker, Package } from './CPUEnums';
import { BaseAccessory } from '../BaseAccessory';

interface Ram {
    name: 'ddr4' | 'ddr5';
    max_mghz: number;
}

@Entity()
export class CPU extends BaseAccessory {
    constructor(maker: string, type: string, model: string, socket: string) {
        super();
        this.name = `${maker} ${type} ${model} ${socket}`;
    }

    @Column({ type: 'enum', enum: CPUMaker })
    maker: CPUMaker;

    @Column({
        name: 'type',
        type: 'text',
        nullable: false
    })
    @MaxLength(10)
    @MinLength(1)
    @IsNotEmpty()
    type: string;

    @Column({
        name: 'socket',
        type: 'text',
        nullable: false
    })
    @MaxLength(10)
    @MinLength(1)
    @IsNotEmpty()
    socket: string;

    @Column({
        name: 'core_count',
        type: 'smallint',
        nullable: false
    })
    @Max(256)
    @Min(2)
    @IsNotEmpty()
    core_count: number;

    @Column({
        name: 'thread_count',
        type: 'smallint',
        nullable: false
    })
    @Min(1)
    @IsNotEmpty()
    thread_count: number;

    @Column({
        name: 'clock_frequency_max_ghz',
        type: 'double precision',
        nullable: false
    })
    @Max(7)
    @Min(1.8)
    @IsNotEmpty()
    clock_frequency_max_ghz: number;

    @Column({
        name: 'clock_frequency_min_ghz',
        type: 'double precision',
        nullable: false
    })
    @Max(7)
    @Min(1.8)
    @IsNotEmpty()
    clock_frequency_min_ghz: number;

    @Column({
        name: 'microarchitecture',
        type: 'text',
        nullable: false
    })
    @IsNotEmpty()
    microarchitecture: string;

    @Column({
        name: 'cache_size_l2',
        type: 'smallint',
        nullable: false
    })
    @IsNotEmpty()
    cache_size_l2: number;

    @Column({
        name: 'cache_size_l3',
        type: 'smallint',
        nullable: false
    })
    @IsNotEmpty()
    cache_size_l3: number;

    @Column({
        name: 'support_ram',
        type: 'jsonb',
        default: () => "'[]'"
    })
    @IsNotEmpty()
    support_ram: Ram[];

    @Column({
        name: 'max_ram_gb',
        type: 'smallint',
        nullable: false
    })
    @Max(256)
    @Min(1)
    @IsNotEmpty()
    max_ram_gb: number;

    @Column({
        name: 'support_ess',
        type: 'boolean',
        nullable: false
    })
    @IsNotEmpty()
    support_ess: boolean;

    @Column({
        name: 'integrated_graphics_system',
        type: 'text',
        nullable: false
    })
    @MaxLength(40)
    @MinLength(4)
    @IsNotEmpty()
    integrated_graphics_system: string;

    @Column({
        name: 'techproc_nm',
        type: 'smallint',
        nullable: false
    })
    @Max(256)
    @Min(1)
    @IsNotEmpty()
    techproccess_nm: number;

    @Column({
        name: 'TDP',
        type: 'smallint',
        nullable: false
    })
    @Max(1000)
    @Min(1)
    @IsNotEmpty()
    TDP_wt: number;

    @Column({
        name: 'max_TDP_wt',
        type: 'smallint',
        nullable: false
    })
    @Max(1000)
    @Min(1)
    @IsNotEmpty()
    max_TDP_wt: number;

    @Column({
        name: 'instruction_set',
        type: 'text',
        array: true,
        default: [],
        nullable: false
    })
    @IsNotEmpty()
    instruction_set: string[];

    @Column({
        name: 'support_hyper_threading',
        type: 'boolean',
        nullable: false
    })
    @IsNotEmpty()
    support_hyper_threading: boolean;

    @Column({
        name: 'support_64_b',
        type: 'boolean',
        nullable: false
    })
    @IsNotEmpty()
    support_64_b: boolean;

    @Column({ type: 'enum', enum: Package, default: Package.OEM })
    @IsNotEmpty()
    package: Package;

    @Column({
        name: 'critical_temperature_c',
        type: 'smallint',
        nullable: false
    })
    @IsNotEmpty()
    critical_temperature_c: number;

    @Column({
        name: 'more',
        type: 'text',
        nullable: true
    })
    more: string;
}
