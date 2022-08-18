import { paginate } from '../../utils/index';
import { PaginationTypes } from '../../../dist/interfaces/utils.interface';
import { UpdateAssemblyDto } from './dto/update-assemblies.dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateAssemblyDto } from './dto/create-assemblies.dto';
import { AssembliesDocument } from './assemblies.schema';
import { Assembly } from './assemblies.schema';

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
