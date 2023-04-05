import { Column, Entity, JoinColumn, OneToMany } from 'typeorm';
import { BaseAccessory } from '../BaseAccessory';
import { IsNotEmpty, Max, MaxLength, Min, MinLength } from 'class-validator';
import {
    AvailabilityPFT,
    ComplianceMarking,
    FormFactor,
    MPC,
    Package,
    PowerUnitMaker,
    SVCCS
} from './PowerUnitEnum';
import { Product } from 'model/product/Product';

@Entity()
export class PowerUnit extends BaseAccessory {
    constructor(maker: string, model: string, form_factor: FormFactor, power: number) {
        super();
        this.name = `${maker},${model},${form_factor},${power}`;
    }

    @Column({ name: 'maker', type: 'enum', enum: PowerUnitMaker, nullable: false })
    public maker: PowerUnitMaker;

    @Column({ name: 'form_factor', type: 'enum', enum: FormFactor, nullable: false })
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
        name: 'compliance_with_standard',
        type: 'enum',
        enum: ComplianceMarking,
        nullable: true
    })
    @IsNotEmpty()
    public compliance_with_standard: ComplianceMarking;

    @Column({
        name: 'KPD',
        type: 'text',
        nullable: false
    })
    @MaxLength(200)
    @MinLength(1)
    @IsNotEmpty()
    public KPD: string;

    @Column({
        name: 'motherboard_power_connectors',
        type: 'enum',
        array: true,
        default: [],
        enum: MPC,
        nullable: false
    })
    public motherboard_power_connectors: MPC[];

    @Column({
        name: 'support_video_card_connection_schemas',
        type: 'enum',
        array: true,
        default: [],
        enum: SVCCS,
        nullable: false
    })
    public support_video_card_connection_schemas: SVCCS[];

    @Column({
        name: 'count_PCI_E_connectors_2pin',
        type: 'smallint',
        nullable: false
    })
    @Max(10)
    @Min(1)
    @IsNotEmpty()
    public count_PCI_E_connectors_2pin: number;

    @Column({
        name: 'count_PCI_E_connectors_6pin',
        type: 'smallint',
        nullable: false
    })
    @Max(10)
    @Min(1)
    @IsNotEmpty()
    public count_PCI_E_connectors_6pin: number;

    @Column({
        name: 'count_PCI_E_connectors_16pin',
        type: 'smallint',
        nullable: false
    })
    @Max(2)
    @Min(1)
    @IsNotEmpty()
    public count_PCI_E_connectors_16pin: number;

    @Column({
        name: 'count_Molex_connectors_4pin',
        type: 'smallint',
        nullable: false
    })
    @Max(8)
    @Min(1)
    @IsNotEmpty()
    public count_Molex_connectors_4pin: number;

    @Column({
        name: 'count_SATA_connectors',
        type: 'smallint',
        nullable: false
    })
    @Max(14)
    @Min(1)
    @IsNotEmpty()
    public count_SATA_connectors: number;

    @Column({
        name: 'cables',
        type: 'text',
        nullable: true
    })
    public cables: string;

    @Column({
        name: 'input_voltage_range_w',
        type: 'smallint',
        array: true,
        default: [],
        nullable: false
    })
    @MaxLength(300)
    @MinLength(1)
    @IsNotEmpty()
    public input_voltage_range_w: number[];

    @Column({
        name: 'input_frequency_hz',
        type: 'smallint',
        array: true,
        default: [],
        nullable: false
    })
    @Max(100)
    @Min(1)
    @IsNotEmpty()
    public input_frequency_hz: number[];

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
    @MaxLength(255)
    @MinLength(6)
    public fan_bearing_type: string;

    @Column({
        name: 'complement',
        type: 'text',
        nullable: false
    })
    @IsNotEmpty()
    public complement: string;

    @Column({
        name: 'peculiarities',
        type: 'text',
        nullable: true
    })
    @MaxLength(255)
    @MinLength(6)
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
    @MaxLength(455)
    @MinLength(6)
    public more: string;

    @Column({
        name: 'power_unit_length_mm',
        type: 'double precision',
        nullable: true
    })
    @Max(250)
    @Min(0)
    public power_unit_length_mm: number;

    @Column({
        name: 'size_volume_cm',
        type: 'text',
        nullable: true
    })
    @MaxLength(100)
    @MinLength(6)
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

    @Column({
        name: 'price',
        type: 'numeric',
        nullable: false,
        default: 10000
    })
    @Max(500000)
    @Min(10000)
    @IsNotEmpty()
    public price: number;

    @JoinColumn({ name: 'product' })
    @OneToMany(() => Product, (p: Product) => p.power_unit, {
        nullable: true
    })
    public products: Product[];
}
