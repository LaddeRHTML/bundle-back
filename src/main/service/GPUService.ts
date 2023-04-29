import { CACHE_MANAGER, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, FindOptionsWhere, Repository } from 'typeorm';
import { Cache } from 'cache-manager';

import getErrorMessage from 'common/utils/errors/getErrorMessage';

import { UpdateGPUDto } from 'dto/GPU/UpdateGPUDto';
import { CreateGPUDto } from 'dto/GPU/CreateGPUDto';

import { GPU } from 'model/accessories/GPU/GPU';
import { PageOptionsDto } from 'common/pagination/dtos/page-options.dto';
import { PageDto } from 'common/pagination/dtos/page.dto';
import getSQLSearch from 'common/utils/array/getSQLSearch';
import { PageMetaDto } from 'common/pagination/dtos/page-meta.dto';
import { FindSomeCache, SuccessfullyUpdatedEntityResponse } from 'common/interfaces';
import checkProvidedFields from 'common/utils/array/checkProvidedFields';
import compareObjects from 'common/utils/object/compareObjects';

interface FindSomeArgs {
    pageOptionsDto: PageOptionsDto;
    filters: GPU;
}

type FindSomeCached = FindSomeCache<PageDto<GPU>, FindSomeArgs>;

@Injectable()
export class GPUService {
    constructor(
        @Inject(CACHE_MANAGER) private cacheManager: Cache,
        @InjectRepository(GPU) private GPUrepository: Repository<GPU>
    ) {}

    get name() {
        return GPU.name.toLowerCase();
    }

    async createOne(createGPUDto: CreateGPUDto, userId: string): Promise<GPU> {
        try {
            const dto = new CreateGPUDto(
                createGPUDto.maker,
                createGPUDto.model,
                createGPUDto.graphicsRamSize,
                createGPUDto.chipsetModel
            );

            createGPUDto.lastChangedBy = userId;
            createGPUDto.createdBy = userId;
            createGPUDto.createDate = new Date();
            createGPUDto.lastChangeDate = new Date();
            createGPUDto.name = dto.name;

            return await this.GPUrepository.save(createGPUDto);
        } catch (error) {
            throw new Error(`GPU.service | createOne error: ${getErrorMessage(error)}`);
        }
    }

    async findOne(parameter: FindOneOptions<GPU>): Promise<GPU> {
        try {
            const gpu = await this.GPUrepository.findOne(parameter);

            if (!gpu) {
                throw new NotFoundException('GPU not found!');
            }

            return gpu;
        } catch (error) {
            throw new Error(`GPU.service | findOne error: ${getErrorMessage(error)}`);
        }
    }

    async findOneById(id: string): Promise<GPU> {
        try {
            const cachedData = (await this.cacheManager.get(`${this.name}.findOneById`)) as
                | GPU
                | undefined;

            if (cachedData && cachedData.id === id) {
                return cachedData;
            }

            const gpu = await this.GPUrepository.findOne({ where: { id } });

            if (!gpu) {
                throw new NotFoundException('GPU not found!');
            }

            await this.cacheManager.set(`${this.name}.findOneById`, gpu, 10000);

            return gpu;
        } catch (error) {
            throw new Error(`GPU.service | findOneById error: ${getErrorMessage(error)}`);
        }
    }

    async findSome(pageOptionsDto: PageOptionsDto, filters: GPU): Promise<PageDto<GPU>> {
        try {
            const cachedData = (await this.cacheManager.get(`${this.name}.findSome`)) as
                | FindSomeCached
                | undefined;

            if (cachedData && compareObjects<FindSomeArgs>(cachedData.arguments, pageOptionsDto)) {
                return cachedData.response;
            }

            const includedInSearchFields = ['more', 'graphics_ram'];

            const options = {
                ...(filters && filters)
            };

            const queryBuilder = this.GPUrepository.createQueryBuilder(this.name);

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
            throw new Error(`GPU.service | findSome error: ${getErrorMessage(error)}`);
        }
    }

    async updateOne(
        id: string,
        updateGPUDto: UpdateGPUDto,
        userId: string
    ): Promise<SuccessfullyUpdatedEntityResponse<GPU>> {
        try {
            updateGPUDto.lastChangeDate = new Date();
            updateGPUDto.lastChangedBy = userId;

            const gpu = await this.findOne({ where: { id } });

            if (
                checkProvidedFields<CreateGPUDto>([
                    updateGPUDto.maker,
                    updateGPUDto.model,
                    updateGPUDto.graphicsRamSize,
                    updateGPUDto.chipsetModel
                ])
            ) {
                const dto = new CreateGPUDto(
                    updateGPUDto?.maker ?? gpu.maker,
                    updateGPUDto?.model ?? gpu.model,
                    updateGPUDto?.graphicsRamSize ?? gpu.graphicsRamSize,
                    updateGPUDto?.chipsetModel ?? gpu.chipsetModel
                );

                const result = await this.GPUrepository.save({ ...dto, ...updateGPUDto, id });
                return {
                    success: true,
                    message: 'Successfully updated',
                    newFields: result
                };
            }

            const result = await this.GPUrepository.save({ id, ...updateGPUDto });
            return {
                success: true,
                message: 'Successfully updated',
                newFields: result
            };
        } catch (error) {
            throw new Error(`GPU.service | updateOne error: ${getErrorMessage(error)}`);
        }
    }

    async removeOneById(id: string): Promise<GPU> {
        try {
            const gpu = await this.findOne({ where: { id }, relations: [] });

            if (!gpu) {
                throw new NotFoundException('GPU not found!');
            }

            return await this.GPUrepository.softRemove(gpu);
        } catch (error) {
            throw new Error(`GPU.service | removeOneById error: ${getErrorMessage(error)}`);
        }
    }

    async isGPUExists(GPUProperty: FindOptionsWhere<GPU>): Promise<boolean> {
        try {
            return await this.GPUrepository.exist({ where: GPUProperty });
        } catch (error) {
            throw new Error(`GPU.service | isGPUExists error: ${getErrorMessage(error)}`);
        }
    }
}
