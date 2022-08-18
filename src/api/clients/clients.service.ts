import { paginate } from 'utils/index';
import { Client, ClientDocument } from './clients.schema';
import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { Model } from 'mongoose';
import { calcRelToCurrentDate } from 'utils/index';
import { PaginationTypes } from 'interfaces/utils.interface';

@Injectable()
export class ClientsService {
    constructor(@InjectModel('clients') private clientModel: Model<ClientDocument>) {}

    async create(createClientDto: CreateClientDto): Promise<Client> {
        createClientDto.age = calcRelToCurrentDate(createClientDto.birthDay, true);

        return await this.clientModel.create(createClientDto);
    }

    /* async findSortedItems(page: number, limit: number): Promise<PaginationTypes> {
        const total = await this.clientModel.count({}).exec();
        const query = this.clientModel.find({}).populate('orders');
        return paginate(page, query, limit, total);
    } */

    async findByQuery(parameter: string, page: number, limit: number): Promise<PaginationTypes> {
        let options = {};

        if (parameter) {
            options = {
                $or : [
                    {
                        address: new RegExp(parameter, 'i')
                    },
                    {
                        clientName: new RegExp(parameter, 'i')
                    },
                    {
                        famalyName: new RegExp(parameter, 'i')
                    },
                    {
                        phone: new RegExp(parameter, 'i')
                    },
                    {
                        email: new RegExp(parameter, 'i')
                    },
                    {
                        callManaged: new RegExp(parameter, 'i')
                    }
                ]
            }
        }

        const total = await this.clientModel.count(options).exec();
        const query = this.clientModel.find(options).populate('orders');
        return paginate(page, query, limit, total);
    }

    async findAll(): Promise<Client[]> {
        return await this.clientModel.find({}).populate('orders');
    }

    async findOne(_id: string): Promise<Client> {
        return await this.clientModel.findOne({ _id }).populate('orders');
    }

    async update(id: string, updateClientDto: UpdateClientDto, settings?: any): Promise<Client> {
        if (updateClientDto?.birthDay) {
            updateClientDto.age = calcRelToCurrentDate(updateClientDto?.birthDay, true);
        }

        return await this.clientModel.findByIdAndUpdate(id, updateClientDto, { settings });
    }

    /* remove(id: number) {
        return `This action removes a #${id} client`;
    } */
}
