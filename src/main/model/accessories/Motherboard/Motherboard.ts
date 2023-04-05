import { Column, Entity, JoinColumn, OneToMany } from 'typeorm';
import { BaseAccessory } from '../BaseAccessory';
import { FormFactor, MotherboardMaker } from './MotherboardEnums';
import { IsNotEmpty, Max, MaxLength, Min, MinLength } from 'class-validator';
import { CPUSocket, VideoCabel } from '../CPU/CPUEnums';
import { Product } from 'model/product/Product';

@Entity()
export class Motherboard extends BaseAccessory {
    constructor(maker: string, model: string, socket: CPUSocket) {
        super();
        this.name = `${maker} ${model} ${socket}`;
    }

    @Column({ type: 'enum', enum: MotherboardMaker })
    public maker: MotherboardMaker;

    @Column({
        name: 'socket',
        enum: CPUSocket,
        type: 'enum',
        nullable: false
    })
    @IsNotEmpty()
    public socket: CPUSocket;

    @Column({
        name: 'microarchitecture',
        type: 'text',
        nullable: false
    })
    @IsNotEmpty()
    public microarchitecture: string;

    @Column({
        name: 'chipset',
        type: 'text',
        nullable: false
    })
    @IsNotEmpty()
    public chipset: string;

    @Column({
        name: 'technologies',
        type: 'text',
        nullable: false
    })
    @MaxLength(255)
    @MinLength(6)
    @IsNotEmpty()
    public technologies: string;

    @Column({
        name: 'form_factor',
        enum: FormFactor,
        type: 'enum',
        nullable: false
    })
    @IsNotEmpty()
    public form_factor: FormFactor;

    @Column({
        name: 'supported_memory_frequencies',
        type: 'smallint',
        array: true,
        default: [],
        nullable: false
    })
    @IsNotEmpty()
    public supported_memory_frequencies: number[];

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
        name: 'max_sata_count',
        type: 'smallint',
        nullable: false
    })
    @Max(8)
    @Min(1)
    @IsNotEmpty()
    public max_sata_count: number;

    @Column({
        name: 'connectors_for_ssd',
        type: 'smallint',
        nullable: false
    })
    @Max(5)
    @Min(0)
    @IsNotEmpty()
    public connectors_for_ssd: number;

    @Column({
        name: 'interface_m2_slot',
        type: 'text',
        nullable: true
    })
    @MaxLength(255)
    @MinLength(1)
    public interface_m2_slot: string;

    @Column({
        name: 'pci_express_x16_count',
        type: 'smallint',
        nullable: true
    })
    @Max(4)
    @Min(1)
    public pci_express_x16_count: number;

    @Column({
        name: 'pci_express_x1_count',
        type: 'smallint',
        nullable: true
    })
    @Max(4)
    @Min(1)
    public pci_express_x1_count: number;

    @Column({
        name: 'pci_express_standard',
        type: 'smallint',
        nullable: true
    })
    @Max(6)
    @Min(1)
    public pci_express_standard: number;

    @Column({
        name: 'pci_express_workflow',
        type: 'text',
        nullable: true
    })
    @MaxLength(255)
    @MinLength(1)
    public pci_express_workflow: string;

    @Column({
        name: 'audiocodec',
        type: 'text',
        nullable: false
    })
    @MaxLength(35)
    @MinLength(1)
    @IsNotEmpty()
    public audiocodec: string;

    @Column({
        name: 'channel_count',
        type: 'smallint',
        nullable: false
    })
    @Max(8)
    @Min(1)
    @IsNotEmpty()
    public channel_count: number;

    @Column({
        name: 'video_cabel_type',
        enum: VideoCabel,
        type: 'enum',
        array: true,
        default: [],
        nullable: true
    })
    public video_cabel_type: VideoCabel[];

    @Column({
        name: 'power_connectors',
        type: 'text',
        nullable: false
    })
    @MaxLength(55)
    @MinLength(1)
    @IsNotEmpty()
    public power_connectors: string;

    @Column({
        name: 'backpanel_connectors',
        type: 'text',
        nullable: false
    })
    @MaxLength(255)
    @MinLength(1)
    @IsNotEmpty()
    public backpanel_connectors: string;

    @Column({
        name: 'usb_31_gen2',
        type: 'smallint',
        nullable: false
    })
    @Max(10)
    @Min(1)
    @IsNotEmpty()
    public usb_31_gen2: number;

    @Column({
        name: 'usb_31_gen2_type_c',
        type: 'smallint',
        nullable: false
    })
    @Max(2)
    @Min(1)
    @IsNotEmpty()
    public usb_31_gen2_type_c: number;

    @Column({
        name: 'usb_31_gen2x2_type_c',
        type: 'smallint',
        nullable: false
    })
    @Max(2)
    @Min(1)
    @IsNotEmpty()
    public usb_31_gen2x2_type_c: number;

    @Column({
        name: 'included_buttons',
        type: 'text',
        nullable: true
    })
    @MaxLength(255)
    @MinLength(1)
    public included_buttons: string;

    @Column({
        name: 'network_controller',
        type: 'text',
        nullable: false
    })
    @MaxLength(50)
    @MinLength(1)
    public network_controller: string;

    @Column({
        name: 'network_communications',
        type: 'text',
        nullable: false
    })
    @MaxLength(100)
    @MinLength(1)
    @IsNotEmpty()
    public network_communications: string;

    @Column({
        name: 'bios',
        type: 'text',
        nullable: false
    })
    @MaxLength(100)
    @MinLength(1)
    @IsNotEmpty()
    public bios: string;

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
