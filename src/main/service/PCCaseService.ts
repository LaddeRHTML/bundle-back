import { CACHE_MANAGER, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, FindOptionsWhere, In, Repository } from 'typeorm';
import { Cache } from 'cache-manager';

import getErrorMessage from 'common/utils/errors/getErrorMessage';

import { UpdatePCCaseDto } from 'dto/PCCase/UpdatePCCaseDto';
import { CreatePCCaseDto } from 'dto/PCCase/CreatePCCaseDto';

import { PCCase } from 'model/accessories/PCCase/PCCase';
import { PageOptionsDto } from 'common/pagination/dtos/page-options.dto';
import { PageMetaDto } from 'common/pagination/dtos/page-meta.dto';
import getSQLSearch from 'common/utils/array/getSQLSearch';
import { PageDto } from 'common/pagination/dtos/page.dto';
import checkProvidedFields from 'common/utils/array/checkProvidedFields';
import { FindSomeCache, SuccessfullyUpdatedEntityResponse } from 'common/interfaces';
import { FanService } from './FanService';
import { AllowedPcCaseRelations } from 'controller/PCCaseController';
import { SqlSearch } from 'common/utils/array/SqlSearch';
import compareObjects from 'common/utils/object/compareObjects';

interface FindSomeArgs {
    pageOptionsDto: PageOptionsDto;
    filters: PCCase;
}

type FindSomeCached = FindSomeCache<PageDto<PCCase>, FindSomeArgs>;

@Injectable()
export class PCCaseService {
    constructor(
        @Inject(CACHE_MANAGER) private cacheManager: Cache,
        @InjectRepository(PCCase) private PCCaseRepository: Repository<PCCase>,
        private readonly fanService: FanService
    ) {}

    get name() {
        return PCCase.name.toLowerCase();
    }

    async createOne(createPCCaseDto: CreatePCCaseDto, userId: string): Promise<PCCase> {
        try {
            const dto = new CreatePCCaseDto(
                createPCCaseDto.maker,
                createPCCaseDto.model,
                createPCCaseDto.color,
                createPCCaseDto.formFactor
            );

            if (createPCCaseDto.fans && createPCCaseDto.fans?.length > 0) {
                const fans = await this.fanService.findAllBy({
                    where: {
                        id: In([...createPCCaseDto.fans])
                    }
                });

                createPCCaseDto.fans = fans.filter((fan) =>
                    createPCCaseDto.supportedFanDiameters.includes(fan.diameter)
                );
            }

            createPCCaseDto.lastChangedBy = userId;
            createPCCaseDto.createdBy = userId;
            createPCCaseDto.createDate = new Date();
            createPCCaseDto.lastChangeDate = new Date();
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

    async findOneById(id: string): Promise<PCCase> {
        try {
            const cachedData = (await this.cacheManager.get(`${this.name}.findOneById`)) as
                | PCCase
                | undefined;

            if (cachedData && cachedData.id === id) {
                return cachedData;
            }

            const PCCase = await this.PCCaseRepository.findOne({ where: { id } });

            if (!PCCase) {
                throw new NotFoundException('PCCase not found!');
            }

            await this.cacheManager.set(`${this.name}.findOneById`, PCCase, 10000);

            return PCCase;
        } catch (error) {
            throw new Error(`PCCase.service | findOneById error: ${getErrorMessage(error)}`);
        }
    }

    async findSome(
        pageOptionsDto: PageOptionsDto,
        filters: PCCase,
        relations: AllowedPcCaseRelations
    ): Promise<PageDto<PCCase>> {
        try {
            const cachedData = (await this.cacheManager.get(`${this.name}.findSome`)) as
                | FindSomeCached
                | undefined;

            if (cachedData && compareObjects<FindSomeArgs>(cachedData.arguments, pageOptionsDto)) {
                return cachedData.response;
            }

            const includedInSearchFields = [
                'more',
                'installedCooling',
                'fanInstallationSupport',
                'placesMountingWCSRadiator',
                'peculiarities',
                'name'
            ];
            const sqlSearch = new SqlSearch();

            const options = {
                ...(filters && filters)
            };

            const queryBuilder = this.PCCaseRepository.createQueryBuilder(this.name);

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

            if (relations.length > 0) {
                relations.forEach((relation) => {
                    queryBuilder.leftJoin(`${this.name}.${relation}`, relation);
                    queryBuilder.addSelect([`${relation}.name`, `${relation}.id`]);
                });

                if (pageOptionsDto.searchBy) {
                    queryBuilder.orWhere(
                        sqlSearch.getSearchableRelationFieldsSql(relations, 'name'),
                        {
                            s: `%${pageOptionsDto.searchBy}%`
                        }
                    );
                }
            }

            const total = await queryBuilder.getCount();
            const { entities } = await queryBuilder.getRawAndEntities();

            const pageMetaDto = new PageMetaDto({ pageOptionsDto, total });
            const response = new PageDto(entities, pageMetaDto);

            await this.cacheManager.set(
                `${this.name}.findSome`,
                { response, arguments: pageOptionsDto, filters, relations },
                10000
            );

            return response;
        } catch (error) {
            throw new Error(`PCCase.service | findSome error: ${getErrorMessage(error)}`);
        }
    }

    async updateOne(
        id: string,
        updatePCCaseDto: UpdatePCCaseDto,
        userId: string
    ): Promise<SuccessfullyUpdatedEntityResponse<PCCase>> {
        try {
            updatePCCaseDto.lastChangeDate = new Date();
            updatePCCaseDto.lastChangedBy = userId;

            const pccase = await this.findOne({ where: { id } });
            let message = 'Successfully updated!';

            if (updatePCCaseDto.fans && updatePCCaseDto.fans?.length > 0) {
                const fansIsPcCase =
                    pccase.fans && pccase.fans.length > 0 ? pccase.fans.map((p) => p.id) : [];

                const fans = await this.fanService.findAllBy({
                    where: {
                        id: In([...updatePCCaseDto.fans, ...fansIsPcCase])
                    }
                });

                updatePCCaseDto.fans = fans.filter((fan) =>
                    pccase.supportedFanDiameters.includes(fan.diameter)
                );

                if (updatePCCaseDto.fans.length === 0) {
                    message = 'All fields updated except fans!';
                } else {
                    const fansName = updatePCCaseDto.fans.map((f) => f.name);
                    message = `Fans ${fansName.join(', ')} were successfully added to pccase!`;
                }
            }

            if (
                checkProvidedFields<CreatePCCaseDto>([
                    updatePCCaseDto.maker,
                    updatePCCaseDto.model,
                    updatePCCaseDto.color,
                    updatePCCaseDto.formFactor
                ])
            ) {
                const dto = new CreatePCCaseDto(
                    updatePCCaseDto?.maker ?? pccase.maker,
                    updatePCCaseDto?.model ?? pccase.model,
                    updatePCCaseDto?.color ?? pccase.color,
                    updatePCCaseDto?.formFactor ?? pccase.formFactor
                );

                const result = await this.PCCaseRepository.save({
                    ...dto,
                    ...updatePCCaseDto,
                    id
                });

                message = 'Successfully updated!';

                return {
                    success: true,
                    message,
                    newFields: result
                };
            }

            const result = await this.PCCaseRepository.save({ id, ...updatePCCaseDto });

            return {
                success: true,
                message,
                newFields: result
            };
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
