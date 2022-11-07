import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { MulterFile } from 'api/files/interface/multer.interface';
import * as moment from 'moment';
import { Model, QueryOptions } from 'mongoose';
import { Pagination } from 'src/common/interfaces/utils.interface';
import { SortExcelSheetData } from 'utils/excel.sort';
import * as XLSX from 'xlsx';

import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product, ProductsDocument } from './schema/products.schema';

@Injectable()
export class ProductsService {
    constructor(
        @InjectModel(Product.name) private readonly productModel: Model<ProductsDocument>
    ) {}

    async create(createProductDto: CreateProductDto): Promise<Product> {
        return await this.productModel.create(createProductDto);
    }

    async findAll(): Promise<Product[]> {
        return await this.productModel.find({});
    }

    async findAllByNames(names: string[]): Promise<Product[]> {
        return await this.productModel.find({ name: { $in: names } });
    }

    async findByQuery(
        parameter: string,
        page: number,
        limit: number,
        category: string
    ): Promise<Pagination> {
        let options = {} as QueryOptions;

        if (parameter) {
            options = {
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
        const minMaxValues = await this.productModel.aggregate([
            {
                $facet: {
                    min: [{ $sort: { price: 1 } }, { $limit: 1 }],
                    max: [{ $sort: { price: -1 } }, { $limit: 1 }]
                }
            },
            {
                $project: {
                    name: 'price',
                    minPrice: { $first: '$min.price' },
                    maxPrice: { $first: '$max.price' },
                    minMarketPrice: { $first: '$min.marketPrice' },
                    maxMarketPrice: { $first: '$max.marketPrice' },
                    minSupplierPrice: { $first: '$min.supplierPrice' },
                    maxSupplierPrice: { $first: '$max.supplierPrice' },
                    minCount: { $first: '$min.count' },
                    maxCount: { $first: '$max.count' },
                    minWarrantyDays: { $first: '$min.warrantyDays' },
                    maxWarrantyDays: { $first: '$max.warrantyDays' }
                }
            }
        ]);

        const warrantyVariations = await this.productModel.distinct('warrantyDays');

        const total = await this.productModel.count(options).exec();
        const lastPage = Math.ceil(total / limit);
        const data = await this.productModel
            .find(options)
            .skip((page - 1) * limit)
            .limit(limit)
            .exec();

        const sortedData = {
            data,
            total,
            page,
            lastPage,
            minMaxValues,
            warrantyVariations
        };

        return sortedData;
    }

    async findOne(_id: string): Promise<Product> {
        return await this.productModel.findOne({ _id });
    }

    async update(id: string, updateProductDto: UpdateProductDto): Promise<Product> {
        return await this.productModel.findOneAndUpdate(
            { _id: id },
            { ...updateProductDto },
            { new: true }
        );
    }

    async remove(_id: string): Promise<Product> {
        return await this.productModel.findOneAndRemove({ _id });
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

    async manipulateMultipleItems(products: CreateProductDto[]) {
        return products.forEach(async (p) => {
            await this.productModel.findOneAndUpdate({ name: p.name }, p, { upsert: true });
        });
    }
}
