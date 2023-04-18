import { NotFoundException } from '@nestjs/common/exceptions';
import {
    FindManyOptions,
    FindOneOptions,
    FindOptionsWhere,
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
    constructor(@InjectRepository(Product) private productRepository: Repository<Product>) {}

    async createOne(createProductDto: CreateProductDto, userId: string): Promise<Product> {
        try {
            createProductDto.last_changed_by = userId;
            createProductDto.created_by = userId;
            createProductDto.create_date = new Date();
            createProductDto.last_change_date = new Date();

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
                .orderBy(`${entityName}.last_change_date`, pageOptionsDto.order)
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
    ): Promise<Product> {
        try {
            updateProductDto.last_change_date = new Date();
            updateProductDto.last_changed_by = userId;

            return await this.productRepository.save({ id, ...updateProductDto });
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
            updateProductDto.last_change_date = new Date();
            updateProductDto.last_changed_by = userId;

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
