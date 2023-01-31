import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Pagination } from 'src/common/interfaces/utils.interface';
import { paginate } from 'src/common/utils/index';

import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationDto } from './dto/update-application.dto';
import { Application, ApplicationsDocument } from './schema/applications.schema';

@Injectable()
export class ApplicationsService {
    constructor(
        @InjectModel(Application.name) private applicationsModel: Model<ApplicationsDocument>
    ) {}

    async createOne(createApplicationDto: CreateApplicationDto): Promise<Application> {
        return await this.applicationsModel.create(createApplicationDto);
    }

    async findSortedItems(page: number, limit: number): Promise<Pagination<Application[]>> {
        const total = await this.applicationsModel.count({}).exec();
        const query = this.applicationsModel.find({});
        return paginate(page, query, limit, total);
    }

    async findAll(): Promise<Application[]> {
        return await this.applicationsModel.find({});
    }

    async findOne(_id: string): Promise<Application> {
        return await this.applicationsModel.findOne({ _id });
    }

    async update(_id: string, updateApplicationDto: UpdateApplicationDto): Promise<Application> {
        return await this.applicationsModel.findOneAndUpdate(
            { _id },
            { ...updateApplicationDto },
            { new: true }
        );
    }

    async remove(id: string) {
        return await this.applicationsModel.findByIdAndDelete({ _id: id });
    }
}
