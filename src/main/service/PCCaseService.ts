import { UpdatePCCaseDto } from 'dto/PCCase/UpdatePCCaseDto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, FindOptionsWhere, Repository } from 'typeorm';

import getErrorMessage from 'common/utils/errors/getErrorMessage';

import { CreatePCCaseDto } from 'dto/PCCase/CreatePCCaseDto';

import { PCCase } from 'model/accessories/PCCase/PCCase';
import { PageOptionsDto } from 'common/pagination/dtos/page-options.dto';
import { PageMetaDto } from 'common/pagination/dtos/page-meta.dto';
import getSQLSearch from 'common/utils/array/getSQLSearch';
import { PageDto } from 'common/pagination/dtos/page.dto';

@Injectable()
export class PCCaseService {
    constructor(@InjectRepository(PCCase) private PCCaseRepository: Repository<PCCase>) {}

    async createOne(createPCCaseDto: CreatePCCaseDto, userId: string): Promise<PCCase> {
        try {
            const dto = new CreatePCCaseDto(
                createPCCaseDto.maker,
                createPCCaseDto.model,
                createPCCaseDto.color,
                createPCCaseDto.form_factor
            );

            createPCCaseDto.last_changed_by = userId;
            createPCCaseDto.created_by = userId;
            createPCCaseDto.create_date = new Date();
            createPCCaseDto.last_change_date = new Date();
            createPCCaseDto.name = dto.name;

            return await this.PCCaseRepository.save(createPCCaseDto);
        } catch (error) {
            throw new Error(`PCCase.service | createOne error: ${getErrorMessage(error)}`);
        }
    }

    async findOne(parameter: FindOneOptions<PCCase>): Promise<PCCase> {
        try {
            const PCCase = await this.PCCaseRepository.findOne(parameter);

            if (!PCCase) {
                throw new NotFoundException('PCCase not found!');
            }

            return PCCase;
        } catch (error) {
            throw new Error(`PCCase.service | findOne error: ${getErrorMessage(error)}`);
        }
    }

    async findSome(pageOptionsDto: PageOptionsDto, filters: PCCase): Promise<PageDto<PCCase>> {
        try {
            const includedInSearchFields = ['more', 'power_unit_location', 'name'];

            const options = {
                ...(filters && filters)
            };

            const queryBuilder = this.PCCaseRepository.createQueryBuilder(
                PCCase.name.toLowerCase()
            );

            if (pageOptionsDto.searchBy) {
                queryBuilder.where(
                    getSQLSearch(includedInSearchFields, PCCase.name.toLowerCase()),
                    {
                        s: `%${pageOptionsDto.searchBy}%`
                    }
                );
            }

            queryBuilder.where(options);

            queryBuilder
                .orderBy(`${PCCase.name.toLowerCase()}.last_change_date`, pageOptionsDto.order)
                .skip(pageOptionsDto.skip)
                .take(pageOptionsDto.limit);

            const total = await queryBuilder.getCount();
            const { entities } = await queryBuilder.getRawAndEntities();

            const pageMetaDto = new PageMetaDto({ pageOptionsDto, total });

            return new PageDto(entities, pageMetaDto);
        } catch (error) {
            throw new Error(`PCCase.service | findSome error: ${getErrorMessage(error)}`);
        }
    }

    async updateOne(id: string, updatePCCaseDto: UpdatePCCaseDto, userId: string): Promise<PCCase> {
        try {
            updatePCCaseDto.last_change_date = new Date();
            updatePCCaseDto.last_changed_by = userId;

            return await this.PCCaseRepository.save({ id, ...updatePCCaseDto });
        } catch (error) {
            throw new Error(`PCCase.service | updateOne error: ${getErrorMessage(error)}`);
        }
    }

    async removeOneById(id: string): Promise<PCCase> {
        try {
            const PCCase = await this.findOne({ where: { id }, relations: [] });

            if (!PCCase) {
                throw new NotFoundException('PCCase not found!');
            }

            return await this.PCCaseRepository.softRemove(PCCase);
        } catch (error) {
            throw new Error(`PCCase.service | removeOneById error: ${getErrorMessage(error)}`);
        }
    }

    async isPCCaseExists(PCCaseProperty: FindOptionsWhere<PCCase>): Promise<boolean> {
        try {
            return await this.PCCaseRepository.exist({ where: PCCaseProperty });
        } catch (error) {
            throw new Error(`PCCase.service | isPCCaseExists error: ${getErrorMessage(error)}`);
        }
    }
}
