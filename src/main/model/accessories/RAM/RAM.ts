import { IsNotEmpty, Max, Min } from 'class-validator';
import { Column, Entity } from 'typeorm';

import { MemoryType, RamPackage, ramMaker } from './RAMEnums';
import { BaseAccessory } from '../BaseAccessory';

@Entity()
export class RAM extends BaseAccessory {
    constructor(maker: string, model: string, memory_type: string, memory_Gb: number) {
        super();
        this.name = `${maker} ${model} ${memory_type} ${memory_Gb}`;
    }

    @Column({ type: 'enum', enum: ramMaker })
    maker: ramMaker;

    @Column({ type: 'enum', enum: MemoryType })
    memory_type: MemoryType;

    @Column({
        name: 'memory_Gb',
        type: 'smallint',
        nullable: false
    })
    @Max(512)
    @Min(1)
    @IsNotEmpty()
    memory_Gb: number;

    @Column({
        name: 'memory_clock_MHz',
        type: 'smallint',
        nullable: false
    })
    @Max(10000)
    @Min(1)
    @IsNotEmpty()
    memory_clock_MHz: number;

    @Column({
        name: 'number_transactions',
        type: 'smallint',
        nullable: false
    })
    @Max(10000)
    @Min(1)
    @IsNotEmpty()
    number_transactions: number;

    @Column({
        name: 'supply_voltage',
        type: 'double precision',
        nullable: false
    })
    @Max(10)
    @Min(0.5)
    @IsNotEmpty()
    supply_voltage: number;

    @Column({
        name: 'timings',
        type: 'smallint',
        array: true,
        default: [],
        nullable: false
    })
    @Max(100)
    @Min(1)
    @IsNotEmpty()
    timings: number[];

    @Column({
        name: 'peculiarities',
        type: 'text',
        nullable: true
    })
    @IsNotEmpty()
    peculiarities: string;

    @Column({
        name: 'more',
        type: 'text',
        nullable: true
    })
    more: string;

    @Column({ type: 'enum', enum: RamPackage, default: RamPackage.BOX })
    @IsNotEmpty()
    package: RamPackage;

    @Column({
        name: 'ram_height_cm',
        type: 'double precision',
        nullable: false
    })
    @Max(15)
    @Min(1)
    @IsNotEmpty()
    ram_height_cm: number;
}
