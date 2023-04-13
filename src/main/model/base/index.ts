import { ApiProperty } from '@nestjs/swagger';
import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from 'typeorm';

export abstract class BaseEntity {
    @ApiProperty()
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'boolean', default: true })
    is_active: boolean;

    @Column({ type: 'boolean', default: false })
    is_archived: boolean;

    @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    create_date: Date;

    @Column({ type: 'varchar', length: 300 })
    created_by: string;

    @DeleteDateColumn({ type: 'timestamptz' })
    delete_date: Date;

    @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    last_change_date: Date;

    @Column({ type: 'varchar', length: 300 })
    last_changed_by: string;

    @Column({ type: 'varchar', length: 300, nullable: true })
    internal_comment: string | null;
}
