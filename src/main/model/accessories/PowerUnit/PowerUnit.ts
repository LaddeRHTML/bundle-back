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
    maker: PowerUnitMaker;

    @Column({ type: 'enum', enum: FormFactor })
    form_factor: FormFactor;

    @Column({
        name: 'power',
        type: 'smallint',
        nullable: false
    })
    @Max(1600)
    @Min(100)
    @IsNotEmpty()
    power: number;

    @Column({ type: 'enum', enum: AvailabilityPFT })
    PFC: AvailabilityPFT;

    @Column({
        name: 'compliance',
        type: 'text',
        nullable: false
    })
    @IsNotEmpty()
    compliance: string;

    @Column({
        name: 'KPD',
        type: 'smallint',
        nullable: false
    })
    @IsNotEmpty()
    KPD: number;

    @Column({ type: 'enum', enum: PCMF })
    power_connectors_matFees: PCMF;

    @Column({ type: 'enum', enum: SVCS })
    support_video_card_connection_schemes: SVCS;

    @Column({
        name: 'number_PCI_E_connectors_2pin',
        type: 'smallint',
        nullable: false
    })
    @Max(10)
    @Min(1)
    @IsNotEmpty()
    number_PCI_E_connectors_2pin: number;

    @Column({
        name: 'number_PCI_E_connectors_6pin',
        type: 'smallint',
        nullable: false
    })
    @Max(10)
    @Min(1)
    @IsNotEmpty()
    number_PCI_E_connectors_6pin: number;

    @Column({
        name: 'number_PCI_E_connectors_16pin',
        type: 'smallint',
        nullable: false
    })
    @Max(2)
    @Min(1)
    @IsNotEmpty()
    number_PCI_E_connectors_16pin: number;

    @Column({
        name: 'number_Molex_connectors_4pin',
        type: 'smallint',
        nullable: false
    })
    @Max(8)
    @Min(1)
    @IsNotEmpty()
    number_Molex_connectors_4pin: number;

    @Column({
        name: 'number_SATA_connectors',
        type: 'smallint',
        nullable: false
    })
    @Max(14)
    @Min(1)
    @IsNotEmpty()
    number_SATA_connectors: number;

    @Column({
        name: 'input_voltage_B',
        type: 'smallint',
        nullable: false
    })
    @Max(300)
    @Min(1)
    @IsNotEmpty()
    input_voltage_B: number;

    @Column({
        name: 'input_frequency_Hz',
        type: 'smallint',
        nullable: false
    })
    @Max(100)
    @Min(1)
    @IsNotEmpty()
    input_frequency_Hz: number;

    @Column({
        name: 'line_output_current_3_3V_A',
        type: 'smallint',
        nullable: false
    })
    @Max(100)
    @Min(1)
    @IsNotEmpty()
    line_output_current_3_3V_A: number;

    @Column({
        name: 'line_output_current_5V_A',
        type: 'smallint',
        nullable: false
    })
    @Max(100)
    @Min(1)
    @IsNotEmpty()
    line_output_current_5V_A: number;

    @Column({
        name: 'line_output_current_12V_A',
        type: 'smallint',
        nullable: false
    })
    @Max(100)
    @Min(1)
    @IsNotEmpty()
    line_output_current_12V_A: number;

    @Column({
        name: 'fan_size',
        type: 'double precision',
        nullable: false
    })
    @Max(20)
    @Min(1)
    @IsNotEmpty()
    fan_size_cm: number;

    @Column({
        name: 'fan_bearing_type',
        type: 'text',
        nullable: false
    })
    @IsNotEmpty()
    fan_bearing_type: string;

    @Column({
        name: 'included',
        type: 'text',
        nullable: false
    })
    @IsNotEmpty()
    included: string;

    @Column({
        name: 'peculiarities',
        type: 'text',
        nullable: false
    })
    @IsNotEmpty()
    peculiarities: string;

    @Column({
        name: 'protection_systems',
        type: 'text',
        nullable: false
    })
    @IsNotEmpty()
    protection_systems: string;

    @Column({
        name: 'more',
        type: 'text',
        nullable: true
    })
    more: string;

    @Column({
        name: 'power_unit_length_mm',
        type: 'double precision',
        nullable: false
    })
    @Max(30)
    @Min(0)
    @IsNotEmpty()
    power_unit_length_mm: number;

    @Column({
        name: 'size',
        type: 'double precision',
        nullable: false
    })
    @Max(30)
    @Min(0)
    @IsNotEmpty()
    size: number;

    @Column({
        name: 'weight',
        type: 'double precision',
        nullable: false
    })
    @Max(5)
    @Min(1)
    @IsNotEmpty()
    weight: number;

    @Column({ type: 'enum', enum: Package, default: Package.RTL })
    @IsNotEmpty()
    package: Package;
}
