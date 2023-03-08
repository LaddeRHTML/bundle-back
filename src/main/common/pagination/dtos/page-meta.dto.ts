import { ApiProperty } from '@nestjs/swagger';

import { PageOptionsDto } from './page-options.dto';

interface PageMetaDtoParameters {
    pageOptionsDto: PageOptionsDto;
    total: number;
}

export class PageMetaDto {
    @ApiProperty()
    readonly page: number;

    @ApiProperty()
    readonly limit: number;

    @ApiProperty()
    readonly total: number;

    @ApiProperty()
    readonly lastPage: number;

    @ApiProperty()
    readonly hasPreviousPage: boolean;

    @ApiProperty()
    readonly hasNextPage: boolean;

    constructor({ pageOptionsDto, total }: PageMetaDtoParameters) {
        this.page = pageOptionsDto.page;
        this.limit = pageOptionsDto.limit;
        this.total = total;
        this.lastPage = Math.ceil(this.total / this.limit);
        this.hasPreviousPage = this.page > 1;
        this.hasNextPage = this.page < this.lastPage;
    }
}
