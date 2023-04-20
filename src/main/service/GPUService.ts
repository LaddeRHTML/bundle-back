import { UpdateGPUDto } from 'dto/GPU/UpdateGPUDto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, FindOptionsWhere, Repository } from 'typeorm';

import getErrorMessage from 'common/utils/errors/getErrorMessage';

import { CreateGPUDto } from 'dto/GPU/CreateGPUDto';

import { GPU } from 'model/accessories/GPU/GPU';
import { PageOptionsDto } from 'common/pagination/dtos/page-options.dto';
import { PageDto } from 'common/pagination/dtos/page.dto';
import getSQLSearch from 'common/utils/array/getSQLSearch';
import { PageMetaDto } from 'common/pagination/dtos/page-meta.dto';
import { SuccessfullyUpdatedEntityResponse } from 'common/interfaces';
import checkProvidedFields from 'common/utils/array/checkProvidedFields';

@Injectable()
export class GPUService {
    constructor(@InjectRepository(GPU) private GPUrepository: Repository<GPU>) {}

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

    async findSome(pageOptionsDto: PageOptionsDto, filters: GPU): Promise<PageDto<GPU>> {
        try {
            const includedInSearchFields = ['more', 'graphics_ram'];

            const options = {
                ...(filters && filters)
            };

            const queryBuilder = this.GPUrepository.createQueryBuilder(GPU.name.toLowerCase());

            if (pageOptionsDto.searchBy) {
                queryBuilder.where(getSQLSearch(includedInSearchFields, GPU.name.toLowerCase()), {
                    s: `%${pageOptionsDto.searchBy}%`
                });
            }

            queryBuilder.where(options);

            queryBuilder
                .orderBy(`${GPU.name.toLowerCase()}.lastChangeDate`, pageOptionsDto.order)
                .skip(pageOptionsDto.skip)
                .take(pageOptionsDto.limit);

            const total = await queryBuilder.getCount();
            const { entities } = await queryBuilder.getRawAndEntities();

            const pageMetaDto = new PageMetaDto({ pageOptionsDto, total });

            return new PageDto(entities, pageMetaDto);
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
