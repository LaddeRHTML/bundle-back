import { IsNotEmpty, Max, MaxLength, Min, MinLength } from 'class-validator';
import { Column, Entity, JoinColumn, OneToMany } from 'typeorm';

import { CPUMaker, CPUSocket, Package } from './CPUEnums';
import { BaseAccessory } from '../BaseAccessory';
import { Product } from 'model/product/Product';

interface Ram {
    name: 'ddr4' | 'ddr5';
    max_mghz: number;
}

@Entity()
export class CPU extends BaseAccessory {
    constructor(maker: string, type: string, model: string, socket: CPUSocket) {
        super();
        this.name = `${maker} ${type} ${model} ${socket}`;
    }

    @Column({ name: 'maker', type: 'enum', enum: CPUMaker })
    public maker: CPUMaker;

    @Column({
        name: 'type',
        type: 'text',
        nullable: false
    })
    @MaxLength(10)
    @MinLength(1)
    @IsNotEmpty()
    public type: string;

    @Column({
        name: 'socket',
        enum: CPUSocket,
        type: 'enum',
        nullable: false
    })
    @IsNotEmpty()
    public socket: CPUSocket;

    @Column({
        name: 'core_count',
        type: 'smallint',
        nullable: false
    })
    @Max(256)
    @Min(2)
    @IsNotEmpty()
    public core_count: number;

    @Column({
        name: 'thread_count',
        type: 'smallint',
        nullable: false
    })
    @Min(1)
    @IsNotEmpty()
    public thread_count: number;

    @Column({
        name: 'clock_frequency_max_ghz',
        type: 'double precision',
        nullable: false
    })
    @Max(7)
    @Min(1.8)
    @IsNotEmpty()
    public clock_frequency_max_ghz: number;

    @Column({
        name: 'clock_frequency_min_ghz',
        type: 'double precision',
        nullable: false
    })
    @Max(7)
    @Min(1.8)
    @IsNotEmpty()
    public clock_frequency_min_ghz: number;

    @Column({
        name: 'microarchitecture',
        type: 'text',
        nullable: false
    })
    @IsNotEmpty()
    public microarchitecture: string;

    @Column({
        name: 'cache_size_l2',
        type: 'smallint',
        nullable: false
    })
    @IsNotEmpty()
    public cache_size_l2: number;

    @Column({
        name: 'cache_size_l3',
        type: 'smallint',
        nullable: false
    })
    @IsNotEmpty()
    public cache_size_l3: number;

    @Column({
        name: 'support_ram',
        type: 'jsonb',
        default: () => "'[]'"
    })
    @IsNotEmpty()
    public support_ram: Ram[];

    @Column({
        name: 'max_ram_gb',
        type: 'smallint',
        nullable: false
    })
    @Max(256)
    @Min(1)
    @IsNotEmpty()
    public max_ram_gb: number;

    @Column({
        name: 'support_ess',
        type: 'boolean',
        nullable: false
    })
    @IsNotEmpty()
    public support_ess: boolean;

    @Column({
        name: 'integrated_graphics_system',
        type: 'text',
        nullable: false
    })
    @MaxLength(40)
    @MinLength(4)
    @IsNotEmpty()
    public integrated_graphics_system: string;

    @Column({
        name: 'techproc_nm',
        type: 'smallint',
        nullable: false
    })
    @Max(256)
    @Min(1)
    @IsNotEmpty()
    public techproccess_nm: number;

    @Column({
        name: 'TDP',
        type: 'smallint',
        nullable: false
    })
    @Max(1000)
    @Min(1)
    @IsNotEmpty()
    public TDP_wt: number;

    @Column({
        name: 'max_TDP_wt',
        type: 'smallint',
        nullable: false
    })
    @Max(1000)
    @Min(1)
    @IsNotEmpty()
    public max_TDP_wt: number;

    @Column({
        name: 'instruction_set',
        type: 'text',
        array: true,
        default: [],
        nullable: true
    })
    public instruction_set: string[];

    @Column({
        name: 'support_hyper_threading',
        type: 'boolean',
        nullable: false
    })
    @IsNotEmpty()
    public support_hyper_threading: boolean;

    @Column({
        name: 'support_64_b',
        type: 'boolean',
        nullable: false
    })
    @IsNotEmpty()
    public support_64_b: boolean;

    @Column({ type: 'enum', enum: Package, default: Package.OEM, nullable: false })
    @IsNotEmpty()
    public package: Package;

    @Column({
        name: 'critical_temperature_c',
        type: 'smallint',
        nullable: false
    })
    @IsNotEmpty()
    public critical_temperature_c: number;

    @Column({
        name: 'more',
        type: 'text',
        nullable: true
    })
    @MaxLength(455)
    @MinLength(6)
    public more: string;

    @Column({
        name: 'price',
        type: 'numeric',
        precision: 10,
        scale: 2,
        nullable: false,
        default: 6000
    })
    @Max(1000000)
    @Min(6000)
    @IsNotEmpty()
    public price: number;

    @JoinColumn({ name: 'product' })
    @OneToMany(() => Product, (p: Product) => p.CPU, {
        nullable: true
    })
    public products: Product[];
}
