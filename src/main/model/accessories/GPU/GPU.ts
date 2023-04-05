import { IsNotEmpty, Max, MaxLength, Min, MinLength } from 'class-validator';
import { Column, Entity } from 'typeorm';
import { BaseAccessory } from '../BaseAccessory';
import {
    Connectors,
    Cooling,
    GPUMaker,
    GPUManufacturer,
    GraphicsCardSeries,
    GraphicsRam,
    GraphicsRamSize,
    Package,
    PowerConnectors,
    SupportedMulti_GPU,
    Technologies
} from './GPUEnums';

@Entity()
export class GPU extends BaseAccessory {
    constructor(maker: string, model: string, graphics_ram_size_Gb: number) {
        super();
        this.name = `${maker} ${model} ${graphics_ram_size_Gb}`;
    }

    @Column({ name: 'maker', type: 'enum', enum: GPUMaker })
    public maker: GPUMaker;

    @Column({
        name: 'graphics_card_series',
        type: 'enum',
        enum: GraphicsCardSeries,
        nullable: false
    })
    public graphics_card_series: GraphicsCardSeries;

    @Column({
        name: 'GPU_manufacturer',
        type: 'enum',
        enum: GPUManufacturer,
        nullable: false
    })
    public GPU_manufacturer: GPUManufacturer;

    @Column({
        name: 'graphics_coprocessor',
        type: 'text',
        nullable: false
    })
    @MaxLength(30)
    @MinLength(1)
    @IsNotEmpty()
    public graphics_coprocessor: string;

    @Column({
        name: 'frequency_OC_Mode_MHz',
        type: 'smallint',
        nullable: false
    })
    @Max(5000)
    @Min(1000)
    @IsNotEmpty()
    public frequency_OC_Mode_MHz: number;

    @Column({
        name: 'frequency_Gaming_Mode_MHz',
        type: 'smallint',
        nullable: false
    })
    @Max(5000)
    @Min(1000)
    @IsNotEmpty()
    public frequency_Gaming_Mode_MHz: number;

    @Column({
        name: 'memory_clock_speed',
        type: 'smallint',
        nullable: false
    })
    @Max(30000)
    @Min(100)
    @IsNotEmpty()
    public memory_clock_speed: number;

    @Column({
        name: 'graphics_ram',
        type: 'enum',
        enum: GraphicsRam,
        nullable: false
    })
    public graphics_ram: GraphicsRam;

    @Column({
        name: 'graphics_ram_size_Gb',
        type: 'enum',
        enum: GraphicsRamSize,
        nullable: false
    })
    public graphics_ram_size_Gb: GraphicsRamSize;

    @Column({
        name: 'memory_bus_width_bit',
        type: 'smallint',
        nullable: false
    })
    @Max(512)
    @Min(1)
    @IsNotEmpty()
    public memory_bus_width_bit: number;

    @Column({
        name: 'memory_bandwidth_Gb',
        type: 'smallint',
        nullable: false
    })
    @Max(2000)
    @Min(100)
    @IsNotEmpty()
    public memory_bandwidth_Gb: number;

    @Column({
        name: 'count_universal_processors',
        type: 'smallint',
        nullable: false
    })
    @Max(25000)
    @Min(100)
    @IsNotEmpty()
    public count_universal_processors: number;

    @Column({
        name: 'technologies',
        type: 'enum',
        array: true,
        default: [],
        enum: Technologies,
        nullable: false
    })
    public technologies: Technologies[];

    @Column({
        name: 'supported_APIs',
        type: 'text',
        nullable: false
    })
    @MaxLength(255)
    @MinLength(10)
    @IsNotEmpty()
    public supported_APIs: string;

    @Column({
        name: 'supported_Multi_GPU',
        type: 'enum',
        enum: SupportedMulti_GPU,
        nullable: true
    })
    public supported_Multi_GPU: SupportedMulti_GPU;

    @Column({
        name: 'connection_interface',
        type: 'text',
        nullable: false
    })
    @MaxLength(30)
    @MinLength(1)
    @IsNotEmpty()
    public connection_interface: string;

    @Column({
        name: 'count_supported_monitors',
        type: 'smallint',
        nullable: false
    })
    @Max(8)
    @Min(1)
    @IsNotEmpty()
    public count_supported_monitors: number;

    @Column({
        name: 'connectors',
        type: 'enum',
        array: true,
        default: [],
        enum: Connectors,
        nullable: false
    })
    public connectors: Connectors[];

    @Column({
        name: 'maximum_resolution',
        type: 'text',
        nullable: false
    })
    @MaxLength(100)
    @MinLength(1)
    @IsNotEmpty()
    public maximum_resolution: string;

    @Column({
        name: 'cooling',
        type: 'enum',
        array: true,
        default: [],
        enum: Cooling,
        nullable: false
    })
    public cooling: Cooling[];

    @Column({
        name: 'power_connectors',
        type: 'enum',
        enum: PowerConnectors,
        nullable: false
    })
    public power_connectors: PowerConnectors;

    @Column({
        name: 'backlight',
        type: 'boolean',
        nullable: false
    })
    @IsNotEmpty()
    public backlight: boolean;

    @Column({
        name: 'minimum_power_supply_capacity_wt',
        type: 'smallint',
        nullable: false
    })
    @Max(2000)
    @Min(200)
    @IsNotEmpty()
    public minimum_power_supply_capacity_wt: number;

    @Column({
        name: 'count_occupied_expansion_slots',
        type: 'double precision',
        nullable: false
    })
    @Max(8)
    @Min(1)
    @IsNotEmpty()
    public count_occupied_expansion_slots: number;

    @Column({
        name: 'more',
        type: 'text',
        nullable: true
    })
    @MaxLength(455)
    @MinLength(6)
    public more: string;

    @Column({
        name: 'power_unit_length_mm',
        type: 'double precision',
        nullable: true
    })
    @Max(50)
    @Min(0)
    public GPU_length_cm: number;

    @Column({
        name: 'packege',
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
        default: 60000
    })
    @Max(2000000)
    @Min(60000)
    @IsNotEmpty()
    public price: number;
}
