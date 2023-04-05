import { Column, Entity } from 'typeorm';
import { BaseAccessory } from '../BaseAccessory';
import { IsNotEmpty, Max, Min } from 'class-validator';
import { AvailabilityPFT, FormFactor, PCMF, Package, PowerUnitMaker, SVCS } from './PowerUnitEnum';

@Entity()
export class PowerUnit extends BaseAccessory {
    constructor(maker: string, model: string, form_factor: FormFactor, power: number) {
        super();
        this.name = `${maker},${model},${form_factor},${power}`;
    }

    @Column({ type: 'enum', enum: PowerUnitMaker })
    public maker: PowerUnitMaker;

    @Column({ type: 'enum', enum: FormFactor })
    public form_factor: FormFactor;

    @Column({
        name: 'power',
        type: 'smallint',
        nullable: false
    })
    @Max(1600)
    @Min(100)
    @IsNotEmpty()
    public power: number;

    @Column({
        name: 'PFC',
        type: 'enum',
        enum: AvailabilityPFT
    })
    public PFC: AvailabilityPFT;

    @Column({
        name: 'compliance',
        type: 'text',
        nullable: false
    })
    @IsNotEmpty()
    public compliance: string;

    @Column({
        name: 'KPD',
        type: 'smallint',
        nullable: false
    })
    @IsNotEmpty()
    public KPD: number;

    @Column({
        name: 'power_connectors_matFees',
        type: 'enum',
        enum: PCMF
    })
    public power_connectors_matFees: PCMF;

    @Column({
        name: 'support_video_card_connection_schemes',
        type: 'enum',
        enum: SVCS
    })
    public support_video_card_connection_schemes: SVCS;

    @Column({
        name: 'number_PCI_E_connectors_2pin',
        type: 'smallint',
        nullable: false
    })
    @Max(10)
    @Min(1)
    @IsNotEmpty()
    public number_PCI_E_connectors_2pin: number;

    @Column({
        name: 'number_PCI_E_connectors_6pin',
        type: 'smallint',
        nullable: false
    })
    @Max(10)
    @Min(1)
    @IsNotEmpty()
    public number_PCI_E_connectors_6pin: number;

    @Column({
        name: 'number_PCI_E_connectors_16pin',
        type: 'smallint',
        nullable: false
    })
    @Max(2)
    @Min(1)
    @IsNotEmpty()
    public number_PCI_E_connectors_16pin: number;

    @Column({
        name: 'number_Molex_connectors_4pin',
        type: 'smallint',
        nullable: false
    })
    @Max(8)
    @Min(1)
    @IsNotEmpty()
    public number_Molex_connectors_4pin: number;

    @Column({
        name: 'number_SATA_connectors',
        type: 'smallint',
        nullable: false
    })
    @Max(14)
    @Min(1)
    @IsNotEmpty()
    public number_SATA_connectors: number;

    @Column({
        name: 'cable_length_cm',
        type: 'text',
        nullable: true
    })
    public cable_length_cm: string;

    @Column({
        name: 'input_voltage_B',
        type: 'smallint',
        nullable: false
    })
    @Max(300)
    @Min(1)
    @IsNotEmpty()
    public input_voltage_B: number;

    @Column({
        name: 'input_frequency_Hz',
        type: 'smallint',
        nullable: false
    })
    @Max(100)
    @Min(1)
    @IsNotEmpty()
    public input_frequency_Hz: number;

    @Column({
        name: 'line_output_current_3_3V_A',
        type: 'smallint',
        nullable: false
    })
    @Max(100)
    @Min(1)
    @IsNotEmpty()
    public line_output_current_3_3V_A: number;

    @Column({
        name: 'line_output_current_5V_A',
        type: 'smallint',
        nullable: false
    })
    @Max(100)
    @Min(1)
    @IsNotEmpty()
    public line_output_current_5V_A: number;

    @Column({
        name: 'line_output_current_12V_A',
        type: 'smallint',
        nullable: false
    })
    @Max(100)
    @Min(1)
    @IsNotEmpty()
    public line_output_current_12V_A: number;

    @Column({
        name: 'fan_size_cm',
        type: 'double precision',
        nullable: false
    })
    @Max(20)
    @Min(1)
    @IsNotEmpty()
    public fan_size_cm: number;

    @Column({
        name: 'fan_bearing_type',
        type: 'text',
        nullable: true
    })
    public fan_bearing_type: string;

    @Column({
        name: 'included',
        type: 'text',
        nullable: false
    })
    @IsNotEmpty()
    public included: string;

    @Column({
        name: 'peculiarities',
        type: 'text',
        nullable: true
    })
    public peculiarities: string;

    @Column({
        name: 'protection_systems',
        type: 'text',
        nullable: false
    })
    @IsNotEmpty()
    public protection_systems: string;

    @Column({
        name: 'more',
        type: 'text',
        nullable: true
    })
    public more: string;

    @Column({
        name: 'power_unit_length_mm',
        type: 'double precision',
        nullable: true
    })
    @Max(30)
    @Min(0)
    public power_unit_length_mm: number;

    @Column({
        name: 'size_volume_cm',
        type: 'text',
        nullable: true
    })
    public size_volume_cm: string;

    @Column({
        name: 'weight_Kg',
        type: 'double precision',
        nullable: false
    })
    @Max(5)
    @Min(1)
    @IsNotEmpty()
    public weight_Kg: number;

    @Column({
        name: 'packege',
        type: 'enum',
        enum: Package,
        default: Package.RTL
    })
    @IsNotEmpty()
    public package: Package;
}
