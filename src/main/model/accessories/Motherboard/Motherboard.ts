import { ApiProperty, ApiTags } from '@nestjs/swagger';

import { Column, Entity, JoinColumn, OneToMany } from 'typeorm';
import { IsNotEmpty, Max, MaxLength, Min, MinLength } from 'class-validator';
import { Product } from 'model/product/Product';

import { BaseAccessory } from '../BaseAccessory';
import { FormFactor, MotherboardMaker } from './MotherboardEnums';
import { CPUSocket, VideoCabel } from '../CPU/CPUEnums';

@ApiTags('Motherboard')
@Entity('motherboard')
export class Motherboard extends BaseAccessory {
    constructor(maker: string, model: string, socket: CPUSocket) {
        super();
        this.name = `Motherboard ${maker} ${model}, ${socket}`;
    }

    @ApiProperty({
        name: 'maker',
        type: 'enum',
        enum: MotherboardMaker,
        required: true,
        nullable: false
    })
    @Column({
        name: 'maker',
        type: 'enum',
        enum: MotherboardMaker,
        nullable: false
    })
    public maker: MotherboardMaker;

    @ApiProperty({
        name: 'socket',
        enum: CPUSocket,
        type: 'enum',
        required: true,
        nullable: false
    })
    @Column({
        name: 'socket',
        enum: CPUSocket,
        type: 'enum',
        nullable: false
    })
    @IsNotEmpty()
    public socket: CPUSocket;

    @ApiProperty({
        name: 'microarchitecture',
        type: 'text',
        maximum: 30,
        minimum: 0,
        required: true,
        nullable: false
    })
    @Column({
        name: 'microarchitecture',
        type: 'text',
        nullable: false
    })
    @MaxLength(30)
    @MinLength(0)
    @IsNotEmpty()
    public microarchitecture: string;

    @ApiProperty({
        name: 'chipset',
        type: 'text',
        maximum: 30,
        minimum: 0,
        required: true,
        nullable: false
    })
    @Column({
        name: 'chipset',
        type: 'text',
        nullable: false
    })
    @MaxLength(30)
    @MinLength(0)
    @IsNotEmpty()
    public chipset: string;

    @ApiProperty({
        name: 'technologies',
        type: 'text',
        maximum: 255,
        minimum: 6,
        required: false,
        nullable: true
    })
    @Column({
        name: 'technologies',
        type: 'text',
        nullable: true
    })
    @MaxLength(255)
    @MinLength(6)
    @IsNotEmpty()
    public technologies: string;

    @ApiProperty({
        name: 'formFactor',
        enum: FormFactor,
        type: 'enum',
        required: true,
        nullable: false
    })
    @Column({
        name: 'form_factor',
        enum: FormFactor,
        type: 'enum',
        nullable: false
    })
    @IsNotEmpty()
    public formFactor: FormFactor;

    @ApiProperty({
        name: 'supportedMemoryFrequencies',
        type: 'smallint',
        isArray: true,
        default: [],
        required: true,
        nullable: false
    })
    @Column({
        name: 'supported_memory_frequencies',
        type: 'smallint',
        array: true,
        default: [],
        nullable: false
    })
    @IsNotEmpty()
    public supportedMemoryFrequencies: number[];

    @ApiProperty({
        name: 'memorySlotsCount',
        type: 'smallint',
        maximum: 8,
        minimum: 2,
        required: false,
        nullable: true
    })
    @Column({
        name: 'memory_slots_count',
        type: 'smallint',
        nullable: true
    })
    @MaxLength(8)
    @MinLength(2)
    public memorySlotsCount: number;

    @ApiProperty({
        name: 'maxRamGb',
        type: 'smallint',
        maximum: 256,
        minimum: 1,
        required: true,
        nullable: false
    })
    @Column({
        name: 'max_ram_gb',
        type: 'smallint',
        nullable: false
    })
    @Max(256)
    @Min(1)
    @IsNotEmpty()
    public maxRamGb: number;

    @ApiProperty({
        name: 'maxSataCount',
        type: 'smallint',
        maximum: 8,
        minimum: 1,
        required: true,
        nullable: false
    })
    @Column({
        name: 'max_sata_count',
        type: 'smallint',
        nullable: false
    })
    @Max(8)
    @Min(1)
    @IsNotEmpty()
    public maxSataCount: number;

    @ApiProperty({
        name: 'connectorsForSSD',
        type: 'smallint',
        maximum: 5,
        minimum: 0,
        required: true,
        nullable: false
    })
    @Column({
        name: 'connectors_for_ssd',
        type: 'smallint',
        nullable: false
    })
    @Max(5)
    @Min(0)
    @IsNotEmpty()
    public connectorsForSSD: number;

