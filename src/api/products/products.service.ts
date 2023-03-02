import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { InjectRepository } from '@nestjs/typeorm';
import { Order, OrderDocument } from 'api/orders/schema/orders.schema';
import { DeleteResult } from 'interfaces/delete.result';
import * as moment from 'moment';
import {
    FilterQuery,
    Model,
    ProjectionType,
    QueryOptions,
    UpdateQuery,
    UpdateWithAggregationPipeline
} from 'mongoose';
import { Pagination } from 'src/common/interfaces/utils.interface';
import { PageMetaDto } from 'src/common/pagination/dtos/page-meta.dto';
import { PageOptionsDto } from 'src/common/pagination/dtos/page-options.dto';
import { PageDto } from 'src/common/pagination/dtos/page.dto';
import {
    Brackets,
    FindManyOptions,
    FindOneOptions,
    In,
    InsertResult,
    ObjectLiteral,
    Repository,
    UpdateResult
} from 'typeorm';
import getSQLSearch from 'utils/array/getSQLSearch';
import { SortExcelSheets } from 'utils/excel.sort';
import * as XLSX from 'xlsx';

import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entity/product.entity';
import {
    FilterProductsResponse,
    ProductsFilter,
    UpsertedProduct
} from './interfaces/products.filter.interface';
import { ExcelClearSheetProduct } from './types/excel.dealers.types';
import getCategories from './utils/getCategories';
import getMaker from './utils/getMaker';
import getName from './utils/getName';
import getPrice from './utils/getPrice';
import getTemplate from './utils/getTemplate';
import getWarranty from './utils/getWarranty';

const orderRef = 'orders';

@Injectable()
export class ProductsService {
    constructor(@InjectRepository(Product) private productRepository: Repository<Product>) {}

    async createOne(createProductDto: CreateProductDto, userId: string): Promise<InsertResult> {
        try {
            createProductDto.last_changed_by = userId;
            createProductDto.created_by = userId;
            createProductDto.create_date = new Date();
            createProductDto.last_change_date = new Date();

            return await this.productRepository.insert(createProductDto);
        } catch (error) {
            throw new Error(`product.service | createOne error: ${error.message}`);
        }
    }

    async findAll(): Promise<Product[]> {
        try {
            return await this.productRepository.find();
        } catch (error) {
            throw new Error(`product.service | findAll error: ${error.message}`);
        }
    }

    async findOne(parameter: FindOneOptions<Product>): Promise<Product> {
        try {
            return await this.productRepository.findOne(parameter);
        } catch (error) {
            throw new Error(`product.service | findOne error: ${error.message}`);
        }
    }

    async findAllBy(options: FindManyOptions<Product>): Promise<Product[]> {
        return await this.productRepository.find(options);
    }

    async findSome(
        pageOptionsDto: PageOptionsDto,
        filters: CreateProductDto
    ): Promise<PageDto<Product>> {
        try {
            const includedInSearchFields = ['name', 'maker', 'model', 'vendor_code'];

            //     const options = {
            //     ...(filters && filters),
            //     ...(filters.price?.[0] &&
            //         filters.price?.[1] && {
            //             price: { $gte: filters.price[0], $lte: filters.price[1] }
            //         }),

            //     ...(filters.supplier_price?.[0] &&
            //         filters.supplier_price?.[1] && {
            //             supplier_price: {
            //                 $gte: filters.supplier_price[0],
            //                 $lte: filters.supplier_price[1]
            //             }
            //         }),
            //     ...(filters.market_price?.[0] &&
            //         filters.market_price?.[1] && {
            //             market_price: {
            //                 $gte: filters.market_price[0],
            //                 $lte: filters.market_price[1]
            //             }
            //         }),
            //     ...(typeof filters.warranty_days === 'number' && {
            //         warranty_days: filters.warranty_days
            //     })
            // } as Brackets;

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

            if (filters) {
                queryBuilder.where({ filters });
            }

            queryBuilder
                .orderBy('user.registration_date', pageOptionsDto.order)
                .skip(pageOptionsDto.skip)
                .take(pageOptionsDto.limit);

            const total = await queryBuilder.getCount();
            const { entities } = await queryBuilder.getRawAndEntities();

            const pageMetaDto = new PageMetaDto({ pageOptionsDto, total });

            return new PageDto(entities, pageMetaDto);
        } catch (error) {
            throw new Error(`product.service | findSome error: ${error.message}`);
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
            throw new Error(`product.service | updateOne error: ${error.message}`);
        }
    }

