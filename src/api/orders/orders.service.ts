import { UpdateClientDto } from './../clients/dto/update-client.dto';
import { ClientsService } from './../clients/clients.service';
import { calcRelToAnyDate, paginate } from '../../utils/index';
import { Order, OrderDocument } from './orders.schema';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PaginationTypes } from 'src/interfaces/utils.interface';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Client } from '../clients/clients.schema';

@Injectable()
export class OrdersService {
    constructor(
        @InjectModel('orders') private orderModel: Model<OrderDocument>,
        private clientsService: ClientsService
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

    async findSortedItems(page: number, limit: number): Promise<PaginationTypes> {
        const total = await this.orderModel.count({}).exec();
        const query = this.orderModel.find({}).populate('client');
        return paginate(page, query, limit, total);
    }

    async findAll(): Promise<Order[]> {
        return await this.orderModel.find({}).populate('client');
    }

    async findOne(_id: string): Promise<Order> {
        return await this.orderModel.findOne({ _id }).populate('client');
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
