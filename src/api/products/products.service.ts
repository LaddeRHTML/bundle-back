import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ClientsService } from 'api/clients/clients.service';
import { Client, ClientDocument } from 'api/clients/schema/clients.schema';
import { MulterFile } from 'api/files/interface/multer.interface';
import { Order, OrderDocument } from 'api/orders/schema/orders.schema';
import * as moment from 'moment';
import mongoose, {
    Callback,
    FilterQuery,
    Model,
    ProjectionType,
    QueryOptions,
    UpdateQuery,
    UpdateWithAggregationPipeline
} from 'mongoose';
import { Pagination } from 'src/common/interfaces/utils.interface';
import { paginate } from 'src/common/utils/index';
import { SortExcelSheetData } from 'utils/excel.sort';
import * as XLSX from 'xlsx';

import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product, ProductsDocument } from './schema/products.schema';

const orderRef = 'includedInOrders';
const clientRef = 'buyers';

@Injectable()
export class ProductsService {
    constructor(
        @InjectModel(Product.name) private readonly productModel: Model<ProductsDocument>,
        @InjectModel(Order.name) private readonly orderModel: Model<OrderDocument>,
        @InjectModel(Client.name) private readonly clientModel: Model<ClientDocument>,
        private readonly clientsService: ClientsService
    ) {}

    async create(createProductDto: CreateProductDto): Promise<Product> {
        return await this.productModel.create(createProductDto);
    }

    async findAllBy(
        filter?: FilterQuery<ProductsDocument>,
        projection?: ProjectionType<ProductsDocument>
    ): Promise<Product[]> {
        return await this.productModel
            .find(filter, projection)
            .populate({ path: orderRef, model: this.orderModel })
            .populate({ path: clientRef, model: this.clientModel });
    }

    async findAllByWithOutPopulating(
        filter?: FilterQuery<ProductsDocument>,
        projection?: ProjectionType<ProductsDocument>
    ): Promise<Product[]> {
        return await this.productModel.find(filter, projection);
    }

    async findAllByNames(names: string[]): Promise<Product[]> {
        return await this.productModel
            .find({ name: { $in: names } })
            .populate({ path: orderRef, model: this.orderModel })
            .populate({ path: clientRef, model: this.clientModel });
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
        const query = this.productModel
            .find(options)
            .populate({ path: orderRef, model: this.orderModel })
            .populate({ path: clientRef, model: this.clientModel });
        return paginate(page, query, limit, total);
    }

    async findOneById(_id: string): Promise<Product> {
        return await this.productModel
            .findOne({ _id })
            .populate({ path: orderRef, model: this.orderModel })
            .populate({ path: clientRef, model: this.clientModel });
    }

    async updateById(id: string, updateProductDto: UpdateProductDto): Promise<Product> {
        console.log(id, updateProductDto);
        return await this.productModel
            .findOneAndUpdate({ _id: id }, { ...updateProductDto }, { new: true })
            .populate({ path: orderRef, model: this.orderModel })
            .populate({ path: clientRef, model: this.clientModel });
    }

    async updateMany(
        filter: FilterQuery<ProductsDocument>,
        parameter: UpdateWithAggregationPipeline | UpdateQuery<ProductsDocument>,
        settings?: QueryOptions
    ) {
        return await this.productModel
            .updateMany(filter, parameter, {
                ...settings,
                new: true
            })
            .populate({ path: orderRef, model: this.orderModel })
            .populate({ path: clientRef, model: this.clientModel });
    }

    async remove(id: string): Promise<Product> {
        const updatedOrders = await this.orderModel.updateMany(
            { orderedProducts: { $in: id } },
            { $pull: { orderedProducts: { $in: id } } },
            { new: false }
        );

        if (!updatedOrders.acknowledged) {
            throw new HttpException(
                'An error occurred while creating order!',
                HttpStatus.NOT_ACCEPTABLE
            );
        }

        return await this.productModel.findOneAndRemove({ _id: id });
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
            return await this.productModel.findOneAndUpdate({ name: p.name }, p, { upsert: true });
        });
    }
}
