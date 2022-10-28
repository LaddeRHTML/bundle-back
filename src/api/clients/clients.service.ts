import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ConfigurationService } from 'config/configuration.service';
import { Model } from 'mongoose';
import { Pagination } from 'src/common/interfaces/utils.interface';
import { paginate } from 'src/common/utils/index';
import { calcRelToCurrentDate } from 'src/common/utils/index';

import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { UpdateSettings } from './interface/client.update.gui.interface';
import { Client, ClientDocument } from './schema/clients.schema';

@Injectable()
export class ClientsService {
    constructor(
        @InjectModel(Client.name) private readonly clientModel: Model<ClientDocument>,
        private readonly configService: ConfigurationService
    ) {}

    async create(createClientDto: CreateClientDto): Promise<Client> {
        try {
            createClientDto.age = calcRelToCurrentDate(createClientDto.birthDay, true);

            return await this.clientModel.create(createClientDto);
        } catch (error) {
            throw new HttpException(error, HttpStatus.NOT_ACCEPTABLE);
        }
    }

    async findByQuery(parameter: string, page: number, limit: number): Promise<Pagination> {
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
        const query = this.clientModel.find(options).populate(this.configService.orderRef);
        return paginate(page, query, limit, total);
    }

    async findAll(): Promise<Client[]> {
        return await this.clientModel.find({}).populate(this.configService.orderRef);
    }

    async findOne(_id: string): Promise<Client> {
        return await this.clientModel.findOne({ _id }).populate(this.configService.orderRef);
    }

    async update(
        id: string,
        updateClientDto: UpdateClientDto,
        settings?: UpdateSettings
    ): Promise<Client> {
        try {
            if (updateClientDto?.birthDay) {
                updateClientDto.age = calcRelToCurrentDate(updateClientDto?.birthDay, true);
            }

            return await this.clientModel.findByIdAndUpdate(id, updateClientDto, { settings });
        } catch (error) {
            throw new HttpException(error, HttpStatus.NOT_ACCEPTABLE);
        }
    }

    async remove(id: string) {
        return await this.clientModel.findOneAndDelete({ _id: id });
    }
}
