import { CACHE_MANAGER, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, FindOptionsWhere, Repository } from 'typeorm';
import { Cache } from 'cache-manager';

import getErrorMessage from 'common/utils/errors/getErrorMessage';

import { UpdatePowerUnitDto } from 'dto/PowerUnit/UpdatePowerUnitDto';
import { CreatePowerUnitDto } from 'dto/PowerUnit/CreatePowerUnitDto';

import { PowerUnit } from 'model/accessories/PowerUnit/PowerUnit';
import { PageOptionsDto } from 'common/pagination/dtos/page-options.dto';
import { PageDto } from 'common/pagination/dtos/page.dto';
import getSQLSearch from 'common/utils/array/getSQLSearch';
import { PageMetaDto } from 'common/pagination/dtos/page-meta.dto';
import checkProvidedFields from 'common/utils/array/checkProvidedFields';
import { FindSomeCache, SuccessfullyUpdatedEntityResponse } from 'common/interfaces';
import compareObjects from 'common/utils/object/compareObjects';

interface FindSomeArgs {
    pageOptionsDto: PageOptionsDto;
    filters: PowerUnit;
}

type FindSomeCached = FindSomeCache<PageDto<PowerUnit>, FindSomeArgs>;

@Injectable()
export class PowerUnitService {
    constructor(
        @Inject(CACHE_MANAGER) private cacheManager: Cache,
        @InjectRepository(PowerUnit) private PowerUnitrepository: Repository<PowerUnit>
    ) {}

    get name() {
        return PowerUnit.name.toLowerCase();
    }

    async createOne(createPowerUnitDto: CreatePowerUnitDto, userId: string): Promise<PowerUnit> {
        try {
            const dto = new CreatePowerUnitDto(
                createPowerUnitDto.formFactor,
                createPowerUnitDto.power,
                createPowerUnitDto.model,
                createPowerUnitDto.maker
            );

            createPowerUnitDto.lastChangedBy = userId;
            createPowerUnitDto.createdBy = userId;
            createPowerUnitDto.createDate = new Date();
            createPowerUnitDto.lastChangeDate = new Date();
            createPowerUnitDto.name = dto.name;

            return await this.PowerUnitrepository.save(createPowerUnitDto);
        } catch (error) {
            throw new Error(`PowerUnit.service | createOne error: ${getErrorMessage(error)}`);
        }
    }

    async findOne(parameter: FindOneOptions<PowerUnit>): Promise<PowerUnit> {
        try {
            const powerUnit = await this.PowerUnitrepository.findOne(parameter);

            if (!powerUnit) {
                throw new NotFoundException('PowerUnit not found!');
            }

            return powerUnit;
        } catch (error) {
            throw new Error(`PowerUnit.service | findOne error: ${getErrorMessage(error)}`);
        }
    }

    async findOneById(id: string): Promise<PowerUnit> {
        try {
            const cachedData = (await this.cacheManager.get(`${this.name}.findOneById`)) as
                | PowerUnit
                | undefined;

            if (cachedData && cachedData.id === id) {
                return cachedData;
            }

            const powerUnit = await this.PowerUnitrepository.findOne({ where: { id } });

            if (!powerUnit) {
                throw new NotFoundException('PowerUnit not found!');
            }

            await this.cacheManager.set(`${this.name}.findOneById`, powerUnit, 10000);

            return powerUnit;
        } catch (error) {
            throw new Error(`PowerUnit.service | findOneById error: ${getErrorMessage(error)}`);
        }
    }

    async findSome(
        pageOptionsDto: PageOptionsDto,
        filters: PowerUnit
    ): Promise<PageDto<PowerUnit>> {
        try {
            const cachedData = (await this.cacheManager.get(`${this.name}.findSome`)) as
                | FindSomeCached
                | undefined;

            if (cachedData && compareObjects<FindSomeArgs>(cachedData.arguments, pageOptionsDto)) {
                return cachedData.response;
            }

            const includedInSearchFields = ['more'];

            const options = {
                ...(filters && filters)
            };

            const queryBuilder = this.PowerUnitrepository.createQueryBuilder(this.name);

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
            throw new Error(`PowerUnit.service | findSome error: ${getErrorMessage(error)}`);
        }
    }

    async updateOne(
        id: string,
        updatePowerUnitDto: UpdatePowerUnitDto,
        userId: string
    ): Promise<SuccessfullyUpdatedEntityResponse<PowerUnit>> {
        try {
            updatePowerUnitDto.lastChangeDate = new Date();
            updatePowerUnitDto.lastChangedBy = userId;

            const powerUnit = await this.findOne({ where: { id } });

            if (
                checkProvidedFields<CreatePowerUnitDto>([
                    updatePowerUnitDto.formFactor,
                    updatePowerUnitDto.power,
                    updatePowerUnitDto.model,
                    updatePowerUnitDto.maker
                ])
            ) {
                const dto = new CreatePowerUnitDto(
                    updatePowerUnitDto?.formFactor ?? powerUnit.formFactor,
                    updatePowerUnitDto?.power ?? powerUnit.power,
                    updatePowerUnitDto?.model ?? powerUnit.model,
                    updatePowerUnitDto?.maker ?? powerUnit.maker
                );

                const result = await this.PowerUnitrepository.save({
                    ...dto,
                    ...updatePowerUnitDto,
                    id
                });
                return {
                    success: true,
                    message: 'Successfully updated',
                    newFields: result
                };
            }

            const result = await this.PowerUnitrepository.save({ id, ...updatePowerUnitDto });

            return {
                success: true,
                message: 'Successfully updated',
                newFields: result
            };
        } catch (error) {
            throw new Error(`PowerUnit.service | updateOne error: ${getErrorMessage(error)}`);
        }
    }

    async removeOneById(id: string): Promise<PowerUnit> {
        try {
            const powerUnit = await this.findOne({ where: { id }, relations: [] });

            if (!powerUnit) {
                throw new NotFoundException('PowerUnit not found!');
            }

            return await this.PowerUnitrepository.softRemove(powerUnit);
        } catch (error) {
            throw new Error(`PowerUnit.service | removeOneById error: ${getErrorMessage(error)}`);
        }
    }

    async isPowerUnitExists(PowerUnitProperty: FindOptionsWhere<PowerUnit>): Promise<boolean> {
        try {
            return await this.PowerUnitrepository.exist({ where: PowerUnitProperty });
        } catch (error) {
            throw new Error(
                `PowerUnit.service | isPowerUnitExists error: ${getErrorMessage(error)}`
            );
        }
    }
}
