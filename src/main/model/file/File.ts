import { Column, Entity, Unique } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

import { BaseEntity } from 'model/base';

@Entity()
@Unique(['sizeInBytes', 'originalName', 'mimeType'])
export class File extends BaseEntity {
    @ApiProperty({
        name: 'sizeInBytes',
        type: 'int',
        uniqueItems: true,
        nullable: false,
        required: true
    })
    @Column({ name: 'size_in_bytes', type: 'int' })
    public sizeInBytes: number;

    @ApiProperty({
        name: 'fileName',
        type: 'varchar',
        uniqueItems: true,
        nullable: false,
        required: true
    })
    @Column({ name: 'file_name', type: 'varchar' })
    public fileName: string;

    @ApiProperty({ name: 'data', type: 'varchar', nullable: false, required: true })
    @Column({ name: 'data', type: 'bytea' })
    public data: Uint8Array;

    @ApiProperty({ name: 'encoding', type: 'varchar', nullable: false, required: true })
    @Column({ name: 'encoding', type: 'varchar' })
    public encoding: string;

    @ApiProperty({
        name: 'originalName',
        type: 'varchar',
        uniqueItems: true,
        nullable: false,
        required: true
    })
    @Column({ name: 'original_name', type: 'varchar' })
    public originalName: string;

    @ApiProperty({
        name: 'mimeType',
        type: 'varchar',
        uniqueItems: true,
        nullable: false,
        required: true
    })
    @Column({ name: 'mime_type', type: 'varchar' })
    public mimeType: string;
}
