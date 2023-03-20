import { UpdateRAMDto } from 'dto/RAM/UpdateRAMDto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, FindOptionsWhere, Repository } from 'typeorm';

import getErrorMessage from 'common/utils/errors/getErrorMessage';

import { CreateRAMDto } from 'dto/RAM/CreateRAMDto';

import { RAM } from 'model/accessories/RAM/RAM';
import { PageOptionsDto } from 'common/pagination/dtos/page-options.dto';
import { PageDto } from 'common/pagination/dtos/page.dto';
import getSQLSearch from 'common/utils/array/getSQLSearch';
import { PageMetaDto } from 'common/pagination/dtos/page-meta.dto';

@Injectable()
export class RAMService {
    constructor(@InjectRepository(RAM) private RAMrepository: Repository<RAM>) {}

    async createOne(createRAMDto: CreateRAMDto, userId: string): Promise<RAM> {
        try {
            const dto = new CreateRAMDto(
                createRAMDto.maker,
                createRAMDto.model,
                createRAMDto.memory_type,
                createRAMDto.memory_Gb
            );

            createRAMDto.last_changed_by = userId;
            createRAMDto.created_by = userId;
            createRAMDto.create_date = new Date();
            createRAMDto.last_change_date = new Date();
            createRAMDto.name = dto.name;

            return await this.RAMrepository.save(createRAMDto);
        } catch (error) {
            throw new Error(`RAM.service | createOne error : ${getErrorMessage(error)}`);
        }
    }

    async findOne(parameter: FindOneOptions<RAM>): Promise<RAM> {
        try {
            const ram = await this.RAMrepository.findOne(parameter);

            if (!ram) {
                throw new NotFoundException('RAM not found!');
            }

            return ram;
        } catch (error) {
            throw new Error(`RAM.service | findOne error: ${getErrorMessage(error)}`);
        }
    }

    async findSome(pageOptionsDto: PageOptionsDto, filters: RAM): Promise<PageDto<RAM>> {
        try {
            const includedInSearchFields = ['more', 'name'];

            const options = {
                ...(filters && filters)
            };

            const queryBuilder = this.RAMrepository.createQueryBuilder(RAM.name.toLowerCase());

            if (pageOptionsDto.searchBy) {
                queryBuilder.where(getSQLSearch(includedInSearchFields, RAM.name.toLowerCase()), {
                    s: `%${pageOptionsDto.searchBy}%`
                });
            }

            queryBuilder.where(options);

            queryBuilder
                .orderBy(`${RAM.name.toLowerCase()}.last_change_date`, pageOptionsDto.order)
                .skip(pageOptionsDto.skip)
                .take(pageOptionsDto.limit);

            const total = await queryBuilder.getCount();
            const { entities } = await queryBuilder.getRawAndEntities();

            const pageMetaDto = new PageMetaDto({ pageOptionsDto, total });

            return new PageDto(entities, pageMetaDto);
        } catch (error) {
            throw new Error(`RAM.service | findSome error: ${getErrorMessage(error)}`);
        }
    }

    async updateOne(id: string, updateRAMDto: UpdateRAMDto, userId: string): Promise<RAM> {
        try {
            updateRAMDto.last_change_date = new Date();
            updateRAMDto.last_changed_by = userId;

            return await this.RAMrepository.save({ id, ...updateRAMDto });
        } catch (error) {
            throw new Error(`RAM.service | updateOne error: ${getErrorMessage(error)}`);
        }
    }

    async removeOneById(id: string): Promise<RAM> {
        try {
            const ram = await this.findOne({ where: { id }, relations: [] });

            if (!ram) {
                throw new NotFoundException('RAM not found!');
            }

            return await this.RAMrepository.softRemove(ram);
        } catch (error) {
            throw new Error(`RAM.service | removeOneById error: ${getErrorMessage(error)}`);
        }
    }

    async isRAMExists(RAMProperty: FindOptionsWhere<RAM>): Promise<boolean> {
        try {
            return await this.RAMrepository.exist({ where: RAMProperty });
        } catch (error) {
            throw new Error(`RAM.service | isRAMExists error: ${getErrorMessage(error)}`);
        }
    }
}
