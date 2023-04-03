import { UpdateCPUDto } from './../dto/CPU/UpdateCPUDto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, FindOptionsWhere, Repository } from 'typeorm';

import getErrorMessage from 'common/utils/errors/getErrorMessage';

import { CreateCPUDto } from 'dto/CPU/CreateCPUDto';

import { CPU } from 'model/accessories/CPU/CPU';
import { PageOptionsDto } from 'common/pagination/dtos/page-options.dto';
import { PageDto } from 'common/pagination/dtos/page.dto';
import getSQLSearch from 'common/utils/array/getSQLSearch';
import { PageMetaDto } from 'common/pagination/dtos/page-meta.dto';

@Injectable()
export class CPUService {
    constructor(@InjectRepository(CPU) private CPUrepository: Repository<CPU>) {}

    async createOne(createCPUDto: CreateCPUDto, userId: string): Promise<CPU> {
        try {
            const dto = new CreateCPUDto(
                createCPUDto.maker,
                createCPUDto.type,
                createCPUDto.model,
                createCPUDto.socket
            );

            createCPUDto.last_changed_by = userId;
            createCPUDto.created_by = userId;
            createCPUDto.create_date = new Date();
            createCPUDto.last_change_date = new Date();
            createCPUDto.name = dto.name;

            return await this.CPUrepository.save(createCPUDto);
        } catch (error) {
            throw new Error(`CPU.service | createOne error: ${getErrorMessage(error)}`);
        }
    }

    async findOne(parameter: FindOneOptions<CPU>): Promise<CPU> {
        try {
            const cpu = await this.CPUrepository.findOne(parameter);

            if (!cpu) {
                throw new NotFoundException('CPU not found!');
            }

            return cpu;
        } catch (error) {
            throw new Error(`CPU.service | findOne error: ${getErrorMessage(error)}`);
        }
    }

    async findSome(pageOptionsDto: PageOptionsDto, filters: CPU): Promise<PageDto<CPU>> {
        try {
            const includedInSearchFields = ['more', 'name', 'integrated_graphics_system'];

            const options = {
                ...(filters && filters)
            };

            const queryBuilder = this.CPUrepository.createQueryBuilder(CPU.name.toLowerCase());

            if (pageOptionsDto.searchBy) {
                queryBuilder.where(getSQLSearch(includedInSearchFields, CPU.name.toLowerCase()), {
                    s: `%${pageOptionsDto.searchBy}%`
                });
            }

            queryBuilder.where(options);

            queryBuilder
                .orderBy(`${CPU.name.toLowerCase()}.last_change_date`, pageOptionsDto.order)
                .skip(pageOptionsDto.skip)
                .take(pageOptionsDto.limit);

            // if (relations.length > 0) {
            //     relations.forEach((relation) => {
            //         queryBuilder.leftJoinAndSelect(
            //             `${CPU.name.toLowerCase()}.${relation}`,
            //             relation
            //         );
            //     });
            // }

            const total = await queryBuilder.getCount();
            const { entities } = await queryBuilder.getRawAndEntities();

            const pageMetaDto = new PageMetaDto({ pageOptionsDto, total });

            return new PageDto(entities, pageMetaDto);
        } catch (error) {
            throw new Error(`CPU.service | findSome error: ${getErrorMessage(error)}`);
        }
    }

    async updateOne(id: string, updateCPUDto: UpdateCPUDto, userId: string): Promise<CPU> {
        try {
            updateCPUDto.last_change_date = new Date();
            updateCPUDto.last_changed_by = userId;

            return await this.CPUrepository.save({ id, ...updateCPUDto });
        } catch (error) {
            throw new Error(`CPU.service | updateOne error: ${getErrorMessage(error)}`);
        }
    }

    async removeOneById(id: string): Promise<CPU> {
        try {
            const cpu = await this.findOne({ where: { id }, relations: [] });

            if (!cpu) {
                throw new NotFoundException('CPU not found!');
            }

            return await this.CPUrepository.softRemove(cpu);
        } catch (error) {
            throw new Error(`CPU.service | removeOneById error: ${getErrorMessage(error)}`);
        }
    }

    async isCPUExists(CPUProperty: FindOptionsWhere<CPU>): Promise<boolean> {
        try {
            return await this.CPUrepository.exist({ where: CPUProperty });
        } catch (error) {
            throw new Error(`CPU.service | isCPUExists error: ${getErrorMessage(error)}`);
        }
    }
}
