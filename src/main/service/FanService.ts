import { UpdateFanDto } from 'dto/Fan/UpdateFanDto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, FindOptionsWhere, Repository } from 'typeorm';

import getErrorMessage from 'common/utils/errors/getErrorMessage';

import { CreateFanDto } from 'dto/Fan/CreateFanDto';

import { Fan } from 'model/accessories/Fan/Fan';
import { PageOptionsDto } from 'common/pagination/dtos/page-options.dto';
import { PageDto } from 'common/pagination/dtos/page.dto';
import getSQLSearch from 'common/utils/array/getSQLSearch';
import { PageMetaDto } from 'common/pagination/dtos/page-meta.dto';
import checkProvidedFields from 'common/utils/array/checkProvidedFields';

@Injectable()
export class FanService {
    constructor(@InjectRepository(Fan) private fanRepository: Repository<Fan>) {}

    async createOne(createFanDto: CreateFanDto, userId: string): Promise<Fan> {
        try {
            const dto = new CreateFanDto(
                createFanDto.maker,
                createFanDto.model,
                createFanDto.diameter,
                createFanDto.color
            );

            createFanDto.lastChangedBy = userId;
            createFanDto.createdBy = userId;
            createFanDto.createDate = new Date();
            createFanDto.lastChangeDate = new Date();
            createFanDto.name = dto.name;

            return await this.fanRepository.save(createFanDto);
        } catch (error) {
            throw new Error(`Fan.service | createOne error: ${getErrorMessage(error)}`);
        }
    }

    async findOne(parameter: FindOneOptions<Fan>): Promise<Fan> {
        try {
            const fan = await this.fanRepository.findOne(parameter);

            if (!fan) {
                throw new NotFoundException('Fan not found!');
            }

            return fan;
        } catch (error) {
            throw new Error(`Fan.service | findOne error: ${getErrorMessage(error)}`);
        }
    }

    async findSome(pageOptionsDto: PageOptionsDto, filters: Fan): Promise<PageDto<Fan>> {
        try {
            const includedInSearchFields = ['more', 'name'];

            const options = {
                ...(filters && filters)
            };

            const queryBuilder = this.fanRepository.createQueryBuilder(Fan.name.toLowerCase());

            if (pageOptionsDto.searchBy) {
                queryBuilder.where(getSQLSearch(includedInSearchFields, Fan.name.toLowerCase()), {
                    s: `%${pageOptionsDto.searchBy}%`
                });
            }

            queryBuilder.where(options);

            queryBuilder
                .orderBy(`${Fan.name.toLowerCase()}.lastChangeDate`, pageOptionsDto.order)
                .skip(pageOptionsDto.skip)
                .take(pageOptionsDto.limit);

            const total = await queryBuilder.getCount();
            const { entities } = await queryBuilder.getRawAndEntities();

            const pageMetaDto = new PageMetaDto({ pageOptionsDto, total });

            return new PageDto(entities, pageMetaDto);
        } catch (error) {
            throw new Error(`Fan.service | findSome error: ${getErrorMessage(error)}`);
        }
    }

    async updateOne(id: string, updateFanDto: UpdateFanDto, userId: string): Promise<Fan> {
        try {
            updateFanDto.lastChangeDate = new Date();
            updateFanDto.lastChangedBy = userId;

            const fan = await this.findOne({ where: { id } });

            if (
                checkProvidedFields<CreateFanDto>([
                    updateFanDto.maker,
                    updateFanDto.model,
                    updateFanDto.diameter,
                    updateFanDto.color
                ])
            ) {
                const dto = new CreateFanDto(
                    updateFanDto.maker ?? fan.maker,
                    updateFanDto.model ?? fan.model,
                    updateFanDto.diameter ?? fan.diameter,
                    updateFanDto.color ?? fan.color
                );

                return await this.fanRepository.save({ ...dto, ...updateFanDto, id });
            }

            return await this.fanRepository.save({ id, ...updateFanDto });
        } catch (error) {
            throw new Error(`Fan.service | updateOne error: ${getErrorMessage(error)}`);
        }
    }

    async removeOneById(id: string): Promise<Fan> {
        try {
            const fan = await this.findOne({ where: { id }, relations: [] });

            if (!fan) {
                throw new NotFoundException('Fan not found!');
            }

            return await this.fanRepository.softRemove(fan);
        } catch (error) {
            throw new Error(`Fan.service | removeOneById error: ${getErrorMessage(error)}`);
        }
    }

    async isFanExists(fanProperty: FindOptionsWhere<Fan>): Promise<boolean> {
        try {
            return await this.fanRepository.exist({ where: fanProperty });
        } catch (error) {
            throw new Error(`Fan.service | isFanExists error: ${getErrorMessage(error)}`);
        }
    }
}
