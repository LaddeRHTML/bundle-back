import { Column, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

export abstract class BaseEntity {
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

    @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    last_change_date: Date;

    @Column({ type: 'varchar', length: 300 })
    last_changed_by: string;

    @Column({ type: 'varchar', length: 300, nullable: true })
    internal_comment: string | null;
}
