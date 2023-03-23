import { Max, Min, IsNotEmpty } from 'class-validator';
import { Column, Entity } from 'typeorm';
import { BaseAccessory } from '../BaseAccessory';
import { FormFactor, HDDMaker } from './HDDEnums';

@Entity()
export class HDD extends BaseAccessory {
    constructor(maker: string, disk_capacity_Gb: number, model: string, form_factor: string) {
        super();
        this.name = `${maker} ${disk_capacity_Gb} ${model} ${form_factor} `;
    }

    @Column({ type: 'enum', enum: HDDMaker })
    maker: HDDMaker;

    // line:

    @Column({ type: 'enum', enum: FormFactor, default: FormFactor.FormFactor_3 })
    @IsNotEmpty()
    form_factor: FormFactor;

    @Column({
        name: 'interface',
        type: 'text',
        nullable: false
    })
    @IsNotEmpty()
    interface: string;

    @Column({
        name: 'interface_baud_rate',
        type: 'smallint',
        nullable: false
    })
    @Max(12)
    @Min(1)
    @IsNotEmpty()
    interface_baud_rate_Gbps: number;

    @Column({
        name: 'disk_capacity',
        type: 'smallint',
        nullable: false
    })
    @Max(30000)
    @Min(1000)
    @IsNotEmpty()
    disk_capacity_Gb: number;

    @Column({
        name: 'total_data_volume_TBW',
        type: 'smallint',
        nullable: false
    })
    @Max(1000)
    @Min(1)
    @IsNotEmpty()
    total_data_volume_TBW: number;

    @Column({
        name: 'buffer',
        type: 'smallint',
        nullable: false
    })
    @Max(1024)
    @Min(1)
    @IsNotEmpty()
    buffer_mb: number;

    @Column({
        name: 'spindle_speed',
        type: 'smallint',
        nullable: false
    })
    @Max(7200)
    @Min(1)
    @IsNotEmpty()
    spindle_speed_rpm: number;

    @Column({
        name: 'noise_level_dB',
        type: 'smallint',
        nullable: false
    })
    @Max(110)
    @Min(1)
    @IsNotEmpty()
    noise_level_dB: number;

    @Column({
        name: 'max_overload_during_operation_G',
        type: 'smallint',
        nullable: false
    })
    @Max(100)
    @Min(1)
    @IsNotEmpty()
    max_overload_during_operation_G: number;

    @Column({
        name: 'max_overloads_in_the_off_state',
        type: 'smallint',
        nullable: false
    })
    @Max(500)
    @Min(1)
    @IsNotEmpty()
    max_overloads_off_state_G: number;

    @Column({
        name: 'power_consumption_active_mode_wt',
        type: 'double precision',
        nullable: false
    })
    @Max(10)
    @Min(1)
    @IsNotEmpty()
    power_consumption_active_mode_wt: number;

    @Column({
        name: 'power_consumption_idle_mode_wt',
        type: 'double precision',
        nullable: false
    })
    @Max(10)
    @Min(1)
    @IsNotEmpty()
    power_consumption_idle_mode_wt: number;

    @Column({
        name: 'MTBF',
        type: 'int',
        nullable: false
    })
    @IsNotEmpty()
    MTBF_hours: number;

    @Column({
        name: 'additional_technologies',
        type: 'text',
        array: true,
        default: [],
        nullable: false
    })
    @IsNotEmpty()
    additional_technologies: string[];

    @Column({
        name: 'more',
        type: 'text',
        nullable: true
    })
    more: string;

    @Column({
        name: 'dimensions_W_x_H_x_D_cm',
        type: 'double precision',
        array: true,
        default: [],
        nullable: false
    })
    @Max(30)
    @Min(0)
    @IsNotEmpty()
    dimensions_W_x_H_x_D_cm: number[];
}
