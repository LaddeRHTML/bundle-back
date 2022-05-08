import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Assembly } from '../dto/product.dto';
import { AssemblyDocument } from '../product.schema';

@Injectable()
export class AssemblyService {
    constructor(@InjectModel('assembly') private assemblyModel: Model<AssemblyDocument>) {}

    //@UseGuards(JwtAuthGuard)
    create(assembly: Assembly): Promise<Assembly> {
        const assemblyModel = new this.assemblyModel(assembly);
        return assemblyModel.save();
    }

    async findAll(): Promise<Assembly[]> {
        return await this.assemblyModel.find({});
    }

    async findOne(_id: string): Promise<Assembly> {
        return await this.assemblyModel.findOne({ _id });
    }

    async update(_id: string, assembly: Assembly): Promise<Assembly> {
        return await this.assemblyModel.findOneAndUpdate({ _id, assembly });
    }

    async remove(_id: string): Promise<Assembly> {
        return await this.assemblyModel.findOneAndRemove({ _id });
    }
}
