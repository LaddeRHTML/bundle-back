import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PaginationTypes } from 'src/common/interfaces/utils.interface';
import { paginate } from 'src/utils/index';
import { calcRelToCurrentDate } from 'src/utils/index';

import { Client, ClientDocument } from './clients.schema';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';

@Injectable()
export class ClientsService {
    constructor(@InjectModel('clients') private clientModel: Model<ClientDocument>) {}

    async create(createClientDto: CreateClientDto): Promise<Client> {
        try {
            createClientDto.age = calcRelToCurrentDate(createClientDto.birthDay, true);

            return await this.clientModel.create(createClientDto);
        } catch (error) {
            throw new HttpException(error, HttpStatus.NOT_ACCEPTABLE);
        }
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
                $or: [
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
            };
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
        try {
            if (updateClientDto?.birthDay) {
                updateClientDto.age = calcRelToCurrentDate(updateClientDto?.birthDay, true);
            }

            return await this.clientModel.findByIdAndUpdate(id, updateClientDto, { settings });
        } catch (error) {
            throw new HttpException(error, HttpStatus.NOT_ACCEPTABLE);
        }
    }

    /* remove(id: number) {
        return `This action removes a #${id} client`;
    } */
}
