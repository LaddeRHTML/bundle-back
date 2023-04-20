import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, FindOptionsWhere, Repository } from 'typeorm';

import { Motherboard } from 'model/accessories/Motherboard/Motherboard';

import { CreateMotherboardDto } from 'dto/Motherboard/CreateMotherboardDto';
import { UpdateMotherboardDto } from 'dto/Motherboard/UpdateMotherboardDto';

import { PageMetaDto } from 'common/pagination/dtos/page-meta.dto';
import { PageOptionsDto } from 'common/pagination/dtos/page-options.dto';
import { PageDto } from 'common/pagination/dtos/page.dto';
import getSQLSearch from 'common/utils/array/getSQLSearch';
import getErrorMessage from 'common/utils/errors/getErrorMessage';
import { SuccessfullyUpdatedEntityResponse } from 'common/interfaces';
import checkProvidedFields from 'common/utils/array/checkProvidedFields';

@Injectable()
export class MotherboardService {
    constructor(
        @InjectRepository(Motherboard) private motherboardRepository: Repository<Motherboard>
    ) {}

    async createOne(
        createMotherboardDto: CreateMotherboardDto,
        userId: string
    ): Promise<Motherboard> {
        try {
            const dto = new CreateMotherboardDto(
                createMotherboardDto.maker,
                createMotherboardDto.model,
                createMotherboardDto.socket
            );

            createMotherboardDto.lastChangedBy = userId;
            createMotherboardDto.createdBy = userId;
            createMotherboardDto.createDate = new Date();
            createMotherboardDto.lastChangeDate = new Date();
            createMotherboardDto.name = dto.name;

            return await this.motherboardRepository.save(createMotherboardDto);
        } catch (error) {
            throw new Error(`Motherboard.service | createOne error: ${getErrorMessage(error)}`);
        }
    }

    async findOne(parameter: FindOneOptions<Motherboard>): Promise<Motherboard> {
        try {
            const motherboard = await this.motherboardRepository.findOne(parameter);

            if (!motherboard) {
                throw new NotFoundException('Motherboard not found!');
            }

            return motherboard;
        } catch (error) {
            throw new Error(`Motherboard.service | findOne error: ${getErrorMessage(error)}`);
        }
    }

    async findSome(
        pageOptionsDto: PageOptionsDto,
        filters: Motherboard
    ): Promise<PageDto<Motherboard>> {
        try {
            const includedInSearchFields = [
                'name',
                'microarchitecture',
                'chipset',
                'technologies',
                'FormFactor',
                'interface_m2_slot',
                'pci_express_workflow',
                'audiocodec',
                'power_connectors',
                'backpanel_connectors',
                'included_buttons',
                'network_controller',
                'network_communications',
                'bios',
                'more'
            ];

            const options = {
                ...(filters && filters)
            };

            const queryBuilder = this.motherboardRepository.createQueryBuilder(
                Motherboard.name.toLowerCase()
            );

            if (pageOptionsDto.searchBy) {
                queryBuilder.where(
                    getSQLSearch(includedInSearchFields, Motherboard.name.toLowerCase()),
                    {
                        s: `%${pageOptionsDto.searchBy}%`
                    }
                );
            }

            queryBuilder.where(options);

            queryBuilder
                .orderBy(`${Motherboard.name.toLowerCase()}.lastChangeDate`, pageOptionsDto.order)
                .skip(pageOptionsDto.skip)
                .take(pageOptionsDto.limit);

            const total = await queryBuilder.getCount();
            const { entities } = await queryBuilder.getRawAndEntities();

            const pageMetaDto = new PageMetaDto({ pageOptionsDto, total });

            return new PageDto(entities, pageMetaDto);
        } catch (error) {
            throw new Error(`CPU.service | findSome error: ${getErrorMessage(error)}`);
        }
    }

    async updateOne(
        id: string,
        updateMotherboardDto: UpdateMotherboardDto,
        userId: string
    ): Promise<SuccessfullyUpdatedEntityResponse<Motherboard>> {
        try {
            updateMotherboardDto.lastChangeDate = new Date();
            updateMotherboardDto.lastChangedBy = userId;

            const motherboard = await this.findOne({ where: { id } });

            if (
                checkProvidedFields<CreateMotherboardDto>([
                    updateMotherboardDto.maker,
                    updateMotherboardDto.model,
                    updateMotherboardDto.socket
                ])
            ) {
                const dto = new CreateMotherboardDto(
                    updateMotherboardDto?.maker ?? motherboard.maker,
                    updateMotherboardDto?.model ?? motherboard.model,
                    updateMotherboardDto?.socket ?? motherboard.socket
                );

                const result = await this.motherboardRepository.save({
                    ...dto,
                    ...updateMotherboardDto,
                    id
                });
                return {
                    success: true,
                    message: 'Successfully updated',
                    newFields: result
                };
            }

            const result = await this.motherboardRepository.save({ id, ...updateMotherboardDto });

            return {
                success: true,
                message: 'Successfully updated',
                newFields: result
            };
        } catch (error) {
            throw new Error(`Motherboard.service | updateOne error: ${getErrorMessage(error)}`);
        }
    }

    async removeOneById(id: string): Promise<Motherboard> {
        try {
            const motherboard = await this.findOne({ where: { id }, relations: [] });

            if (!motherboard) {
                throw new NotFoundException('motherboard not found!');
            }

            return await this.motherboardRepository.softRemove(motherboard);
        } catch (error) {
            throw new Error(`Motherboard.service | removeOneById error: ${getErrorMessage(error)}`);
        }
    }

    async isExists(motherboardProperty: FindOptionsWhere<Motherboard>): Promise<boolean> {
        try {
            return await this.motherboardRepository.exist({ where: motherboardProperty });
        } catch (error) {
            throw new Error(`Motherboard.service | isExists error: ${getErrorMessage(error)}`);
        }
    }
}
