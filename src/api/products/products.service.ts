import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { MulterFile } from 'api/files/interface/multer.interface';
import { Order, OrderDocument } from 'api/orders/schema/orders.schema';
import { DeleteResult } from 'interfaces/delete.result';
import { UpdateResult } from 'interfaces/update.ruslt';
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
import { SortExcelSheetData } from 'utils/excel.sort';
import * as XLSX from 'xlsx';

import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FilterProductsResponse, ProductsFilter } from './interfaces/products.filter.interface';
import { Product, ProductsDocument } from './schema/products.schema';

const orderRef = 'orders';

@Injectable()
export class ProductsService {
    constructor(
        @InjectModel(Product.name) private readonly productModel: Model<ProductsDocument>,
        @InjectModel(Order.name) private readonly orderModel: Model<OrderDocument>
    ) {}

    async createOne(createProductDto: CreateProductDto): Promise<Product> {
        return await this.productModel.create(createProductDto);
    }

    async findAllBy(
        filter?: FilterQuery<ProductsDocument>,
        projection?: ProjectionType<ProductsDocument>
    ): Promise<Product[]> {
        return await this.productModel.find(filter, projection);
    }

    async findAllWithOutPopulating(
        filter?: FilterQuery<ProductsDocument>,
        projection?: ProjectionType<ProductsDocument>
    ): Promise<Product[]> {
        return await this.productModel.find(filter, projection);
    }

    async findAllByNames(names: string[]): Promise<Product[]> {
        return await this.productModel.find({ name: { $in: names } });
    }

    async findByFilters(
        parameter: string,
        page: number,
        limit: number,
        onlyOrdered: boolean,
        category: string,
        filters: CreateProductDto
    ): Promise<Pagination<Product[]>> {
        let options = {
            ...(onlyOrdered && {
                includedInOrders: {
                    $exists: onlyOrdered,
                    $not: { $size: 0 }
                }
            }),
            ...(category && {
                category
            }),
            ...(filters && filters),
            ...(filters.price?.[0] &&
                filters.price?.[1] && {
                    price: { $gte: filters.price[0], $lte: filters.price[1] }
                }),

            ...(filters.supplierPrice?.[0] &&
                filters.supplierPrice?.[1] && {
                    supplierPrice: {
                        $gte: filters.supplierPrice[0],
                        $lte: filters.supplierPrice[1]
                    }
                }),
            ...(filters.marketPrice?.[0] &&
                filters.marketPrice?.[1] && {
                    marketPrice: {
                        $gte: filters.marketPrice[0],
                        $lte: filters.marketPrice[1]
                    }
                }),
            ...(typeof filters.warrantyDays === 'number' && {
                warrantyDays: filters.warrantyDays
            })
        } as FilterQuery<ProductsDocument>;

        if (parameter) {
            options = {
                ...options,
                $or: [
                    {
                        category: new RegExp(parameter, 'i')
                    },
                    {
                        name: new RegExp(parameter, 'i')
                    },
                    {
                        maker: new RegExp(parameter, 'i')
                    },
                    {
                        model: new RegExp(parameter, 'i')
                    }
                ]
            };
        }

        const total = await this.productModel.count(options).exec();
        const lastPage = Math.ceil(total / limit);
        const data = await this.productModel
            .find(options)
            .skip((page - 1) * limit)
            .limit(limit)
            .exec();

        return {
            data,
            total,
            page,
            lastPage
        };
    }

    async getMinMaxValues(): Promise<FilterProductsResponse> {
        const minMaxValues = await this.productModel.aggregate([
            {
                $facet: {
                    min: [{ $sort: { price: 1 } }, { $limit: 1 }],
                    max: [{ $sort: { price: -1 } }, { $limit: 1 }]
                }
            },
            {
                $project: {
                    price: [{ $first: '$min.price' }, { $first: '$max.price' }],
                    marketPrice: [{ $first: '$min.marketPrice' }, { $first: '$max.marketPrice' }],
                    supplierPrice: [
                        { $first: '$min.supplierPrice' },
                        { $first: '$max.supplierPrice' }
                    ]
                }
            }
        ]);

        const warrantyVariations = await this.productModel.distinct('warrantyDays');

        return {
            minMaxValues: minMaxValues?.[0],
            warrantyVariations
        };
    }

    async findOneById(_id: string): Promise<Product> {
        return await this.productModel.findOne({ _id });
    }

    async updateById(id: string, updateProductDto: UpdateProductDto): Promise<Product> {
        return await this.productModel.findOneAndUpdate(
            { _id: id },
            { ...updateProductDto },
            { new: true }
        );
    }

    async updateMany(
        filter: FilterQuery<ProductsDocument>,
        parameter: UpdateWithAggregationPipeline | UpdateQuery<ProductsDocument>,
        settings?: QueryOptions
    ): Promise<UpdateResult> {
        return (await this.productModel.updateMany(filter, parameter, {
            ...settings,
            new: true
        })) as unknown as UpdateResult;
    }

    async removeOne(id: string): Promise<Product> {
        const updatedOrders = await this.orderModel.updateMany(
            { products: { $in: id } },
            { $pull: { products: { $in: id } } },
            { new: false }
        );

        if (!updatedOrders.acknowledged) {
            throw new HttpException(
                'An error occurred while after updating orders!',
                HttpStatus.NOT_ACCEPTABLE
            );
        }

        return await this.productModel.findOneAndRemove({ _id: id });
    }

    async removeImported(): Promise<DeleteResult> {
        return await this.productModel.deleteMany({ isImported: true });
    }

    async updateVisiblityOfImportedProducts(isHidden: boolean): Promise<UpdateResult> {
        try {
            return await this.updateMany(
                { isImported: { $in: true } },
                { $set: { isHidden } },
                { new: false }
            );
        } catch (error) {
            throw new HttpException('', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    getDataFromExcel(file: MulterFile) {
        const wb: XLSX.WorkBook = XLSX.read(file.buffer);
        const ws = wb.Sheets[wb.SheetNames[0]];
        const data = XLSX.utils.sheet_to_json(ws, { header: 1 });

        const products = SortExcelSheetData(data).map((i) => {
            const productsFromExcel = i?.products.map((p) => {
                const productDto = new CreateProductDto();
                const vendorСode = p?.[0] || 0;
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

                productDto.vendorСode = vendorСode.toString();
                productDto.category = i?.category;
                productDto.name = productName;
                productDto.model = productModel;
                productDto.marketPrice = marketPrice;
                productDto.price = price;
                productDto.supplierPrice = supplierPrice;
                productDto.warrantyDays = countedWarranty;
                productDto.maker = maker;
                productDto.count = 1;
                productDto.isImported = true;

                return productDto;
            });

            return productsFromExcel;
        });

        return products.flat(2);
    }

    async manipulateMultipleItems(products: CreateProductDto[]) {
        return products.forEach(async (p) => {
            return await this.productModel.findOneAndUpdate({ name: p.name }, p, { upsert: true });
        });
    }
}
