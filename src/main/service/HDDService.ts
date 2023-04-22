import { UpdateHDDDto } from 'dto/HDD/UpdateHDDDto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, FindOptionsWhere, Repository } from 'typeorm';

import getErrorMessage from 'common/utils/errors/getErrorMessage';

import { CreateHDDDto } from 'dto/HDD/CreateHDDDto';

import { HDD } from 'model/accessories/HDD/HDD';
import { PageOptionsDto } from 'common/pagination/dtos/page-options.dto';
import { PageDto } from 'common/pagination/dtos/page.dto';
import getSQLSearch from 'common/utils/array/getSQLSearch';
import { PageMetaDto } from 'common/pagination/dtos/page-meta.dto';
import checkProvidedFields from 'common/utils/array/checkProvidedFields';
import { SuccessfullyUpdatedEntityResponse } from 'common/interfaces';

@Injectable()
export class HDDService {
    constructor(@InjectRepository(HDD) private HDDrepository: Repository<HDD>) {}

    async createOne(createHDDDto: CreateHDDDto, userId: string): Promise<HDD> {
        try {
            const dto = new CreateHDDDto(
                createHDDDto.type,
                createHDDDto.maker,
                createHDDDto.diskCapacity,
                createHDDDto.model,
                createHDDDto.formFactor,
                createHDDDto.interface
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

    async findAllBy(options: FindManyOptions<HDD>): Promise<HDD[]> {
        return await this.HDDrepository.find(options);
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

    async updateOne(
        id: string,
        updateHDDDto: UpdateHDDDto,
        userId: string
    ): Promise<SuccessfullyUpdatedEntityResponse<HDD>> {
        try {
            updateHDDDto.lastChangeDate = new Date();
            updateHDDDto.lastChangedBy = userId;

            const hdd = await this.findOne({ where: { id } });

            if (
                checkProvidedFields<CreateHDDDto>([
                    updateHDDDto.type,
                    updateHDDDto.maker,
                    updateHDDDto.diskCapacity,
                    updateHDDDto.model,
                    updateHDDDto.formFactor,
                    updateHDDDto.interface
                ])
            ) {
                const dto = new CreateHDDDto(
                    updateHDDDto?.type ?? hdd.type,
                    updateHDDDto?.maker ?? hdd.maker,
                    updateHDDDto?.diskCapacity ?? hdd.diskCapacity,
                    updateHDDDto?.model ?? hdd.model,
                    updateHDDDto?.formFactor ?? hdd.formFactor,
                    updateHDDDto?.interface ?? hdd.interface
                );

                const result = await this.HDDrepository.save({ ...dto, ...updateHDDDto, id });
                return {
                    success: true,
                    message: 'Successfully updated',
                    newFields: result
                };
            }

            const result = await this.HDDrepository.save({ id, ...updateHDDDto });

            return {
                success: true,
                message: 'Successfully updated',
                newFields: result
            };
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
