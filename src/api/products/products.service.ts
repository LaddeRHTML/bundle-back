import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { MulterFile } from 'api/files/interface/multer.interface';
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
                const product = new CreateProductDto();

                product.category = i?.category;
                product.name = p?.[1] || '';
                product.marketprice = p?.[2] || 0;
                product.price = p?.[3] || 0;
                product.supplierPrice = p?.[4] || 0;
                product.warrantyDays = (p?.[5] as unknown as number) * 30.4166667 || 0;

                return product;
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
