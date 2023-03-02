import { BaseEntity } from 'src/common/base_entity';
import { Column, Entity, Index, Unique } from 'typeorm';

@Entity()
@Unique(['size_in_bytes', 'original_name', 'mime_type'])
export class File extends BaseEntity {
    @Column()
    public size_in_bytes: number;

    @Column()
    public file_name: string;

    @Column({
        type: 'bytea'
    })
    public data: Uint8Array;

    @Column()
    public encoding: string;

    @Column()
    public original_name: string;

    @Column()
    public mime_type: string;
}
