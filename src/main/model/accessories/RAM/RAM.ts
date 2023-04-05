import { IsNotEmpty, Max, Min } from 'class-validator';
import { Column, Entity, JoinColumn, OneToMany } from 'typeorm';

import { MemoryType, Package, RAMMaker } from './RAMEnums';
import { BaseAccessory } from '../BaseAccessory';
import { Product } from 'model/product/Product';

@Entity()
export class RAM extends BaseAccessory {
    constructor(maker: string, model: string, memory_type: string, memory_Gb: number) {
        super();
        this.name = `${maker} ${model} ${memory_type} ${memory_Gb}`;
    }

    @Column({ name: 'maker', type: 'enum', enum: RAMMaker })
    public maker: RAMMaker;

    @Column({ name: 'memory_type', type: 'enum', enum: MemoryType })
    public memory_type: MemoryType;

    @Column({
        name: 'memory_Gb',
        type: 'smallint',
        nullable: false
    })
    @Max(512)
    @Min(1)
    @IsNotEmpty()
    public memory_Gb: number;

    @Column({
        name: 'memory_clock_MHz',
        type: 'smallint',
        nullable: false
    })
    @Max(10000)
    @Min(1)
    @IsNotEmpty()
    public memory_clock_MHz: number;

    @Column({
        name: 'number_transactions',
        type: 'smallint',
        nullable: false
    })
    @Max(10000)
    @Min(1)
    @IsNotEmpty()
    public number_transactions: number;

    @Column({
        name: 'supply_voltage',
        type: 'double precision',
        nullable: false
    })
    @Max(10)
    @Min(0.5)
    @IsNotEmpty()
    public supply_voltage: number;

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
    public timings: number[];

    @Column({
        name: 'peculiarities',
        type: 'text',
        nullable: true
    })
    @IsNotEmpty()
    public peculiarities: string;

    @Column({
        name: 'more',
        type: 'text',
        nullable: true
    })
    public more: string;

    @Column({ type: 'enum', enum: Package, default: Package.BOX })
    @IsNotEmpty()
    public package: Package;

    @Column({
        name: 'ram_height_cm',
        type: 'double precision',
        nullable: false
    })
    @Max(15)
    @Min(1)
    @IsNotEmpty()
    public ram_height_cm: number;

    @Column({
        name: 'price',
        type: 'numeric',
        precision: 10,
        scale: 2,
        nullable: false,
        default: 6000
    })
    @Max(1000000)
    @Min(10000)
    @IsNotEmpty()
    public price: number;

    @JoinColumn({ name: 'product' })
    @OneToMany(() => Product, (p: Product) => p.RAM, {
        nullable: true
    })
    public products: Product[];
}