    async updateMany(where: Brackets | ObjectLiteral, updateProductDto: UpdateProductDto) {
        try {
            console.log(where);
            // return await this.productRepository
            //     .createQueryBuilder()
            //     .update(Product)
            //     .where(where)
            //     .set({ ...updateProductDto, update_date: new Date() })
            //     .execute();
            return this.productRepository.save({
                ...updateProductDto,
                last_change_date: new Date()
            });
        } catch (error) {
            throw new Error(`users.service | updateMany error: ${error.message}`);
        }
    }

    /* Вернуться после обновления заказов */
    // async removeOne(id: string): Promise<Product> {
    //     const updatedOrders = await this.orderModel.updateMany(
    //         { products: { $in: id } },
    //         { $pull: { products: { $in: id } } },
    //         { new: false }
    //     );

    //     if (!updatedOrders.acknowledged) {
    //         throw new HttpException(
    //             'An error occurred while after updating orders!',
    //             HttpStatus.NOT_ACCEPTABLE
    //         );
    //     }

    //     return await this.productModel.findOneAndRemove({ _id: id });
    // }

    // async removeImported(): Promise<DeleteResult> {
    //     return await this.productModel.deleteMany({ is_imported: true });
    // }

    async updateVisiblityOfImportedProducts(is_hidden: boolean) {
        try {
            return await this.updateMany({ is_imported: true }, { is_hidden });
        } catch (error) {
            throw new Error(
                `prodct.service | updateVisiblityOfImportedProducts error: ${error.message}`
            );
        }
    }

    // getDataFromExcel(file: MulterFile) {
    //     const wb: XLSX.WorkBook = XLSX.read(file.buffer);
    //     const ws = wb.Sheets[wb.SheetNames[0]];
    //     const data: ExcelClearSheetProduct[] = XLSX.utils.sheet_to_json(ws, { header: 1 });

    //     const products = SortExcelSheets(data).map((i) => {
    //         const productsFromExcel = i?.products.map((p) => {
    //             const productDto = new CreateProductDto();
    //             const warranty_days = (p?.[5] as unknown as number) || 0;
    //             const vendor_code = p?.[0] || 0;
    //             const product_name = p?.[1] || '';
    //             const market_price = p?.[2] || 0;
    //             const price = p?.[3] || 0;
    //             const supplier_price = p?.[4] || 0;

    //             const productModel = getName(product_name);
    //             const countedWarranty = getWarranty(warranty_days);
    //             const maker = getMaker(productModel);

    //             productDto.vendor_code = vendor_code.toString();
    //             productDto.categories = getCategories(product_name, i?.category);
    //             productDto.name = product_name;
    //             productDto.model = productModel;
    //             productDto.market_price = market_price;
    //             productDto.price = getPrice(price);
    //             productDto.supplier_price = supplier_price;
    //             productDto.warranty_days = countedWarranty;
    //             productDto.maker = maker;
    //             productDto.count = 1;
    //             productDto.is_imported = true;
    //             // productDto.template = getTemplate(productDto.categories);

    //             return productDto;
    //         });

    //         return productsFromExcel;
    //     });

    //     return products.flat(2);
    // }

    // async manipulateMultipleItems(products: CreateProductDto[]) {

    //     try {

    //         return await new Promise(async (resolve, reject) => {
    //             const affectedProductsIds = [];

    //             for (const p of products) {
    //                 await this.productModel
    //                     .findOneAndUpdate({ name: p.name }, p, {
    //                         upsert: true,
    //                         new: true
    //                     })
    //                     .then((p) => {
    //                         if (p._id) {
    //                             affectedProductsIds.push(p._id.toString());
    //                         }
    //                     })
    //                     .catch((error) => {
    //                         reject(error);
    //                     });
    //             }
    //             const allProducts = await this.findAllBy();

    //             const notAffectedProducts =
    //                 affectedProductsIds.length !== 0 &&
    //                 allProducts.filter((p) => !affectedProductsIds.includes(p['_id'].toString()));

    //             if (notAffectedProducts.length !== 0) {
    //                 for (const p of notAffectedProducts) {
    //                     await this.productModel
    //                         .updateOne({ name: p.name }, { count: 0 })
    //                         .catch((error) => {
    //                             reject(error);
    //                         });
    //                 }
    //             }
    //             resolve({ affectedProductsIds, notAffectedProducts, allProducts });
    //         });
    //     } catch (error) {
    //         throw new Error(`prodct.service | manipulateMultipleItems error: ${error.message}`);

    //     }

    // }
}
