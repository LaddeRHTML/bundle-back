import { CACHE_MANAGER, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, FindOptionsWhere, Repository } from 'typeorm';
import { Cache } from 'cache-manager';

import getErrorMessage from 'common/utils/errors/getErrorMessage';

import { CreateCoolerDto } from 'dto/Cooler/CreateCoolerDto';
import { UpdateCoolerDto } from 'dto/Cooler/UpdateCoolerDto';

import { Cooler } from 'model/accessories/Cooler/Cooler';
import { PageOptionsDto } from 'common/pagination/dtos/page-options.dto';
import { PageDto } from 'common/pagination/dtos/page.dto';
import getSQLSearch from 'common/utils/array/getSQLSearch';
import { PageMetaDto } from 'common/pagination/dtos/page-meta.dto';
import checkProvidedFields from 'common/utils/array/checkProvidedFields';
import { FindSomeCache } from 'common/interfaces';
import compareObjects from 'common/utils/object/compareObjects';

interface FindSomeArgs {
    pageOptionsDto: PageOptionsDto;
    filters: Cooler;
}

type FindSomeCached = FindSomeCache<PageDto<Cooler>, FindSomeArgs>;

@Injectable()
export class CoolerService {
    constructor(
        @Inject(CACHE_MANAGER) private cacheManager: Cache,
        @InjectRepository(Cooler) private coolerRepository: Repository<Cooler>
    ) {}

    get name() {
        return Cooler.name.toLowerCase();
    }

    async createOne(createCoolerDto: CreateCoolerDto, userId: string): Promise<Cooler> {
        try {
            const dto = new CreateCoolerDto(
                createCoolerDto.type,
                createCoolerDto.maker,
                createCoolerDto.model
            );

            createCoolerDto.lastChangedBy = userId;
            createCoolerDto.createdBy = userId;
            createCoolerDto.createDate = new Date();
            createCoolerDto.lastChangeDate = new Date();
            createCoolerDto.name = dto.name;

            return await this.coolerRepository.save(createCoolerDto);
        } catch (error) {
            throw new Error(`Cooler.service | createOne error: ${getErrorMessage(error)}`);
        }
    }

    async findOne(parameter: FindOneOptions<Cooler>): Promise<Cooler> {
        try {
            const cooler = await this.coolerRepository.findOne(parameter);

            if (!cooler) {
                throw new NotFoundException('Cooler not found!');
            }

            return cooler;
        } catch (error) {
            throw new Error(`Cooler.service | findOne error: ${getErrorMessage(error)}`);
        }
    }

    async findOneById(id: string) {
        try {
            const cachedData = (await this.cacheManager.get(`${this.name}.findOneById`)) as
                | Cooler
                | undefined;

            if (cachedData && cachedData.id === id) {
                return cachedData;
            }

            const cooler = await this.coolerRepository.findOne({ where: { id } });

            if (!cooler) {
                throw new NotFoundException('Cooler not found!');
            }

            await this.cacheManager.set(`${this.name}.findOneById`, cooler, 10000);

            return cooler;
        } catch (error) {
            throw new Error(`Cooler.service | findOneById error: ${getErrorMessage(error)}`);
        }
    }

    async findSome(pageOptionsDto: PageOptionsDto, filters: Cooler): Promise<PageDto<Cooler>> {
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

            const queryBuilder = this.coolerRepository.createQueryBuilder(this.name);

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
            throw new Error(`Cooler.service | findSome error: ${getErrorMessage(error)}`);
        }
    }

    async updateOne(id: string, updateCoolerDto: UpdateCoolerDto, userId: string): Promise<Cooler> {
        try {
            updateCoolerDto.lastChangeDate = new Date();
            updateCoolerDto.lastChangedBy = userId;

            const cooler = await this.findOne({ where: { id } });

            if (
                checkProvidedFields<CreateCoolerDto>([
                    updateCoolerDto.type,
                    updateCoolerDto.maker,
                    updateCoolerDto.model
                ])
            ) {
                const dto = new CreateCoolerDto(
                    updateCoolerDto?.type ?? cooler.type,
                    updateCoolerDto?.maker ?? cooler.maker,
                    updateCoolerDto?.model ?? cooler.model
                );

                return await this.coolerRepository.save({ ...dto, ...updateCoolerDto, id });
            }

            return await this.coolerRepository.save({ id, ...updateCoolerDto });
        } catch (error) {
            throw new Error(`Cooler.service | updateOne error: ${getErrorMessage(error)}`);
        }
    }

    async removeOneById(id: string): Promise<Cooler> {
        try {
            const cooler = await this.findOne({ where: { id }, relations: [] });

            if (!cooler) {
                throw new NotFoundException('Cooler not found!');
            }

            return await this.coolerRepository.softRemove(cooler);
        } catch (error) {
            throw new Error(`Cooler.service | removeOneById error: ${getErrorMessage(error)}`);
        }
    }

    async isCoolerExists(coolerProperty: FindOptionsWhere<Cooler>): Promise<boolean> {
        try {
            return await this.coolerRepository.exist({ where: coolerProperty });
        } catch (error) {
            throw new Error(`Cooler.service | isCoolerExists error: ${getErrorMessage(error)}`);
        }
    }
}
