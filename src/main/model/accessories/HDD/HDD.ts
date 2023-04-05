import { Max, Min, IsNotEmpty, MaxLength, MinLength } from 'class-validator';
import { Column, Entity, JoinColumn, OneToMany } from 'typeorm';
import { BaseAccessory } from '../BaseAccessory';
import { FormFactor, HDDMaker } from './HDDEnums';
import { Product } from 'model/product/Product';

@Entity()
export class HDD extends BaseAccessory {
    constructor(maker: string, disk_capacity_Gb: number, model: string, form_factor: string) {
        super();
        this.name = `${maker} ${disk_capacity_Gb} ${model} ${form_factor} `;
    }

    @Column({ name: 'maker', type: 'enum', enum: HDDMaker })
    maker: HDDMaker;

    @Column({
        name: 'line',
        type: 'text',
        nullable: true
    })
    @MaxLength(35)
    @MinLength(2)
    line: string;

    @Column({
        name: 'form_factor',
        type: 'enum',
        enum: FormFactor,
        default: FormFactor.FormFactor_3
    })
    @IsNotEmpty()
    public form_factor: FormFactor;

    @Column({
        name: 'interface',
        type: 'text',
        nullable: false
    })
    @IsNotEmpty()
    public interface: string;

    @Column({
        name: 'interface_baud_rate_Gbps',
        type: 'smallint',
        nullable: false
    })
    @Max(12)
    @Min(1)
    @IsNotEmpty()
    public interface_baud_rate_Gbps: number;

    @Column({
        name: 'disk_capacity',
        type: 'smallint',
        nullable: false
    })
    @Max(30000)
    @Min(1000)
    @IsNotEmpty()
    public disk_capacity_Gb: number;

    @Column({
        name: 'reading_speed_up_to_MB/s',
        type: 'smallint',
        nullable: true
    })
    @Max(15000)
    @Min(100)
    public reading_speed_up_to_MB: number;

    @Column({
        name: 'write_speed_up_to_MB/s',
        type: 'smallint',
        nullable: true
    })
    @Max(15000)
    @Min(100)
    public write_speed_up_to_MB: number;

    @Column({
        name: 'memory_chip_layout',
        type: 'text',
        nullable: true
    })
    public memory_chip_layout: string;

    @Column({
        name: 'total_data_volume_TBW',
        type: 'smallint',
        nullable: true
    })
    @Max(1000)
    @Min(1)
    public total_data_volume_TBW: number;

    @Column({
        name: 'buffer_mb',
        type: 'smallint',
        nullable: true
    })
    @Max(1024)
    @Min(1)
    public buffer_mb: number;

    @Column({
        name: 'spindle_speed_rpm',
        type: 'smallint',
        nullable: true
    })
    @Max(7200)
    @Min(1)
    public spindle_speed_rpm: number;

    @Column({
        name: 'noise_level_dB',
        type: 'smallint',
        nullable: false
    })
    @Max(110)
    @Min(1)
    @IsNotEmpty()
    public noise_level_dB: number;

    @Column({
        name: 'max_overload_during_operation_G',
        type: 'smallint',
        nullable: false
    })
    @Max(100)
    @Min(1)
    @IsNotEmpty()
    public max_overload_during_operation_G: number;

    @Column({
        name: 'max_overloads_in_the_off_state',
        type: 'smallint',
        nullable: false
    })
    @Max(500)
    @Min(1)
    @IsNotEmpty()
    public max_overloads_off_state_G: number;

    @Column({
        name: 'power_consumption_active_mode_wt',
        type: 'double precision',
        nullable: false
    })
    @Max(10)
    @Min(1)
    @IsNotEmpty()
    public power_consumption_active_mode_wt: number;

    @Column({
        name: 'power_consumption_idle_mode_wt',
        type: 'double precision',
        nullable: false
    })
    @Max(10)
    @Min(1)
    @IsNotEmpty()
    public power_consumption_idle_mode_wt: number;

    @Column({
        name: 'MTBF',
        type: 'int',
        nullable: false
    })
    @IsNotEmpty()
    public MTBF_hours: number;

    @Column({
        name: 'additional_technologies',
        type: 'text',
        nullable: true
    })
    public additional_technologies: string;

    @Column({
        name: 'more',
        type: 'text',
        nullable: true
    })
    public more: string;

    @Column({
        name: 'size_volume_cm',
        type: 'text',
        nullable: true
    })
    public size_volume_cm: string;

    @Column({
        name: 'price',
        type: 'numeric',
        precision: 10,
        scale: 2,
        nullable: false,
        default: 10000
    })
    @Max(1000000)
    @Min(10000)
    @IsNotEmpty()
    public price: number;

    @JoinColumn({ name: 'product' })
    @OneToMany(() => Product, (p: Product) => p.HDD, {
        nullable: true
    })
    public products: Product[];
}
