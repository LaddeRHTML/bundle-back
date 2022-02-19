import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Application, ApplicationsDocument } from './applications.schema';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationDto } from './dto/update-application.dto';

@Injectable()
export class ApplicationsService {

  constructor(
    @InjectModel('applications') private applicationsModel: Model<ApplicationsDocument>
  ) {}

  create(createApplicationDto: CreateApplicationDto) {
    return this.applicationsModel.create(createApplicationDto);
  }

  findAll() {
    return this.applicationsModel.find({});
  }

  findOne(_id: string) {
    return this.applicationsModel.findOne({_id});
  }

  async update(_id: string, updateApplicationDto: UpdateApplicationDto): Promise<Application> {
    console.log(_id, updateApplicationDto);
    return await this.applicationsModel.findOneAndUpdate({_id}, {...updateApplicationDto}, {returnNewDocument: true, returnOriginal: false});
  }

  /* remove(id: number) {
    return `This action removes a #${id} application`;
  } */
}
