import { NotFoundException } from '@nestjs/common/exceptions';
import {
    FindManyOptions,
    FindOneOptions,
    FindOptionsWhere,
    InsertResult,
    Repository,
    UpdateResult
} from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { PageMetaDto } from 'common/pagination/dtos/page-meta.dto';
import { PageOptionsDto } from 'common/pagination/dtos/page-options.dto';
import { PageDto } from 'common/pagination/dtos/page.dto';
import getSQLSearch from 'common/utils/array/getSQLSearch';
import getErrorMessage from 'common/utils/errors/getErrorMessage';

import { CreateProductDto } from 'dto/Product/CreateProductDto';
import { UpdateProductDto } from 'dto/Product/UpdateProductDto';

import { Product } from 'model/product/Product';
import { AllowedProductRelations } from 'controller/ProductController';

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

    async createOne(createProductDto: CreateProductDto, userId: string): Promise<InsertResult> {
        try {
            createProductDto.last_changed_by = userId;
            createProductDto.created_by = userId;
            createProductDto.create_date = new Date();
            createProductDto.last_change_date = new Date();

            return await this.productRepository.upsert(createProductDto, {
                conflictPaths: ['name', 'maker', 'model'],
                skipUpdateIfNoValuesChanged: true
            });
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
            const includedInSearchFields = ['name', 'maker', 'model', 'vendor_code'];

            const options = {
                ...(filters && filters)
                // ...(filters.price?.[0] &&
                //     filters.price?.[1] && {
                //         price: (
                //             LessThanOrEqual(filters.price[0]) && MoreThanOrEqual(filters.price[1])
                //         ).value
                //     }),

                // ...(filters.supplier_price?.[0] &&
                //     filters.supplier_price?.[1] && {
                //         supplier_price: {
                //             price: (
                //                 LessThanOrEqual(filters.supplier_price[0]) &&
                //                 MoreThanOrEqual(filters.supplier_price[1])
                //             ).value
                //         }
                //     }),
                // ...(filters.market_price?.[0] &&
                //     filters.market_price?.[1] && {
                //         market_price: {
                //             price: (
                //                 LessThanOrEqual(filters.market_price[0]) &&
                //                 MoreThanOrEqual(filters.market_price[1])
                //             ).value
                //         }
                //     })
            };

            const queryBuilder = this.productRepository.createQueryBuilder(
                Product.name.toLowerCase()
            );

            if (pageOptionsDto.searchBy) {
                queryBuilder.where(
                    getSQLSearch(includedInSearchFields, Product.name.toLowerCase()),
                    {
                        s: `%${pageOptionsDto.searchBy}%`
                    }
                );
            }

            queryBuilder.where(options);

            queryBuilder
                .orderBy(`${Product.name.toLowerCase()}.last_change_date`, pageOptionsDto.order)
                .skip(pageOptionsDto.skip)
                .take(pageOptionsDto.limit);

            if (relations.length > 0) {
                relations.forEach((relation) => {
                    queryBuilder.leftJoinAndSelect(
                        `${Product.name.toLowerCase()}.${relation}`,
                        relation
                    );
                });
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