    @ApiProperty({
        name: 'interfaceM2Slot',
        type: 'text',
        maximum: 255,
        minimum: 1,
        required: false,
        nullable: true
    })
    @Column({
        name: 'interface_m2_slot',
        type: 'text',
        nullable: true
    })
    @MaxLength(255)
    @MinLength(1)
    public interfaceM2Slot: string;

    @ApiProperty({
        name: 'pciExpressx16Count',
        type: 'smallint',
        maximum: 4,
        minimum: 1,
        required: false,
        nullable: true
    })
    @Column({
        name: 'pci_express_x16_count',
        type: 'smallint',
        nullable: true
    })
    @Max(4)
    @Min(1)
    public pciExpressx16Count: number;

    @ApiProperty({
        name: 'pciExpressx1Count',
        type: 'smallint',
        maximum: 4,
        minimum: 1,
        required: false,
        nullable: true
    })
    @Column({
        name: 'pci_express_x1_count',
        type: 'smallint',
        nullable: true
    })
    @Max(4)
    @Min(1)
    public pciExpressx1Count: number;

    @ApiProperty({
        name: 'pciExpressStandard',
        type: 'smallint',
        maximum: 6,
        minimum: 1,
        required: false,
        nullable: true
    })
    @Column({
        name: 'pci_express_standard',
        type: 'smallint',
        nullable: true
    })
    @Max(6)
    @Min(1)
    public pciExpressStandard: number;

    @ApiProperty({
        name: 'pciExpressWorkflow',
        type: 'text',
        maximum: 255,
        minimum: 1,
        required: false,
        nullable: true
    })
    @Column({
        name: 'pci_express_workflow',
        type: 'text',
        nullable: true
    })
    @MaxLength(255)
    @MinLength(1)
    public pciExpressWorkflow: string;

    @ApiProperty({
        name: 'audiocodec',
        type: 'text',
        maximum: 35,
        minimum: 1,
        required: true,
        nullable: false
    })
    @Column({
        name: 'audiocodec',
        type: 'text',
        nullable: false
    })
    @MaxLength(35)
    @MinLength(1)
    @IsNotEmpty()
    public audiocodec: string;

    @ApiProperty({
        name: 'channelCount',
        type: 'smallint',
        maximum: 8,
        minimum: 1,
        required: true,
        nullable: false
    })
    @Column({
        name: 'channel_count',
        type: 'smallint',
        nullable: false
    })
    @Max(8)
    @Min(1)
    @IsNotEmpty()
    public channelCount: number;

    @ApiProperty({
        name: 'videoCabelType',
        enum: VideoCabel,
        type: 'enum',
        isArray: true,
        default: [],
        required: false,
        nullable: true
    })
    @Column({
        name: 'video_cabel_type',
        enum: VideoCabel,
        type: 'enum',
        array: true,
        default: [],
        nullable: true
    })
    public videoCabelType: VideoCabel[];

    @ApiProperty({
        name: 'internalConnectors',
        type: 'text',
        maximum: 550,
        minimum: 1,
        required: false,
        nullable: true
    })
    @Column({
        name: 'internal_connectors',
        type: 'text',
        nullable: true
    })
    @MaxLength(550)
    @MinLength(1)
    public internalConnectors: string;

    @ApiProperty({
        name: 'powerConnectors',
        type: 'text',
        maximum: 55,
        minimum: 1,
        required: true,
        nullable: true
    })
    @Column({
        name: 'power_connectors',
        type: 'text',
        nullable: false
    })
    @MaxLength(55)
    @MinLength(1)
    @IsNotEmpty()
    public powerConnectors: string;

    @ApiProperty({
        name: 'backpanelConnectors',
        type: 'text',
        maximum: 255,
        minimum: 1,
        required: false,
        nullable: true
    })
    @Column({
        name: 'backpanel_connectors',
        type: 'text',
        nullable: true
    })
    @MaxLength(255)
    @MinLength(1)
    @IsNotEmpty()
    public backpanelConnectors: string;

    @ApiProperty({
        name: 'usb30',
        type: 'smallint',
        maximum: 10,
        minimum: 1,
        required: false,
        nullable: true
    })
    @Column({
        name: 'usb_30',
        type: 'smallint',
        nullable: true
    })
    @Max(10)
    @Min(1)
    @IsNotEmpty()
    public usb30: number;

