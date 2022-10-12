import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PaginationTypes } from 'src/common/interfaces/utils.interface';
import { paginate } from 'src/utils/index';

import { AssembliesDocument } from './assemblies.schema';
import { Assembly } from './assemblies.schema';
import { CreateAssemblyDto } from './dto/create-assemblies.dto';
import { UpdateAssemblyDto } from './dto/update-assemblies.dto';

@Injectable()
export class AssembliesService {
    constructor(@InjectModel('assemblies') private assemblyModel: Model<AssembliesDocument>) {}

    async create(createAssemblyDto: CreateAssemblyDto): Promise<Assembly> {
        return await this.assemblyModel.create(createAssemblyDto);
    }

    async findAll(): Promise<Assembly[]> {
        return await this.assemblyModel.find({});
    }

    async findSortedItems(page: number, limit: number): Promise<PaginationTypes> {
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
            { returnNewDocument: true, returnOriginal: false }
        );
    }

    async remove(_id: string): Promise<Assembly> {
        return await this.assemblyModel.findOneAndRemove({ _id });
    }
}
