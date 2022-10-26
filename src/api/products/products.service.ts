import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { MulterFile } from 'api/files/interface/multer.interface';
import * as moment from 'moment';
import { Model } from 'mongoose';
import { Pagination } from 'src/common/interfaces/utils.interface';
import { paginate } from 'src/common/utils/index';
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

    async findByQuery(parameter: string, page: number, limit: number): Promise<Pagination> {
        let options = {};

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

        const total = await this.productModel.count(options).exec();
        const query = this.productModel.find(options);
        return paginate(page, query, limit, total);
    }

    async findOne(_id: string): Promise<Product> {
        return await this.productModel.findOne({ _id });
    }

    async update(id: string, updateProductDto: UpdateProductDto): Promise<Product> {
        return await this.productModel.findOneAndUpdate(
            { _id: id },
            { ...updateProductDto },
            { returnNewDocument: true, returnOriginal: false }
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
