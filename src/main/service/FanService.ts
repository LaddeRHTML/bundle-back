import { CACHE_MANAGER, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, FindOptionsWhere, Repository } from 'typeorm';
import { Cache } from 'cache-manager';

import getErrorMessage from 'common/utils/errors/getErrorMessage';

import { UpdateFanDto } from 'dto/Fan/UpdateFanDto';
import { CreateFanDto } from 'dto/Fan/CreateFanDto';

import { Fan } from 'model/accessories/Fan/Fan';
import { PageOptionsDto } from 'common/pagination/dtos/page-options.dto';
import { PageDto } from 'common/pagination/dtos/page.dto';
import getSQLSearch from 'common/utils/array/getSQLSearch';
import { PageMetaDto } from 'common/pagination/dtos/page-meta.dto';
import checkProvidedFields from 'common/utils/array/checkProvidedFields';
import { FindSomeCache, SuccessfullyUpdatedEntityResponse } from 'common/interfaces';
import compareObjects from 'common/utils/object/compareObjects';

interface FindSomeArgs {
    pageOptionsDto: PageOptionsDto;
    filters: Fan;
}

type FindSomeCached = FindSomeCache<PageDto<Fan>, FindSomeArgs>;

@Injectable()
export class FanService {
    constructor(
        @Inject(CACHE_MANAGER) private cacheManager: Cache,
        @InjectRepository(Fan) private fanRepository: Repository<Fan>
    ) {}

    get name() {
        return Fan.name.toLowerCase();
    }

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

    async findOneById(id: string): Promise<Fan> {
        try {
            const cachedData = (await this.cacheManager.get(`${this.name}.findOneById`)) as
                | Fan
                | undefined;

            if (cachedData && cachedData.id === id) {
                return cachedData;
            }

            const fan = await this.fanRepository.findOne({ where: { id } });

            if (!fan) {
                throw new NotFoundException('Fan not found!');
            }

            await this.cacheManager.set(`${this.name}.findOneById`, fan, 10000);

            return fan;
        } catch (error) {
            throw new Error(`Fan.service | findOneById error: ${getErrorMessage(error)}`);
        }
    }

    async findAllBy(options: FindManyOptions<Fan>): Promise<Fan[]> {
        return await this.fanRepository.find(options);
    }

    async findSome(pageOptionsDto: PageOptionsDto, filters: Fan): Promise<PageDto<Fan>> {
        try {
            const cachedData = (await this.cacheManager.get(`${this.name}.findSome`)) as
                | FindSomeCached
                | undefined;

            if (cachedData && compareObjects<FindSomeArgs>(cachedData.arguments, pageOptionsDto)) {
                return cachedData.response;
            }

            const includedInSearchFields = ['more', 'name'];

            const options = {
                ...(filters && filters)
            };

            const queryBuilder = this.fanRepository.createQueryBuilder(this.name);

            if (pageOptionsDto.searchBy) {
                queryBuilder.where(getSQLSearch(includedInSearchFields, this.name), {
                    s: `%${pageOptionsDto.searchBy}%`
                });
            }

            queryBuilder.where(options);

            queryBuilder
                .orderBy(`${this.name}.lastChangeDate`, pageOptionsDto.order)
                .skip(pageOptionsDto.skip)
                .take(pageOptionsDto.limit);

            const total = await queryBuilder.getCount();
            const { entities } = await queryBuilder.getRawAndEntities();

            const pageMetaDto = new PageMetaDto({ pageOptionsDto, total });
            const response = new PageDto(entities, pageMetaDto);

            await this.cacheManager.set(
                `${this.name}.findSome`,
                { response, arguments: pageOptionsDto, filters },
                10000
            );

            return response;
        } catch (error) {
            throw new Error(`Fan.service | findSome error: ${getErrorMessage(error)}`);
        }
    }

    async updateOne(
        id: string,
        updateFanDto: UpdateFanDto,
        userId: string
    ): Promise<SuccessfullyUpdatedEntityResponse<Fan>> {
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
                    updateFanDto?.maker ?? fan.maker,
                    updateFanDto?.model ?? fan.model,
                    updateFanDto?.diameter ?? fan.diameter,
                    updateFanDto?.color ?? fan.color
                );

                const result = await this.fanRepository.save({ ...dto, ...updateFanDto, id });
                return {
                    success: true,
                    message: 'Successfully updated',
                    newFields: result
                };
            }

            const result = await this.fanRepository.save({ id, ...updateFanDto });
            return {
                success: true,
                message: 'Successfully updated',
                newFields: result
            };
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