    @ApiProperty({
        name: 'usb31Gen1',
        type: 'smallint',
        maximum: 10,
        minimum: 1,
        required: false,
        nullable: true
    })
    @Column({
        name: 'usb_31_gen1',
        type: 'smallint',
        nullable: true
    })
    @Max(10)
    @Min(1)
    @IsNotEmpty()
    public usb31Gen1: number;

    @ApiProperty({
        name: 'usb31Gen2',
        type: 'smallint',
        maximum: 10,
        minimum: 1,
        required: false,
        nullable: true
    })
    @Column({
        name: 'usb_31_gen2',
        type: 'smallint',
        nullable: true
    })
    @Max(10)
    @Min(1)
    @IsNotEmpty()
    public usb31Gen2: number;

    @ApiProperty({
        name: 'usb31Gen2TypeC',
        type: 'smallint',
        maximum: 2,
        minimum: 1,
        required: false,
        nullable: true
    })
    @Column({
        name: 'usb_31_gen2_type_c',
        type: 'smallint',
        nullable: true
    })
    @Max(2)
    @Min(1)
    @IsNotEmpty()
    public usb31Gen2TypeC: number;

    @ApiProperty({
        name: 'usb32Gen2x2TypeC',
        type: 'smallint',
        maximum: 2,
        minimum: 1,
        required: false,
        nullable: true
    })
    @Column({
        name: 'usb_31_gen2x2_type_c',
        type: 'smallint',
        nullable: true
    })
    @Max(2)
    @Min(1)
    @IsNotEmpty()
    public usb32Gen2x2TypeC: number;

    @ApiProperty({
        name: 'usb32Gen1',
        type: 'smallint',
        maximum: 10,
        minimum: 1,
        required: false,
        nullable: true
    })
    @Column({
        name: 'usb_32_gen1',
        type: 'smallint',
        nullable: true
    })
    @Max(10)
    @Min(1)
    @IsNotEmpty()
    public usb32Gen1: number;

    @ApiProperty({
        name: 'includedButtons',
        type: 'text',
        maximum: 255,
        minimum: 1,
        required: false,
        nullable: true
    })
    @Column({
        name: 'included_buttons',
        type: 'text',
        nullable: true
    })
    @MaxLength(255)
    @MinLength(1)
    public includedButtons: string;

    @ApiProperty({
        name: 'networkController',
        type: 'text',
        maximum: 50,
        minimum: 1,
        required: true,
        nullable: false
    })
    @Column({
        name: 'network_controller',
        type: 'text',
        nullable: false
    })
    @MaxLength(50)
    @MinLength(1)
    public networkController: string;

    @ApiProperty({
        name: 'networkCommunications',
        type: 'text',
        maximum: 100,
        minimum: 1,
        required: false,
        nullable: true
    })
    @Column({
        name: 'network_communications',
        type: 'text',
        nullable: true
    })
    @MaxLength(100)
    @MinLength(1)
    @IsNotEmpty()
    public networkCommunications: string;

    @ApiProperty({
        name: 'bios',
        type: 'text',
        maximum: 100,
        minimum: 1,
        required: true,
        nullable: false
    })
    @Column({
        name: 'bios',
        type: 'text',
        nullable: false
    })
    @MaxLength(100)
    @MinLength(1)
    @IsNotEmpty()
    public bios: string;

    @ApiProperty({
        name: 'RAIDSataArray',
        type: 'double precision',
        isArray: true,
        default: [],
        maxLength: 4,
        maximum: 10,
        minimum: 1,
        required: false,
        nullable: true
    })
    @Column({
        name: 'RAID_sata_array',
        type: 'double precision',
        array: true,
        default: [],
        nullable: true
    })
    @MaxLength(4)
    @MinLength(0)
    public RAIDSataArray: [];

    @ApiProperty({
        name: 'sizeWHMm',
        type: 'text',
        maxLength: 20,
        minLength: 1,
        required: false,
        nullable: true
    })
    @Column({
        name: 'size_w_h_mm',
        type: 'text',
        nullable: true
    })
    @MaxLength(20)
    @MinLength(0)
    public sizeWHMm: string;

    @ApiProperty({
        name: 'more',
        type: 'text',
        maximum: 455,
        minimum: 1,
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
        name: 'price',
        type: 'numeric',
        maximum: 2000000,
        minimum: 6000,
        required: true,
        nullable: false
    })
    @Column({
        name: 'price',
        type: 'numeric',
        nullable: false,
        default: 6000
    })
    @Max(2000000)
    @Min(6000)
    @IsNotEmpty()
    public price: number;

    @JoinColumn({ name: 'product' })
    @OneToMany(() => Product, (p: Product) => p.motherboard, {
        nullable: true
    })
    public products: Product[];
}
