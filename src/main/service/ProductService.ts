import { HDDService } from './HDDService';
import { NotFoundException } from '@nestjs/common/exceptions';
import {
    FindManyOptions,
    FindOneOptions,
    FindOptionsWhere,
    In,
    Repository,
    UpdateResult
} from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { PageMetaDto } from 'common/pagination/dtos/page-meta.dto';
import { PageOptionsDto } from 'common/pagination/dtos/page-options.dto';
import { PageDto } from 'common/pagination/dtos/page.dto';
import getErrorMessage from 'common/utils/errors/getErrorMessage';

import { CreateProductDto } from 'dto/Product/CreateProductDto';
import { UpdateProductDto } from 'dto/Product/UpdateProductDto';

import { Product } from 'model/product/Product';
import { AllowedProductRelations } from 'controller/ProductController';
import { SqlSearch } from 'common/utils/array/SqlSearch';
import { SuccessfullyUpdatedEntityResponse } from 'common/interfaces';
import { FormFactor, HDDType } from 'model/accessories/HDD/HDDEnums';

interface Price {
    max: number;
    min: number;
}

export interface GetPricesResponse {
    prices?: Price;
    market_prices?: Price;
    supplier_prices?: Price;
}

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(Product) private productRepository: Repository<Product>,
        private readonly hddService: HDDService
    ) {}

    async createOne(createProductDto: CreateProductDto, userId: string): Promise<Product> {
        try {
            createProductDto.lastChangedBy = userId;
            createProductDto.createdBy = userId;
            createProductDto.createDate = new Date();
            createProductDto.lastChangeDate = new Date();

            if (createProductDto.hdd && createProductDto.hdd?.length > 0) {
                createProductDto.hdd = await this.hddService.findAllBy({
                    where: {
                        id: In([...createProductDto.hdd])
                    }
                });
            }

            return await this.productRepository.save(createProductDto);
        } catch (error) {
            throw new Error(`product.service | createOne error: ${getErrorMessage(error)}`);
        }
    }

    async findAll(): Promise<Product[]> {
        try {
            return await this.productRepository.find();
        } catch (error) {
            throw new Error(`product.service | findAll error: ${getErrorMessage(error)}`);
        }
    }

    async findOne(parameter: FindOneOptions<Product>): Promise<Product> {
        try {
            const product = await this.productRepository.findOne(parameter);

            if (!product) {
                throw new NotFoundException('Product not found!');
            }

            return product;
        } catch (error) {
            throw new Error(`product.service | findOne error: ${getErrorMessage(error)}`);
        }
    }

    async findAllBy(options: FindManyOptions<Product>): Promise<Product[]> {
        return await this.productRepository.find(options);
    }

    async findSome(
        pageOptionsDto: PageOptionsDto,
        filters: Product,
        relations: AllowedProductRelations
    ): Promise<PageDto<Product>> {
        try {
            const includedInSearchFields = ['name'];
            const entityName = Product.name.toLowerCase();
            const sqlSearch = new SqlSearch();

            const options = {
                ...(filters && filters)
            };

            const queryBuilder = this.productRepository.createQueryBuilder(entityName);

            if (pageOptionsDto.searchBy) {
                queryBuilder.where(
                    sqlSearch.getSearchableFieldsSql(includedInSearchFields, entityName),
                    {
                        s: `%${pageOptionsDto.searchBy}%`
                    }
                );
            }

            queryBuilder.andWhere(options);

            queryBuilder
                .orderBy(`${entityName}.lastChangeDate`, pageOptionsDto.order)
                .skip(pageOptionsDto.skip)
                .take(pageOptionsDto.limit);

            if (relations.length > 0) {
                relations.forEach((relation) => {
                    queryBuilder.leftJoin(`${entityName}.${relation}`, relation);

                    if (relation !== 'orders') {
                        queryBuilder.addSelect([`${relation}.name`, `${relation}.id`]);
                    }
                });

                if (pageOptionsDto.searchBy) {
                    queryBuilder.orWhere(
                        sqlSearch.getSearchableRelationFieldsSql(
                            relations.filter((r) => r !== 'orders'),
                            'name'
                        ),
                        {
                            s: `%${pageOptionsDto.searchBy}%`
                        }
                    );
                }
            }

            const total = await queryBuilder.getCount();
            const { entities } = await queryBuilder.getRawAndEntities();

            const pageMetaDto = new PageMetaDto({ pageOptionsDto, total });

            return new PageDto(entities, pageMetaDto);
        } catch (error) {
            throw new Error(`product.service | findSome error: ${getErrorMessage(error)}`);
        }
    }

    async updateOne(
        id: string,
        updateProductDto: UpdateProductDto,
        userId: string
    ): Promise<SuccessfullyUpdatedEntityResponse<Product>> {
        try {
            updateProductDto.lastChangeDate = new Date();
            updateProductDto.lastChangedBy = userId;

            const product = await this.findOne({ where: { id } });
            let message = 'Successfully updated!';

            if (updateProductDto.hdd && updateProductDto.hdd?.length > 0) {
                const disksMap = new Map();
                const hddInProduct =
                    product.hdd && product.hdd.length > 0 ? product.hdd.map((p) => p.id) : [];
                const newHddsEntityExemplar = await this.hddService.findAllBy({
                    where: {
                        id: In([...updateProductDto.hdd, ...hddInProduct])
                    }
                });

                newHddsEntityExemplar.forEach((disk) => disksMap.set(disk.id, disk));

                const newHdds = updateProductDto.hdd
                    .map((diskId) => {
                        if (disksMap.has(diskId)) {
                            return disksMap.get(diskId);
                        }

                        return undefined;
                    })
                    .filter((disk) => !!disk);

                const sataGroup = newHdds.filter(
                    (disk) =>
                        disk.formFactor.includes(FormFactor.FormFactor_2) ||
                        disk.formFactor.includes(FormFactor.FormFactor_3)
                );

                const m2Group = newHdds.filter(
                    (disk) =>
                        disk.type === HDDType.SSD &&
                        disk.formFactor !== FormFactor.FormFactor_2 &&
                        disk.formFactor !== FormFactor.FormFactor_3
                );

                if (sataGroup.length <= product.motherboard.maxSataCount) {
                    updateProductDto.hdd = sataGroup;
                }

                if (m2Group.length <= product.motherboard.connectorsForSSD) {
                    m2Group.forEach((disk) => updateProductDto.hdd?.push(disk));
                }

                updateProductDto.hdd = [...product.hdd, ...updateProductDto.hdd];

                if (updateProductDto.hdd.length === 0) {
                    message = 'All fields updated except HDDs!';
                } else {
                    const fansName = updateProductDto.hdd.map((h) => h.name);
                    message = `HDDs ${fansName.join(', ')} were successfully added to product!`;
                }
            }

            const result = await this.productRepository.save({ id, ...updateProductDto });

            return {
                success: true,
                message,
                newFields: result
            };
        } catch (error) {
            throw new Error(`product.service | updateOne error: ${getErrorMessage(error)}`);
        }
    }

    async updateMany(
        where: FindOptionsWhere<Product>,
        updateProductDto: UpdateProductDto,
        userId: string
    ): Promise<UpdateResult> {
        try {
            updateProductDto.lastChangeDate = new Date();
            updateProductDto.lastChangedBy = userId;

            return this.productRepository.update(where, updateProductDto);
        } catch (error) {
            throw new Error(`users.service | updateMany error: ${getErrorMessage(error)}`);
        }
    }

    async getPrices(): Promise<GetPricesResponse> {
        const prices = this.productRepository
            .createQueryBuilder('product')
            .select('MAX(product.price)', 'max')
            .addSelect('MIN(product.price)', 'min');

        const market_prices = this.productRepository
            .createQueryBuilder('product')
            .select('MAX(product.market_price)', 'max')
            .addSelect('MIN(product.market_price)', 'min');

        const supplier_prices = this.productRepository
            .createQueryBuilder('product')
            .select('MAX(product.supplier_price)', 'max')
            .addSelect('MIN(product.supplier_price)', 'min');

        return {
            prices: await prices.getRawOne(),
            market_prices: await market_prices.getRawOne(),
            supplier_prices: await supplier_prices.getRawOne()
        };
    }

    async removeOneById(id: string): Promise<Product> {
        try {
            const product = await this.findOne({ where: { id }, relations: [] });

            if (!product) {
                throw new NotFoundException('Product not found!');
            }

            return await this.productRepository.softRemove(product);
        } catch (error) {
            throw new Error(`products.service | removeOneById error: ${getErrorMessage(error)}`);
        }
    }

    async isProductExists(productProperty: FindOptionsWhere<Product>): Promise<boolean> {
        try {
            return await this.productRepository.exist({ where: productProperty });
        } catch (error) {
            throw new Error(`products.service | isProductExists error: ${getErrorMessage(error)}`);
        }
    }
}
