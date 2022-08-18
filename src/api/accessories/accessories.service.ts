import { paginate } from './../../utils/index';
import { PaginationTypes } from './../../../dist/interfaces/utils.interface.d';
import { UpdateAccessoryDto } from './dto/update-accessories.dto';
import { Injectable, UseGuards } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateAccessoryDto } from './dto/create-accessories.dto';
import { AccessoriesDocument } from './accessories.schema';
import { Accessory } from './accessories.schema';

@Injectable()
export class AccessoriesService {
    constructor(@InjectModel('accessories') private accessoryModel: Model<AccessoriesDocument>) {}

    async create(createAccessoryDto: CreateAccessoryDto): Promise<Accessory> {
        return await this.accessoryModel.create(createAccessoryDto);
    }

    async findAll(): Promise<Accessory[]> {
        return await this.accessoryModel.find({});
    }

    async findSortedItems(page: number, limit: number): Promise<PaginationTypes> {
        const total = await this.accessoryModel.count({}).exec();
        const query = this.accessoryModel.find({});
        return paginate(page, query, limit, total);
    }

    async findOne(_id: string): Promise<Accessory> {
        return await this.accessoryModel.findOne({ _id });
    }

    async update(id: string, updateAccessoryDto: UpdateAccessoryDto): Promise<Accessory> {
        return await this.accessoryModel.findOneAndUpdate(
            { _id: id },
            { ...updateAccessoryDto },
            { returnNewDocument: true, returnOriginal: false }
        );
    }

    async remove(_id: string): Promise<Accessory> {
        return await this.accessoryModel.findOneAndRemove({ _id });
    }
}
