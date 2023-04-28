import { CACHE_MANAGER, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, FindOptionsWhere, Repository } from 'typeorm';
import { Cache } from 'cache-manager';

import getErrorMessage from 'common/utils/errors/getErrorMessage';

import { CreateRAMDto } from 'dto/RAM/CreateRAMDto';
import { UpdateRAMDto } from 'dto/RAM/UpdateRAMDto';

import { RAM } from 'model/accessories/RAM/RAM';
import { PageOptionsDto } from 'common/pagination/dtos/page-options.dto';
import { PageDto } from 'common/pagination/dtos/page.dto';
import getSQLSearch from 'common/utils/array/getSQLSearch';
import { PageMetaDto } from 'common/pagination/dtos/page-meta.dto';
import checkProvidedFields from 'common/utils/array/checkProvidedFields';
import { FindSomeCache } from 'common/interfaces';
import compareObjects from 'common/utils/object/compareObjects';

interface FindSomeArgs {
    pageOptionsDto: PageOptionsDto;
    filters: RAM;
}

type FindSomeCached = FindSomeCache<PageDto<RAM>, FindSomeArgs>;

@Injectable()
export class RAMService {
    constructor(
        @Inject(CACHE_MANAGER) private cacheManager: Cache,
        @InjectRepository(RAM) private RAMrepository: Repository<RAM>
    ) {}

    get name() {
        return RAM.name.toLowerCase();
    }

    async createOne(createRAMDto: CreateRAMDto, userId: string): Promise<RAM> {
        try {
            const dto = new CreateRAMDto(
                createRAMDto.memoryType,
                createRAMDto.memoryGb,
                createRAMDto.memoryClockMHz,
                createRAMDto.timings[0],
                createRAMDto.model,
                createRAMDto.maker,
                createRAMDto.supplyVoltage,
                createRAMDto.package
            );

            createRAMDto.lastChangedBy = userId;
            createRAMDto.createdBy = userId;
            createRAMDto.createDate = new Date();
            createRAMDto.lastChangeDate = new Date();
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

    async findOneById(id: string): Promise<RAM> {
        try {
            const cachedData = (await this.cacheManager.get(`${this.name}.findOneById`)) as
                | RAM
                | undefined;

            if (cachedData && cachedData.id === id) {
                return cachedData;
            }

            const ram = await this.RAMrepository.findOne({ where: { id } });

            if (!ram) {
                throw new NotFoundException('RAM not found!');
            }

            await this.cacheManager.set(`${this.name}.findOneById`, ram, 10000);

            return ram;
        } catch (error) {
            throw new Error(`RAM.service | findOneById error: ${getErrorMessage(error)}`);
        }
    }

    async findSome(pageOptionsDto: PageOptionsDto, filters: RAM): Promise<PageDto<RAM>> {
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

            const queryBuilder = this.RAMrepository.createQueryBuilder(this.name);

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
            throw new Error(`RAM.service | findSome error: ${getErrorMessage(error)}`);
        }
    }

    async updateOne(id: string, updateRAMDto: UpdateRAMDto, userId: string): Promise<RAM> {
        try {
            updateRAMDto.lastChangeDate = new Date();
            updateRAMDto.lastChangedBy = userId;

            const ram = await this.findOne({ where: { id } });

            if (
                checkProvidedFields<CreateRAMDto>([
                    updateRAMDto.memoryType,
                    updateRAMDto.memoryGb,
                    updateRAMDto.memoryClockMHz,
                    updateRAMDto.timings,
                    updateRAMDto.model,
                    updateRAMDto.maker,
                    updateRAMDto.supplyVoltage,
                    updateRAMDto.package
                ])
            ) {
                const dto = new CreateRAMDto(
                    updateRAMDto.memoryType ?? ram.memoryType,
                    updateRAMDto.memoryGb ?? ram.memoryGb,
                    updateRAMDto.memoryClockMHz ?? ram.memoryClockMHz,
                    updateRAMDto.timings?.[0] ?? ram.timings[0],
                    updateRAMDto.model ?? ram.model,
                    updateRAMDto.maker ?? ram.maker,
                    updateRAMDto.supplyVoltage ?? ram.supplyVoltage,
                    updateRAMDto.package ?? ram.package
                );

                return await this.RAMrepository.save({ ...dto, ...updateRAMDto, id });
            }

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
