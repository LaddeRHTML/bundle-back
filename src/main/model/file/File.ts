import { Column, Entity, Unique } from 'typeorm';

import { BaseEntity } from 'model/base';

@Entity()
@Unique(['size_in_bytes', 'original_name', 'mime_type'])
export class File extends BaseEntity {
    @Column({ type: 'int' })
    public size_in_bytes: number;

    @Column({ type: 'varchar' })
    public file_name: string;

    @Column({
        type: 'bytea'
    })
    public data: Uint8Array;

    @Column({ type: 'varchar' })
    public encoding: string;

    @Column({ type: 'varchar' })
    public original_name: string;

    @Column({ type: 'varchar' })
    public mime_type: string;
}
