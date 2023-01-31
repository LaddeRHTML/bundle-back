import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Pagination } from 'src/common/interfaces/utils.interface';
import { paginate } from 'src/common/utils/index';

import { CreateAssemblyDto } from './dto/create-assemblies.dto';
import { UpdateAssemblyDto } from './dto/update-assemblies.dto';
import { AssembliesDocument } from './schema/assemblies.schema';
import { Assembly } from './schema/assemblies.schema';

@Injectable()
export class AssembliesService {
    constructor(
        @InjectModel(Assembly.name) private readonly assemblyModel: Model<AssembliesDocument>
    ) {}

    async createOne(createAssemblyDto: CreateAssemblyDto): Promise<Assembly> {
        return await this.assemblyModel.create(createAssemblyDto);
    }

    async findAll(): Promise<Assembly[]> {
        return await this.assemblyModel.find({});
    }

    async findSortedItems(page: number, limit: number): Promise<Pagination<Assembly[]>> {
        const total = await this.assemblyModel.count({}).exec();
        const query = this.assemblyModel.find({});
        return paginate(page, query, limit, total);
    }

    async findOne(_id: string): Promise<Assembly> {
        return await this.assemblyModel.findOne({ _id });
    }

    async update(id: string, updateAssemblyDto: UpdateAssemblyDto): Promise<Assembly> {
        return await this.assemblyModel.findOneAndUpdate(
            { _id: id },
            { ...updateAssemblyDto },
            { new: true }
        );
    }

    async remove(_id: string): Promise<Assembly> {
        return await this.assemblyModel.findOneAndRemove({ _id });
    }
}
