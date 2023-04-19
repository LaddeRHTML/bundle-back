import { ApiProperty } from '@nestjs/swagger';
import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from 'typeorm';

export abstract class BaseEntity {
    @ApiProperty({
        name: 'id',
        uniqueItems: true
    })
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ApiProperty({ name: 'isActive', type: 'boolean', default: true, required: false })
    @Column({ name: 'is_active', type: 'boolean', default: true })
    isActive: boolean;

    @ApiProperty({ name: 'isArchived', type: 'boolean', default: true, required: false })
    @Column({ name: 'is_archived', type: 'boolean', default: false })
    isArchived: boolean;

    @ApiProperty({
        name: 'createDate',
        type: 'timestamptz',
        default: () => 'CURRENT_TIMESTAMP',
        required: false
    })
    @CreateDateColumn({
        name: 'create_date',
        type: 'timestamptz',
        default: () => 'CURRENT_TIMESTAMP'
    })
    createDate: Date;

    @ApiProperty({ name: 'createdBy', type: 'varchar', maxLength: 300 })
    @Column({ name: 'created_by', type: 'varchar', length: 300 })
    createdBy: string;

    @ApiProperty({ name: 'deleteDate', type: 'timestamptz' })
    @DeleteDateColumn({ name: 'delete_date', type: 'timestamptz' })
    deleteDate: Date;

    @ApiProperty({
        name: 'lastChangeDate',
        type: 'timestamptz',
        default: () => 'CURRENT_TIMESTAMP'
    })
    @UpdateDateColumn({
        name: 'last_change_date',
        type: 'timestamptz',
        default: () => 'CURRENT_TIMESTAMP'
    })
    lastChangeDate: Date;

    @ApiProperty({ name: 'lastChangedBy', type: 'varchar', maxLength: 300 })
    @Column({ name: 'last_changed_by', type: 'varchar', length: 300 })
    lastChangedBy: string;

    @ApiProperty({ name: 'internalComment', type: 'varchar', maxLength: 300, required: false })
    @Column({ name: 'internal_comment', type: 'varchar', length: 300, nullable: true })
    internalComment: string | null;
}
