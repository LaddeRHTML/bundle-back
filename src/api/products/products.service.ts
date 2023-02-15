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
import { SortExcelSheets } from 'utils/excel.sort';
import * as XLSX from 'xlsx';

import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import {
    FilterProductsResponse,
    ProductsFilter,
    UpsertedProduct
} from './interfaces/products.filter.interface';
import { Product, ProductsDocument } from './schema/products.schema';
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
        filters: CreateProductDto
    ): Promise<Pagination<Product[]>> {
        let options = {
            ...(filters && filters),
            ...(filters.price?.[0] &&
                filters.price?.[1] && {
                    price: { $gte: filters.price[0], $lte: filters.price[1] }
                }),

            ...(filters.supplier_price?.[0] &&
                filters.supplier_price?.[1] && {
                    supplier_price: {
                        $gte: filters.supplier_price[0],
                        $lte: filters.supplier_price[1]
                    }
                }),
            ...(filters.market_price?.[0] &&
                filters.market_price?.[1] && {
                    market_price: {
                        $gte: filters.market_price[0],
                        $lte: filters.market_price[1]
                    }
                }),
            ...(typeof filters.warranty_days === 'number' && {
                warranty_days: filters.warranty_days
            })
        } as FilterQuery<ProductsDocument>;

        if (parameter) {
            options = {
                ...options,
                $or: [
                    {
                        name: new RegExp(parameter, 'i')
                    },
                    {
                        maker: new RegExp(parameter, 'i')
                    },
                    {
                        model: new RegExp(parameter, 'i')
                    },
                    {
                        vendor_code: new RegExp(parameter, 'i')
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
                    market_price: [
                        { $first: '$min.market_price' },
                        { $first: '$max.market_price' }
                    ],
                    supplier_price: [
                        { $first: '$min.supplier_price' },
                        { $first: '$max.supplier_price' }
                    ]
                }
            }
        ]);

        const warrantyVariations = await this.productModel.distinct('warranty_days');

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
        return await this.productModel.deleteMany({ is_imported: true });
    }

    async updateVisiblityOfImportedProducts(is_hidden: boolean): Promise<UpdateResult> {
        try {
            return await this.updateMany(
                { is_imported: { $in: true } },
                { $set: { is_hidden } },
                { new: false }
            );
        } catch (error) {
            throw new HttpException('', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    getDataFromExcel(file: MulterFile) {
        const wb: XLSX.WorkBook = XLSX.read(file.buffer);
        const ws = wb.Sheets[wb.SheetNames[0]];
        const data: ExcelClearSheetProduct[] = XLSX.utils.sheet_to_json(ws, { header: 1 });

        const products = SortExcelSheets(data).map((i) => {
            const productsFromExcel = i?.products.map((p) => {
                const productDto = new CreateProductDto();
                const warranty_days = (p?.[5] as unknown as number) || 0;
                const vendor_code = p?.[0] || 0;
                const product_name = p?.[1] || '';
                const market_price = p?.[2] || 0;
                const price = p?.[3] || 0;
                const supplier_price = p?.[4] || 0;

                const productModel = getName(product_name);
                const countedWarranty = getWarranty(warranty_days);
                const maker = getMaker(productModel);

                productDto.vendor_code = vendor_code.toString();
                productDto.categories = getCategories(product_name, i?.category);
                productDto.name = product_name;
                productDto.model = productModel;
                productDto.market_price = market_price;
                productDto.price = getPrice(price);
                productDto.supplier_price = supplier_price;
                productDto.warranty_days = countedWarranty;
                productDto.maker = maker;
                productDto.count = 1;
                productDto.is_imported = true;
                productDto.template = getTemplate(productDto.categories);

                return productDto;
            });

            return productsFromExcel;
        });

        return products.flat(2);
    }

    async manipulateMultipleItems(products: CreateProductDto[]) {
        return await new Promise(async (resolve, reject) => {
            const affectedProductsIds = [];

            for (const p of products) {
                await this.productModel
                    .findOneAndUpdate({ name: p.name }, p, {
                        upsert: true,
                        new: true
                    })
                    .then((p) => {
                        if (p._id) {
                            affectedProductsIds.push(p._id.toString());
                        }
                    })
                    .catch((error) => {
                        reject(error);
                    });
            }
            const allProducts = await this.findAllBy();

            const notAffectedProducts =
                affectedProductsIds.length !== 0 &&
                allProducts.filter((p) => !affectedProductsIds.includes(p['_id'].toString()));

            if (notAffectedProducts.length !== 0) {
                for (const p of notAffectedProducts) {
                    await this.productModel
                        .updateOne({ name: p.name }, { count: 0 })
                        .catch((error) => {
                            reject(error);
                        });
                }
            }
            resolve({ affectedProductsIds, notAffectedProducts, allProducts });
        });
    }
}
