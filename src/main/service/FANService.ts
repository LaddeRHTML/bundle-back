import { UpdateFANDto } from 'dto/FAN/UpdateFANDto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, FindOptionsWhere, Repository } from 'typeorm';

import getErrorMessage from 'common/utils/errors/getErrorMessage';

import { CreateFANDto } from 'dto/FAN/CreateFANDto';

import { FAN } from 'model/accessories/FAN/FAN';
import { PageOptionsDto } from 'common/pagination/dtos/page-options.dto';
import { PageDto } from 'common/pagination/dtos/page.dto';
import getSQLSearch from 'common/utils/array/getSQLSearch';
import { PageMetaDto } from 'common/pagination/dtos/page-meta.dto';
import checkProvidedFields from 'common/utils/array/checkProvidedFields';

@Injectable()
export class FANService {
    constructor(@InjectRepository(FAN) private fanRepository: Repository<FAN>) {}

    async createOne(createFANDto: CreateFANDto, userId: string): Promise<FAN> {
        try {
            const dto = new CreateFANDto(
                createFANDto.maker,
                createFANDto.model,
                createFANDto.diameter,
                createFANDto.color
            );

            createFANDto.lastChangedBy = userId;
            createFANDto.createdBy = userId;
            createFANDto.createDate = new Date();
            createFANDto.lastChangeDate = new Date();
            createFANDto.name = dto.name;

            return await this.fanRepository.save(createFANDto);
        } catch (error) {
            throw new Error(`FAN.service | createOne error: ${getErrorMessage(error)}`);
        }
    }

    async findOne(parameter: FindOneOptions<FAN>): Promise<FAN> {
        try {
            const fan = await this.fanRepository.findOne(parameter);

            if (!fan) {
                throw new NotFoundException('FAN not found!');
            }

            return fan;
        } catch (error) {
            throw new Error(`FAN.service | findOne error: ${getErrorMessage(error)}`);
        }
    }

    async findSome(pageOptionsDto: PageOptionsDto, filters: FAN): Promise<PageDto<FAN>> {
        try {
            const includedInSearchFields = ['more', 'name'];

            const options = {
                ...(filters && filters)
            };

            const queryBuilder = this.fanRepository.createQueryBuilder(FAN.name.toLowerCase());

            if (pageOptionsDto.searchBy) {
                queryBuilder.where(getSQLSearch(includedInSearchFields, FAN.name.toLowerCase()), {
                    s: `%${pageOptionsDto.searchBy}%`
                });
            }

            queryBuilder.where(options);

            queryBuilder
                .orderBy(`${FAN.name.toLowerCase()}.lastChangeDate`, pageOptionsDto.order)
                .skip(pageOptionsDto.skip)
                .take(pageOptionsDto.limit);

            const total = await queryBuilder.getCount();
            const { entities } = await queryBuilder.getRawAndEntities();

            const pageMetaDto = new PageMetaDto({ pageOptionsDto, total });

            return new PageDto(entities, pageMetaDto);
        } catch (error) {
            throw new Error(`FAN.service | findSome error: ${getErrorMessage(error)}`);
        }
    }

    async updateOne(id: string, updateFANDto: UpdateFANDto, userId: string): Promise<FAN> {
        try {
            updateFANDto.lastChangeDate = new Date();
            updateFANDto.lastChangedBy = userId;

            const fan = await this.findOne({ where: { id } });

            if (
                checkProvidedFields<CreateFANDto>([
                    updateFANDto.maker,
                    updateFANDto.model,
                    updateFANDto.diameter,
                    updateFANDto.color
                ])
            ) {
                const dto = new CreateFANDto(
                    updateFANDto.maker ?? fan.maker,
                    updateFANDto.model ?? fan.model,
                    updateFANDto.diameter ?? fan.diameter,
                    updateFANDto.color ?? fan.color
                );

                return await this.fanRepository.save({ ...dto, ...updateFANDto, id });
            }

            return await this.fanRepository.save({ id, ...updateFANDto });
        } catch (error) {
            throw new Error(`FAN.service | updateOne error: ${getErrorMessage(error)}`);
        }
    }

    async removeOneById(id: string): Promise<FAN> {
        try {
            const fan = await this.findOne({ where: { id }, relations: [] });

            if (!fan) {
                throw new NotFoundException('FAN not found!');
            }

            return await this.fanRepository.softRemove(fan);
        } catch (error) {
            throw new Error(`FAN.service | removeOneById error: ${getErrorMessage(error)}`);
        }
    }

    async isFANExists(fanProperty: FindOptionsWhere<FAN>): Promise<boolean> {
        try {
            return await this.fanRepository.exist({ where: fanProperty });
        } catch (error) {
            throw new Error(`FAN.service | isFANExists error: ${getErrorMessage(error)}`);
        }
    }
}
