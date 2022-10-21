import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Pagination } from 'src/common/interfaces/utils.interface';

import { calcRelToAnyDate, paginate } from '../../common/utils/index';
import { Client, ClientDocument } from '../clients/schema/clients.schema';
import { ClientsService } from './../clients/clients.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order, OrderDocument } from './schema/orders.schema';

const clientRef = 'client';

@Injectable()
export class OrdersService {
    constructor(
        @InjectModel(Order.name) private readonly orderModel: Model<OrderDocument>,
        @InjectModel(Client.name) private readonly clientModel: Model<ClientDocument>,
        private readonly clientsService: ClientsService
    ) {}

    async create(clientId: string, createOrderDto: CreateOrderDto): Promise<Order | Client> {
        try {
            const client = await this.clientsService.findOne(clientId);

            createOrderDto.paymentRemainder =
                createOrderDto.purchasedProductsPrice - createOrderDto.payment;

            createOrderDto.potentialProfit =
                createOrderDto.marketPrice - createOrderDto.supplierPrice;

            createOrderDto.realProfit =
                createOrderDto.purchasedProductsPrice - createOrderDto.supplierPrice;

            createOrderDto.daysInWarranty = calcRelToAnyDate(
                createOrderDto.warrantyStartDate,
                createOrderDto.warrantyEndDate,
                false
            );

            createOrderDto.closeRequestInterval = calcRelToAnyDate(
                createOrderDto.firstContactDate,
                createOrderDto.deliveryDate,
                false
            );

            if (!client) {
                throw new HttpException(
                    'An error occurred while creating order!',
                    HttpStatus.NOT_ACCEPTABLE
                );
            }

            createOrderDto.client = clientId;

            const order = await this.orderModel.create(createOrderDto);

            return await this.clientsService.update(
                clientId,
                {
                    orders: client.orders.concat(order._id)
                },
                { returnNewDocument: true, returnOriginal: false }
            );
        } catch (error) {
            throw new HttpException(
                'An error occurred while creating order!',
                HttpStatus.NOT_ACCEPTABLE
            );
        }
    }

    async findSortedItems(page: number, limit: number): Promise<Pagination> {
        const total = await this.orderModel.count({}).exec();
        const query = this.orderModel
            .find({})
            .populate({ path: clientRef, model: this.clientModel });
        return paginate(page, query, limit, total);
    }

    async findAll(): Promise<Order[]> {
        return await this.orderModel
            .find({})
            .populate({ path: clientRef, model: this.clientModel });
    }

    async findOne(_id: string): Promise<Order> {
        return await this.orderModel
            .findOne({ _id })
            .populate({ path: clientRef, model: this.clientModel });
    }

    async update(id: string, updateOrderDto: UpdateOrderDto): Promise<Order> {
        const order = await this.findOne(id);

        const purchasedProductsPrice = updateOrderDto?.purchasedProductsPrice
            ? updateOrderDto?.purchasedProductsPrice
            : order?.purchasedProductsPrice;
        const payment = updateOrderDto?.payment ? updateOrderDto?.payment : order?.payment;
        const marketPrice = updateOrderDto?.marketPrice
            ? updateOrderDto?.marketPrice
            : order?.marketPrice;
        const supplierPrice = updateOrderDto?.supplierPrice
            ? updateOrderDto?.supplierPrice
            : order?.supplierPrice;
        const warrantyStartDate = updateOrderDto?.warrantyStartDate
            ? updateOrderDto?.warrantyStartDate
            : order?.warrantyStartDate;
        const warrantyEndDate = updateOrderDto?.warrantyEndDate
            ? updateOrderDto?.warrantyEndDate
            : order?.warrantyEndDate;
        const firstContactDate = updateOrderDto?.firstContactDate
            ? updateOrderDto?.firstContactDate
            : order?.firstContactDate;
        const deliveryDate = updateOrderDto?.deliveryDate
            ? updateOrderDto?.deliveryDate
            : order?.deliveryDate;

        updateOrderDto.paymentRemainder = purchasedProductsPrice - payment;

        updateOrderDto.potentialProfit = marketPrice - supplierPrice;

        updateOrderDto.realProfit = purchasedProductsPrice - supplierPrice;

        updateOrderDto.daysInWarranty = calcRelToAnyDate(warrantyStartDate, warrantyEndDate, false);

        updateOrderDto.closeRequestInterval = calcRelToAnyDate(
            firstContactDate,
            deliveryDate,
            false
        );

        return await this.orderModel.findByIdAndUpdate(id, updateOrderDto);
    }

    /* remove(id: number) {
        return `This action removes a #${id} client`;
    } */
}
