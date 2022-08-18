import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PaginationTypes } from 'interfaces/utils.interface';
import { paginate } from 'utils/index';
import { Application, ApplicationsDocument } from './applications.schema';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationDto } from './dto/update-application.dto';

@Injectable()
export class ApplicationsService {
    constructor(
        @InjectModel('applications') private applicationsModel: Model<ApplicationsDocument>
    ) {}

    async create(createApplicationDto: CreateApplicationDto): Promise<Application> {
        return await this.applicationsModel.create(createApplicationDto);
    }

    async findSortedItems(page: number, limit: number): Promise<PaginationTypes> {
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
            { returnNewDocument: true, returnOriginal: false }
        );
    }

    /* remove(id: number) {
    return `This action removes a #${id} application`;
  } */
}
