import { UpdateCoolerDto } from './../dto/Cooler/UpdateCoolerDto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, FindOptionsWhere, Repository } from 'typeorm';

import getErrorMessage from 'common/utils/errors/getErrorMessage';

import { CreateCoolerDto } from 'dto/Cooler/CreateCoolerDto';

import { Cooler } from 'model/accessories/Cooler/Cooler';
import { PageOptionsDto } from 'common/pagination/dtos/page-options.dto';
import { PageDto } from './../common/pagination/dtos/page.dto';
import getSQLSearch from 'common/utils/array/getSQLSearch';
import { PageMetaDto } from './../common/pagination/dtos/page-meta.dto';
import checkProvidedFields from 'common/utils/array/checkProvidedFields';

@Injectable()
export class CoolerService {
    constructor(@InjectRepository(Cooler) private coolerRepository: Repository<Cooler>) {}

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

    async findSome(pageOptionsDto: PageOptionsDto, filters: Cooler): Promise<PageDto<Cooler>> {
        try {
            const includedInSearchFields = ['more', 'name'];

            const options = {
                ...(filters && filters)
            };

            const queryBuilder = this.coolerRepository.createQueryBuilder(
                Cooler.name.toLowerCase()
            );

            if (pageOptionsDto.searchBy) {
                queryBuilder.where(
                    getSQLSearch(includedInSearchFields, Cooler.name.toLowerCase()),
                    {
                        s: `%${pageOptionsDto.searchBy}%`
                    }
                );
            }

            queryBuilder.where(options);

            queryBuilder
                .orderBy(`${Cooler.name.toLowerCase()}.lastChangeDate`, pageOptionsDto.order)
                .skip(pageOptionsDto.skip)
                .take(pageOptionsDto.limit);

            const total = await queryBuilder.getCount();
            const { entities } = await queryBuilder.getRawAndEntities();

            const pageMetaDto = new PageMetaDto({ pageOptionsDto, total });

            return new PageDto(entities, pageMetaDto);
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
