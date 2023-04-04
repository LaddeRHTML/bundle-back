import { Column, Entity } from 'typeorm';
import { BaseAccessory } from '../BaseAccessory';
import { FormFactor, MotherboardMaker } from './MotherboardEnums';
import { IsNotEmpty, Max, MaxLength, Min, MinLength } from 'class-validator';
import { CPUSocket, VideoCabel } from '../CPU/CPUEnums';

@Entity()
export class Motherboard extends BaseAccessory {
    constructor(maker: string, type: string, model: string, socket: string) {
        super();
        this.name = `${maker} ${type} ${model} ${socket}`;
    }

    @Column({ type: 'enum', enum: MotherboardMaker })
    maker: MotherboardMaker;

    @Column({
        name: 'socket',
        type: 'enum',
        nullable: false
    })
    @IsNotEmpty()
    socket: CPUSocket;

    @Column({
        name: 'microarchitecture',
        type: 'text',
        nullable: false
    })
    @IsNotEmpty()
    microarchitecture: string;

    @Column({
        name: 'chipset',
        type: 'text',
        nullable: false
    })
    @IsNotEmpty()
    chipset: string;

    @Column({
        name: 'technologies',
        type: 'text',
        nullable: false
    })
    @MaxLength(255)
    @IsNotEmpty()
    technologies: string;

    @Column({
        name: 'form_factor',
        type: 'enum',
        nullable: false
    })
    @IsNotEmpty()
    form_factor: FormFactor;

    @Column({
        name: 'form_factor',
        type: 'enum',
        nullable: false
    })
    @IsNotEmpty()
    supported_: FormFactor;

    @Column({
        name: 'supported_memory_frequencies',
        type: 'smallint',
        array: true,
        default: [],
        nullable: false
    })
    @IsNotEmpty()
    supported_memory_frequencies: number[];

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
        name: 'max_sata_count',
        type: 'smallint',
        nullable: false
    })
    @Max(8)
    @Min(1)
    @IsNotEmpty()
    max_sata_count: number;

    @Column({
        name: 'connectors_for_ssd',
        type: 'smallint',
        nullable: false
    })
    @Max(5)
    @Min(0)
    @IsNotEmpty()
    connectors_for_ssd: number;

    @Column({
        name: 'interface_m2_slot',
        type: 'text',
        nullable: true
    })
    @MaxLength(255)
    @MinLength(1)
    @IsNotEmpty()
    interface_m2_slot: string;

    @Column({
        name: 'pci_express_x16_count',
        type: 'smallint',
        nullable: true
    })
    @Max(4)
    @Min(1)
    pci_express_x16_count: number;

    @Column({
        name: 'pci_express_x1_count',
        type: 'smallint',
        nullable: true
    })
    @Max(4)
    @Min(1)
    pci_express_x1_count: number;

    @Column({
        name: 'pci_express_standard',
        type: 'smallint',
        nullable: true
    })
    @Max(6)
    @Min(1)
    pci_express_standard: number;

    @Column({
        name: 'pci_express_workflow',
        type: 'text',
        nullable: true
    })
    @MaxLength(255)
    @MinLength(1)
    pci_express_workflow: string;

    @Column({
        name: 'audiocodec',
        type: 'text',
        nullable: false
    })
    @MaxLength(35)
    @MinLength(1)
    audiocodec: string;

    @Column({
        name: 'channel_count',
        type: 'smallint',
        nullable: false
    })
    @Max(8)
    @Min(1)
    channel_count: number;

    @Column({
        name: 'video_cabel_type',
        type: 'enum',
        array: true,
        default: [],
        nullable: true
    })
    video_cabel_type: VideoCabel;

    @Column({
        name: 'power_connectors',
        type: 'text',
        nullable: false
    })
    @MaxLength(55)
    @MinLength(1)
    power_connectors: string;

    @Column({
        name: 'backpanel_connectors',
        type: 'text',
        nullable: false
    })
    @MaxLength(255)
    @MinLength(1)
    backpanel_connectors: string;

    @Column({
        name: 'usb_31_gen2',
        type: 'smallint',
        nullable: false
    })
    @Max(10)
    @Min(1)
    usb_31_gen2: number;

    @Column({
        name: 'usb_31_gen2_type_c',
        type: 'smallint',
        nullable: false
    })
    @Max(2)
    @Min(1)
    usb_31_gen2_type_c: number;

    @Column({
        name: 'usb_31_gen2x2_type_c',
        type: 'smallint',
        nullable: false
    })
    @Max(2)
    @Min(1)
    usb_31_gen2x2_type_c: number;

    @Column({
        name: 'included_buttons',
        type: 'text',
        nullable: true
    })
    @MaxLength(255)
    @MinLength(1)
    included_buttons: string;

    @Column({
        name: 'network_controller',
        type: 'text',
        nullable: false
    })
    @MaxLength(50)
    @MinLength(1)
    network_controller: string;

    @Column({
        name: 'network_communications',
        type: 'text',
        nullable: false
    })
    @MaxLength(100)
    @MinLength(1)
    network_communications: string;

    @Column({
        name: 'bios',
        type: 'text',
        nullable: false
    })
    @MaxLength(100)
    @MinLength(1)
    bios: string;

    @Column({
        name: 'more',
        type: 'text',
        nullable: true
    })
    more: string;
}
