import { UpdatePowerUnitDto } from 'dto/PowerUnit/UpdatePowerUnitDto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, FindOptionsWhere, Repository } from 'typeorm';

import getErrorMessage from 'common/utils/errors/getErrorMessage';

import { CreatePowerUnitDto } from 'dto/PowerUnit/CreatePowerUnitDto';

import { PowerUnit } from 'model/accessories/PowerUnit/PowerUnit';
import { PageOptionsDto } from 'common/pagination/dtos/page-options.dto';
import { PageDto } from 'common/pagination/dtos/page.dto';
import getSQLSearch from 'common/utils/array/getSQLSearch';
import { PageMetaDto } from 'common/pagination/dtos/page-meta.dto';

@Injectable()
export class PowerUnitService {
    constructor(@InjectRepository(PowerUnit) private PowerUnitrepository: Repository<PowerUnit>) {}

    async createOne(createPowerUnitDto: CreatePowerUnitDto, userId: string): Promise<PowerUnit> {
        try {
            const dto = new CreatePowerUnitDto(
                createPowerUnitDto.maker,
                createPowerUnitDto.model,
                createPowerUnitDto.formFactor,
                createPowerUnitDto.power
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

    async findSome(
        pageOptionsDto: PageOptionsDto,
        filters: PowerUnit
    ): Promise<PageDto<PowerUnit>> {
        try {
            const includedInSearchFields = ['more'];

            const options = {
                ...(filters && filters)
            };

            const queryBuilder = this.PowerUnitrepository.createQueryBuilder(
                PowerUnit.name.toLowerCase()
            );

            if (pageOptionsDto.searchBy) {
                queryBuilder.where(
                    getSQLSearch(includedInSearchFields, PowerUnit.name.toLowerCase()),
                    {
                        s: `%${pageOptionsDto.searchBy}%`
                    }
                );
            }

            queryBuilder.where(options);

            queryBuilder
                .orderBy(`${PowerUnit.name.toLowerCase()}.lastChangeDate`, pageOptionsDto.order)
                .skip(pageOptionsDto.skip)
                .take(pageOptionsDto.limit);

            const total = await queryBuilder.getCount();
            const { entities } = await queryBuilder.getRawAndEntities();

            const pageMetaDto = new PageMetaDto({ pageOptionsDto, total });

            return new PageDto(entities, pageMetaDto);
        } catch (error) {
            throw new Error(`PowerUnit.service | findSome error: ${getErrorMessage(error)}`);
        }
    }

    async updateOne(
        id: string,
        updatePowerUnitDto: UpdatePowerUnitDto,
        userId: string
    ): Promise<PowerUnit> {
        try {
            updatePowerUnitDto.lastChangeDate = new Date();
            updatePowerUnitDto.lastChangedBy = userId;

            return await this.PowerUnitrepository.save({ id, ...updatePowerUnitDto });
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
