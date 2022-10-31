import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UpdateSettings } from 'api/clients/interface/client.update.gui.interface';
import { ProductsService } from 'api/products/products.service';
import mongoose, { FilterQuery, Model, UpdateQuery, UpdateWithAggregationPipeline } from 'mongoose';
import { Pagination } from 'src/common/interfaces/utils.interface';

import { calcRelToAnyDate, paginate } from '../../common/utils/index';
import { Client, ClientDocument } from '../clients/schema/clients.schema';
import { ClientsService } from './../clients/clients.service';
import { Product, ProductsDocument } from './../products/schema/products.schema';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order, OrderDocument } from './schema/orders.schema';

const clientRef = 'client';
const productRef = 'orderedProducts';

@Injectable()
export class OrdersService {
    constructor(
        @InjectModel(Order.name) private readonly orderModel: Model<OrderDocument>,
        @InjectModel(Product.name) private readonly productModel: Model<ProductsDocument>,
        @InjectModel(Client.name) private readonly clientModel: Model<ClientDocument>,
        private readonly clientsService: ClientsService,
        private readonly productService: ProductsService
    ) {}

    async create(clientId: string, createOrderDto: CreateOrderDto) {
        try {
            const client = await this.clientsService.findOne(clientId);

            createOrderDto.closeRequestInterval = calcRelToAnyDate(
                createOrderDto.firstContactDate,
                createOrderDto.deliveryDate,
                false
            );

            console.log('client - >', client);

            if (!client) {
                throw new HttpException(
                    'An error occurred while creating order! client',
                    HttpStatus.NOT_ACCEPTABLE
                );
            }
            createOrderDto.client = clientId;

            console.log(createOrderDto);

            const products = await this.productService.findAllByWithOutPopulating({
                _id: {
                    $in: createOrderDto.orderedProducts.map((id) => new mongoose.Types.ObjectId(id))
                }
            });

            console.log('products->', products);

            if (!products || products?.length === 0) {
                throw new HttpException(
                    'An error occurred while creating order! product',
                    HttpStatus.NOT_ACCEPTABLE
                );
            }

            const order = await this.orderModel.create(createOrderDto);

            const orderId = order._id;

            const clientUpdated = await this.clientsService.update(
                clientId,
                {
                    orders: client.orders.concat(orderId)
                },
                { new: true }
            );

            console.log('order->', order);

            if (!clientUpdated) {
                throw new HttpException(
                    'An error occurred while creating order! order',
                    HttpStatus.NOT_ACCEPTABLE
                );
            }

            return products.forEach(async (p) => {
                return await this.productService.updateById(p['_id'], {
                    includedInOrders: orderId,
                    buyers: [clientId]
                });
            });
        } catch (error) {
            console.log(error);
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
            .populate({ path: clientRef, model: this.clientModel })
            .populate({ path: productRef, model: this.productModel });
        return paginate(page, query, limit, total);
    }

    async findAll(): Promise<Order[]> {
        return await this.orderModel
            .find({})
            .populate({ path: clientRef, model: this.clientModel })
            .populate({ path: productRef, model: this.productModel });
    }

    async findOne(_id: string): Promise<Order> {
        return await this.orderModel
            .findOne({ _id })
            .populate({ path: clientRef, model: this.clientModel })
            .populate({ path: productRef, model: this.productModel });
    }

    async update(id: string, updateOrderDto: UpdateOrderDto): Promise<Order> {
        const order = await this.findOne(id);

        const firstContactDate = updateOrderDto?.firstContactDate
            ? updateOrderDto?.firstContactDate
            : order?.firstContactDate;
        const deliveryDate = updateOrderDto?.deliveryDate
            ? updateOrderDto?.deliveryDate
            : order?.deliveryDate;

        updateOrderDto.closeRequestInterval = calcRelToAnyDate(
            firstContactDate,
            deliveryDate,
            false
        );

        return await this.orderModel
            .findOneAndUpdate({ _id: id }, { ...updateOrderDto }, { new: true })
            .populate({ path: productRef, model: this.productModel });
    }

    async updateMany(
        filter?: FilterQuery<OrderDocument>,
        parameter?: UpdateWithAggregationPipeline | UpdateQuery<OrderDocument>,
        settings?: UpdateSettings
    ) {
        return await this.orderModel
            .updateMany(filter, parameter, {
                ...settings,
                new: true
            })
            .populate({ path: productRef, model: this.productModel });
    }

    async remove(id: string) {
        const ObjectId = new mongoose.Types.ObjectId(id);

        const updatedClients = await this.clientsService.updateMany(
            { orders: { $in: ObjectId } },
            {
                $pull: {
                    orders: { $in: ObjectId }
                }
            }
        );

        if (!updatedClients.acknowledged) {
            throw new HttpException(
                'An error occurred while creating order!',
                HttpStatus.NOT_ACCEPTABLE
            );
        }

        const updatedProducts = await this.productService.updateMany(
            { includedInOrders: { $in: ObjectId } },
            {
                $pull: {
                    includedInOrders: { $in: ObjectId }
                }
            }
        );

        if (!updatedProducts.acknowledged) {
            throw new HttpException(
                'An error occurred while creating order!',
                HttpStatus.NOT_ACCEPTABLE
            );
        }

        return await this.orderModel.findOneAndRemove({ _id: ObjectId });
    }
}
