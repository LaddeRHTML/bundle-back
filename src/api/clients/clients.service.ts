import { calcRelToAnyDate, paginate } from './../../utils/index';
import { Client, ClientDocument } from './clients.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { Model } from 'mongoose';
import { calcRelToCurrentDate } from 'src/utils';
import { PaginationTypes } from 'src/interfaces/utils.interface';

@Injectable()
export class ClientsService {
    constructor(@InjectModel('clients') private clientModel: Model<ClientDocument>) {}

    async create(createClientDto: CreateClientDto): Promise<Client> {
        createClientDto.age = calcRelToCurrentDate(createClientDto.birthDay, true);

        createClientDto.paymentRemainder =
            createClientDto.purchasedProductsPrice - createClientDto.payment;

        createClientDto.potentialProfit =
            createClientDto.marketPrice - createClientDto.supplierPrice;

        createClientDto.realProfit =
            createClientDto.purchasedProductsPrice - createClientDto.supplierPrice;

        createClientDto.daysInWarranty = calcRelToAnyDate(
            createClientDto.warrantyStartDate,
            createClientDto.warrantyEndDate,
            false
        );

        createClientDto.closeRequestInterval = calcRelToAnyDate(
            createClientDto.firstContactDate,
            createClientDto.deliveryDate,
            false
        );

        return await this.clientModel.create(createClientDto);
    }

    async findSortedItems(page: number, limit: number): Promise<PaginationTypes> {
        const total = await this.clientModel.count({}).exec();
        const query = this.clientModel.find({});
        return paginate(page, query, limit, total);
    }

    async findAll(): Promise<Client[]> {
        return await this.clientModel.find({});
    }

    async findOne(_id: string): Promise<Client> {
        return await this.clientModel.findOne({ _id });
    }

    async update(id: string, updateClientDto: UpdateClientDto): Promise<Client> {
        const client = await this.findOne(id);

        const purchasedProductsPrice = updateClientDto?.purchasedProductsPrice
            ? updateClientDto?.purchasedProductsPrice
            : client?.purchasedProductsPrice;
        const payment = updateClientDto?.payment ? updateClientDto?.payment : client?.payment;
        const marketPrice = updateClientDto?.marketPrice
            ? updateClientDto?.marketPrice
            : client?.marketPrice;
        const supplierPrice = updateClientDto?.supplierPrice
            ? updateClientDto?.supplierPrice
            : client?.supplierPrice;
        const warrantyStartDate = updateClientDto?.warrantyStartDate
            ? updateClientDto?.warrantyStartDate
            : client?.warrantyStartDate;
        const warrantyEndDate = updateClientDto?.warrantyEndDate
            ? updateClientDto?.warrantyEndDate
            : client?.warrantyEndDate;
        const firstContactDate = updateClientDto?.firstContactDate
            ? updateClientDto?.firstContactDate
            : client?.firstContactDate;
        const deliveryDate = updateClientDto?.deliveryDate
            ? updateClientDto?.deliveryDate
            : client?.deliveryDate;

        if (updateClientDto?.birthDay) {
            updateClientDto.age = calcRelToCurrentDate(updateClientDto?.birthDay, true);
        }

        updateClientDto.paymentRemainder = purchasedProductsPrice - payment;

        updateClientDto.potentialProfit = marketPrice - supplierPrice;

        updateClientDto.realProfit = purchasedProductsPrice - supplierPrice;

        updateClientDto.daysInWarranty = calcRelToAnyDate(
            warrantyStartDate,
            warrantyEndDate,
            false
        );

        updateClientDto.closeRequestInterval = calcRelToAnyDate(
            firstContactDate,
            deliveryDate,
            false
        );

        return await this.clientModel.findByIdAndUpdate(id, updateClientDto);
    }

    /* remove(id: number) {
        return `This action removes a #${id} client`;
    } */
}
