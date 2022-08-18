import { UpdateProductDto } from './dto/update-product.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { paginate } from 'utils/index';
import { PaginationTypes } from 'interfaces/utils.interface';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductsDocument } from './products.schema';

@Injectable()
export class ProductsService {
    constructor(@InjectModel('products') private productModel: Model<ProductsDocument>) {}

    async create(createProductDto: CreateProductDto): Promise<Product> {
        return await this.productModel.create(createProductDto);
    }

    async findAll(): Promise<Product[]> {
        return await this.productModel.find({});
    }

    async findSortedItems(page: number, limit: number): Promise<PaginationTypes> {
        const total = await this.productModel.count({}).exec();
        const query = this.productModel.find({});
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
}
