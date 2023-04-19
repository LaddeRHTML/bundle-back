import { UpdateHDDDto } from 'dto/HDD/UpdateHDDDto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, FindOptionsWhere, Repository } from 'typeorm';

import getErrorMessage from 'common/utils/errors/getErrorMessage';

import { CreateHDDDto } from 'dto/HDD/CreateHDDDto';

import { HDD } from 'model/accessories/HDD/HDD';
import { PageOptionsDto } from 'common/pagination/dtos/page-options.dto';
import { PageDto } from 'common/pagination/dtos/page.dto';
import getSQLSearch from 'common/utils/array/getSQLSearch';
import { PageMetaDto } from 'common/pagination/dtos/page-meta.dto';

@Injectable()
export class HDDService {
    constructor(@InjectRepository(HDD) private HDDrepository: Repository<HDD>) {}

    async createOne(createHDDDto: CreateHDDDto, userId: string): Promise<HDD> {
        try {
            const dto = new CreateHDDDto(
                createHDDDto.maker,
                createHDDDto.disk_capacity_Gb,
                createHDDDto.model,
                createHDDDto.form_factor
            );

            createHDDDto.lastChangedBy = userId;
            createHDDDto.createdBy = userId;
            createHDDDto.createDate = new Date();
            createHDDDto.lastChangeDate = new Date();
            createHDDDto.name = dto.name;

            return await this.HDDrepository.save(createHDDDto);
        } catch (error) {
            throw new Error(`HDD.service | createOne error: ${getErrorMessage(error)}`);
        }
    }

    async findOne(parameter: FindOneOptions<HDD>): Promise<HDD> {
        try {
            const hdd = await this.HDDrepository.findOne(parameter);

            if (!hdd) {
                throw new NotFoundException('HDD not found!');
            }

            return hdd;
        } catch (error) {
            throw new Error(`HDD.service | findOne error: ${getErrorMessage(error)}`);
        }
    }

    async findSome(pageOptionsDto: PageOptionsDto, filters: HDD): Promise<PageDto<HDD>> {
        try {
            const includedInSearchFields = ['more', 'form_factor'];

            const options = {
                ...(filters && filters)
            };

            const queryBuilder = this.HDDrepository.createQueryBuilder(HDD.name.toLowerCase());

            if (pageOptionsDto.searchBy) {
                queryBuilder.where(getSQLSearch(includedInSearchFields, HDD.name.toLowerCase()), {
                    s: `%${pageOptionsDto.searchBy}%`
                });
            }

            queryBuilder.where(options);

            queryBuilder
                .orderBy(`${HDD.name.toLowerCase()}.lastChangeDate`, pageOptionsDto.order)
                .skip(pageOptionsDto.skip)
                .take(pageOptionsDto.limit);

            const total = await queryBuilder.getCount();
            const { entities } = await queryBuilder.getRawAndEntities();

            const pageMetaDto = new PageMetaDto({ pageOptionsDto, total });

            return new PageDto(entities, pageMetaDto);
        } catch (error) {
            throw new Error(`HDD.service | findSome error: ${getErrorMessage(error)}`);
        }
    }

    async updateOne(id: string, updateHDDDto: UpdateHDDDto, userId: string): Promise<HDD> {
        try {
            updateHDDDto.lastChangeDate = new Date();
            updateHDDDto.lastChangedBy = userId;

            return await this.HDDrepository.save({ id, ...updateHDDDto });
        } catch (error) {
            throw new Error(`HDD.service | updateOne error: ${getErrorMessage(error)}`);
        }
    }

    async removeOneById(id: string): Promise<HDD> {
        try {
            const hdd = await this.findOne({ where: { id }, relations: [] });

            if (!hdd) {
                throw new NotFoundException('HDD not found!');
            }

            return await this.HDDrepository.softRemove(hdd);
        } catch (error) {
            throw new Error(`HDD.service | removeOneById error: ${getErrorMessage(error)}`);
        }
    }

    async isHDDExists(HDDProperty: FindOptionsWhere<HDD>): Promise<boolean> {
        try {
            return await this.HDDrepository.exist({ where: HDDProperty });
        } catch (error) {
            throw new Error(`HDD.service | isHDDExists error: ${getErrorMessage(error)}`);
        }
    }
}
