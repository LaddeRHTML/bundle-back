import { ApiProperty } from '@nestjs/swagger';

import { Column, Entity, JoinColumn, OneToMany } from 'typeorm';
import { IsNotEmpty, Max, MaxLength, Min, MinLength } from 'class-validator';

import { Product } from 'model/product/Product';
import {
    AvailabilityPFT,
    ComplianceMarking,
    FormFactor,
    MPC,
    Package,
    PowerUnitMaker,
    SVCCS
} from './PowerUnitEnum';
import { BaseAccessory } from '../BaseAccessory';
@Entity()
export class PowerUnit extends BaseAccessory {
    constructor(formFactor: FormFactor, power: number, model: string, maker: string) {
        super();
        this.name = `Power Unit ${formFactor} ${power}W ${maker} ${model}`;
    }

    @ApiProperty()
    @Column({ name: 'maker', type: 'enum', enum: PowerUnitMaker, nullable: false })
    public maker: PowerUnitMaker;

    @ApiProperty()
    @Column({ name: 'form_factor', type: 'enum', enum: FormFactor, nullable: false })
    public formFactor: FormFactor;

    @ApiProperty({
        maximum: 1600,
        minimum: 100
    })
    @Column({
        name: 'power',
        type: 'smallint',
        nullable: false
    })
    @Max(1600)
    @Min(100)
    @IsNotEmpty()
    public power: number;

    @ApiProperty()
    @Column({
        name: 'PFC',
        type: 'enum',
        enum: AvailabilityPFT
    })
    public PFC: AvailabilityPFT;

    @ApiProperty({
        required: false
    })
    @Column({
        name: 'compliance_with_standard',
        type: 'enum',
        enum: ComplianceMarking,
        nullable: true
    })
    @IsNotEmpty()
    public complianceWithStandard: ComplianceMarking;

    @ApiProperty({
        maximum: 200,
        minimum: 1
    })
    @Column({
        name: 'KPD',
        type: 'text',
        nullable: true
    })
    @MaxLength(200)
    @MinLength(1)
    public KPD: string;

    @ApiProperty()
    @Column({
        name: 'motherboard_power_connectors',
        type: 'enum',
        array: true,
        default: [],
        enum: MPC,
        nullable: false
    })
    public motherboardPowerConnectors: MPC[];

    @ApiProperty()
    @Column({
        name: 'support_video_card_connection_schemas',
        type: 'enum',
        array: true,
        default: [],
        enum: SVCCS,
        nullable: false
    })
    public supportVideoCardConnectionSchemas: SVCCS[];

    @ApiProperty({
        maximum: 10,
        minimum: 1
    })
    @Column({
        name: 'count_PCI_E_connectors_2pin',
        type: 'smallint',
        nullable: false
    })
    @Max(10)
    @Min(1)
    @IsNotEmpty()
    public countPCIEConnectors2pin: number;

    @ApiProperty({
        maximum: 10,
        minimum: 1
    })
    @Column({
        name: 'count_PCI_E_connectors_6pin',
        type: 'smallint',
        nullable: false
    })
    @Max(10)
    @Min(1)
    @IsNotEmpty()
    public countPCIEConnectors6pin: number;

    @ApiProperty({
        maximum: 2,
        minimum: 1
    })
    @Column({
        name: 'count_PCI_E_connectors_16pin',
        type: 'smallint',
        nullable: true
    })
    @Max(2)
    @Min(1)
    public countPCIEConnectors16pin: number;

    @ApiProperty({
        maximum: 8,
        minimum: 1
    })
    @Column({
        name: 'count_Molex_connectors_4pin',
        type: 'smallint',
        nullable: false
    })
    @Max(8)
    @Min(1)
    @IsNotEmpty()
    public countMolexConnectors4pin: number;

    @ApiProperty({
        maximum: 14,
        minimum: 1
    })
    @Column({
        name: 'count_SATA_connectors',
        type: 'smallint',
        nullable: false
    })
    @Max(14)
    @Min(1)
    @IsNotEmpty()
    public countSATAConnectors: number;

    @ApiProperty({
        required: false
    })
    @Column({
        name: 'cables',
        type: 'text',
        nullable: true
    })
    public cables: string;

    @ApiProperty({
        maximum: 300,
        minimum: 1
    })
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
    public inputVoltageRangeW: number[];

    @ApiProperty({
        maximum: 100,
        minimum: 1
    })
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
    public inputFrequencyHz: number[];

    @ApiProperty({
        maximum: 100,
        minimum: 1
    })
    @Column({
        name: 'line_output_current_3_3V_A',
        type: 'smallint',
        nullable: false
    })
    @Max(100)
    @Min(1)
    @IsNotEmpty()
    public lineOutputCurrent33VA: number;

    @ApiProperty({
        maximum: 100,
        minimum: 1
    })
    @Column({
        name: 'line_output_current_5V_A',
        type: 'smallint',
        nullable: false
    })
    @Max(100)
    @Min(1)
    @IsNotEmpty()
    public lineOutputCurrent5VA: number;

    @ApiProperty({
        maximum: 100,
        minimum: 1
    })
    @Column({
        name: 'line_output_current_12V_A',
        type: 'smallint',
        nullable: false
    })
    @Max(100)
    @Min(1)
    @IsNotEmpty()
    public lineOutputCurrent12VA: number;

    @ApiProperty({
        maximum: 200,
        minimum: 1
    })
    @Column({
        name: 'fan_size_mm',
        type: 'smallint',
        nullable: false
    })
    @Max(200)
    @Min(1)
    @IsNotEmpty()
    public fanSizeMm: number;

    @ApiProperty({
        maximum: 255,
        minimum: 6,
        required: false
    })
    @Column({
        name: 'fan_bearing_type',
        type: 'text',
        nullable: true
    })
    @MaxLength(255)
    @MinLength(6)
    public fanDearingType: string;

    @ApiProperty()
    @Column({
        name: 'complement',
        type: 'text',
        nullable: false
    })
    @IsNotEmpty()
    public complement: string;

    @ApiProperty({
        maximum: 255,
        minimum: 6,
        required: false
    })
    @Column({
        name: 'peculiarities',
        type: 'text',
        nullable: true
    })
    @MaxLength(255)
    @MinLength(6)
    public peculiarities: string;

    @ApiProperty()
    @Column({
        name: 'protection_systems',
        type: 'text',
        nullable: false
    })
    @IsNotEmpty()
    public protectionSystems: string;

    @ApiProperty({
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
        maximum: 500,
        minimum: 1,
        required: false
    })
    @Column({
        name: 'size_volume_mm',
        type: 'text',
        nullable: true
    })
    @MaxLength(500)
    @MinLength(6)
    public sizeVolumeMm: string;

    @ApiProperty({
        maximum: 5,
        minimum: 1
    })
    @Column({
        name: 'weight_Kg',
        type: 'double precision',
        nullable: false
    })
    @Max(5)
    @Min(1)
    @IsNotEmpty()
    public weightKg: number;

    @ApiProperty()
    @Column({
        name: 'packege',
        type: 'enum',
        enum: Package,
        default: Package.RTL
    })
    @IsNotEmpty()
    public package: Package;

    @ApiProperty({
        maximum: 500000,
        minimum: 10000,
        default: 10000
    })
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
    @OneToMany(() => Product, (p: Product) => p.powerUnit, {
        nullable: true
    })
    public products: Product[];
}
