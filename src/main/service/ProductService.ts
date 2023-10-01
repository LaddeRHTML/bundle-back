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
import * as XLSX from 'xlsx';
import * as moment from 'moment';

import { PageMetaDto } from 'common/pagination/dtos/page-meta.dto';
import { PageOptionsDto } from 'common/pagination/dtos/page-options.dto';
import { PageDto } from 'common/pagination/dtos/page.dto';
import getErrorMessage from 'common/utils/errors/getErrorMessage';

import { CreateProductDto } from 'dto/Product/CreateProductDto';
import { UpdateProductDto } from 'dto/Product/UpdateProductDto';

import { Product } from 'model/product/Product';
import { AllowedProductRelations } from 'controller/ProductController';
import { SqlSearch } from 'common/utils/array/SqlSearch';
import { ExcelSheetProduct, SuccessfullyUpdatedEntityResponse } from 'common/interfaces';
import { MulterFile } from './FileService';
import { SortExcelSheetData } from 'common/utils/array/sortExcelSheetData';

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

    get name() {
        return Product.name.toLowerCase();
    }

    async createOne(createProductDto: CreateProductDto, userId: string): Promise<Product> {
        try {
            createProductDto.lastChangedBy = userId;
            createProductDto.createdBy = userId;
            createProductDto.createDate = new Date();
            createProductDto.lastChangeDate = new Date();

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

    async findOneById(id: string, relations: AllowedProductRelations) {
        try {
            return await this.productRepository.findOne({
                where: { id },
                relations
            });
        } catch (error) {
            throw new Error(`product.service | findOneById error: ${getErrorMessage(error)}`);
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
            const sqlSearch = new SqlSearch();

            const options = {
                ...(filters && filters)
            };

            const queryBuilder = this.productRepository.createQueryBuilder(this.name);

            if (pageOptionsDto.searchBy) {
                queryBuilder.where(
                    sqlSearch.getSearchableFieldsSql(includedInSearchFields, this.name),
                    {
                        s: `%${pageOptionsDto.searchBy}%`
                    }
                );
            }

            queryBuilder.andWhere(options);

            queryBuilder
                .orderBy(`${this.name}.lastChangeDate`, pageOptionsDto.order)
                .skip(pageOptionsDto.skip)
                .take(pageOptionsDto.limit);

            if (relations.length > 0) {
                relations.forEach((relation) => {
                    queryBuilder.leftJoin(`${this.name}.${relation}`, relation);

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
            const message = 'Successfully updated!';

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

    async getDataFromExcel(file: MulterFile): Promise<CreateProductDto[]> {
        const wb: XLSX.WorkBook = XLSX.read(file.buffer);
        const ws = wb.Sheets[wb.SheetNames[0]];
        const data = XLSX.utils.sheet_to_json(ws, { header: 1 }) as ExcelSheetProduct[];

        const products = SortExcelSheetData(data).map((i) => {
            const productsFromExcel = i?.products.map((p) => {
                const productDto = new CreateProductDto();
                const productName = p?.[1] || '';
                const productModel = productName.split(',')[0];
                const marketPrice = p?.[2] || 0;
                const price = p?.[3] || 0;
                const supplierPrice = p?.[4] || 0;
                const warrantyDays = (p?.[5] as unknown as number) || 0;
                const countedWarranty = moment.duration(warrantyDays, 'months').asDays();
                const maker = productModel
                    .replace(/[^a-z ]/gi, '')
                    .trim()
                    .split(' ')[0];

                productDto.category = i?.category;
                productDto.name = productName;
                productDto.model = productModel;
                productDto.marketprice = marketPrice;
                productDto.price = price;
                productDto.supplierPrice = supplierPrice;
                productDto.warrantyDays = countedWarranty;
                productDto.maker = maker;
                productDto.count = 1;

                return productDto;
            });

            return productsFromExcel;
        });

        return products.flat(2);
    }

    async manipulateMultipleItems(products: CreateProductDto[], userId: string): Promise<void> {
        for (const p of products) {
            const existingProduct = await this.productRepository.findOne({
                where: {
                    name: p.name
                }
            });

            if (existingProduct) {
                await this.productRepository.save({
                    ...existingProduct,
                    ...p,
                    lastChangedBy: userId
                });
            } else {
                await this.productRepository.save({
                    ...p,
                    createdBy: userId,
                    lastChangedBy: userId
                });
            }
        }
    }
}
