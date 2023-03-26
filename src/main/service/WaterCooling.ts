import { UpdateWaterCoolingDto } from 'dto/WaterCooling/UpdateWaterCooling';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, FindOptionsWhere, Repository } from 'typeorm';

import getErrorMessage from 'common/utils/errors/getErrorMessage';

import { CreateWaterCoolingDto } from 'dto/WaterCooling/CreateWaterCooling';

import { WaterCooling } from 'model/accessories/WaterCooling/WaterCooling';
import { PageOptionsDto } from 'common/pagination/dtos/page-options.dto';
import { PageDto } from 'common/pagination/dtos/page.dto';
import getSQLSearch from 'common/utils/array/getSQLSearch';
import { PageMetaDto } from 'common/pagination/dtos/page-meta.dto';

@Injectable()
export class WaterCoolingService {
    constructor(
        @InjectRepository(WaterCooling) private WaterCoolingRepository: Repository<WaterCooling>
    ) {}

    async createOne(
        createWaterCoolingDto: CreateWaterCoolingDto,
        userId: string
    ): Promise<WaterCooling> {
        try {
            const dto = new CreateWaterCoolingDto(
                createWaterCoolingDto.maker,
                createWaterCoolingDto.model
            );

            createWaterCoolingDto.last_changed_by = userId;
            createWaterCoolingDto.created_by = userId;
            createWaterCoolingDto.create_date = new Date();
            createWaterCoolingDto.last_change_date = new Date();
            createWaterCoolingDto.name = dto.name;

            return await this.WaterCoolingRepository.save(createWaterCoolingDto);
        } catch (error) {
            throw new Error(`WaterCooling.service | createOne error: ${getErrorMessage(error)}`);
        }
    }

    async findOne(parameter: FindOneOptions<WaterCooling>): Promise<WaterCooling> {
        try {
            const waterCooling = await this.WaterCoolingRepository.findOne(parameter);

            if (!waterCooling) {
                throw new NotFoundException('WaterCooling not found!');
            }

            return waterCooling;
        } catch (error) {
            throw new Error(`WaterCooling.service | findOne error: ${getErrorMessage(error)}`);
        }
    }

    async findSome(
        pageOptionsDto: PageOptionsDto,
        filters: WaterCooling
    ): Promise<PageDto<WaterCooling>> {
        try {
            const includedInSearchFields = ['more'];

            const options = {
                ...(filters && filters)
            };

            const queryBuilder = this.WaterCoolingRepository.createQueryBuilder(
                WaterCooling.name.toLowerCase()
            );

            if (pageOptionsDto.searchBy) {
                queryBuilder.where(
                    getSQLSearch(includedInSearchFields, WaterCooling.name.toLowerCase()),
                    {
                        s: `%${pageOptionsDto.searchBy}%`
                    }
                );
            }

            queryBuilder.where(options);

            queryBuilder
                .orderBy(
                    `${WaterCooling.name.toLowerCase()}.last_change_date`,
                    pageOptionsDto.order
                )
                .skip(pageOptionsDto.skip)
                .take(pageOptionsDto.limit);

            const total = await queryBuilder.getCount();
            const { entities } = await queryBuilder.getRawAndEntities();

            const pageMetaDto = new PageMetaDto({ pageOptionsDto, total });

            return new PageDto(entities, pageMetaDto);
        } catch (error) {
            throw new Error(`WaterCooling.service | findSome error: ${getErrorMessage(error)}`);
        }
    }

    async updateOne(
        id: string,
        updateWaterCoolingDto: UpdateWaterCoolingDto,
        userId: string
    ): Promise<WaterCooling> {
        try {
            updateWaterCoolingDto.last_change_date = new Date();
            updateWaterCoolingDto.last_changed_by = userId;

            return await this.WaterCoolingRepository.save({ id, ...updateWaterCoolingDto });
        } catch (error) {
            throw new Error(`WaterCooling.service | updateOne error: ${getErrorMessage(error)}`);
        }
    }

    async removeOneById(id: string): Promise<WaterCooling> {
        try {
            const waterCooling = await this.findOne({ where: { id }, relations: [] });

            if (!waterCooling) {
                throw new NotFoundException('WaterCooling not found!');
            }

            return await this.WaterCoolingRepository.softRemove(waterCooling);
        } catch (error) {
            throw new Error(
                `WaterCooling.service | removeOneById error: ${getErrorMessage(error)}`
            );
        }
    }

    async isWaterCoolingExists(
        WaterCoolingProperty: FindOptionsWhere<WaterCooling>
    ): Promise<boolean> {
        try {
            return await this.WaterCoolingRepository.exist({ where: WaterCoolingProperty });
        } catch (error) {
            throw new Error(
                `WaterCooling.service | isWaterCoolingExists error: ${getErrorMessage(error)}`
            );
        }
    }
}
