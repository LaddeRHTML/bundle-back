import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserPayload } from 'api/auth/interface/userId.interface';
import { UpdateSettings } from 'api/clients/interface/client.update.gui.interface';
import { ProductsService } from 'api/products/products.service';
import { User, UserDocument } from 'api/users/schema/user.schema';
import mongoose, { FilterQuery, Model, UpdateQuery, UpdateWithAggregationPipeline } from 'mongoose';
import { Pagination } from 'src/common/interfaces/utils.interface';

import { calcRelToAnyDate } from '../../common/utils/index';
import { Client, ClientDocument } from '../clients/schema/clients.schema';
import { ClientsService } from './../clients/clients.service';
import { Product, ProductsDocument } from './../products/schema/products.schema';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order, OrderDocument } from './schema/orders.schema';
import { OrderStatus } from './types/order-status.types';

const clientRef = 'client';
const productRef = 'orderedProducts';
const creatorRef = 'creator';
const lastEditorRef = 'lastEditor';
const currentManagerRef = 'currentManager';

@Injectable()
export class OrdersService {
    constructor(
        @InjectModel(Order.name) private readonly orderModel: Model<OrderDocument>,
        @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
        @InjectModel(Product.name) private readonly productModel: Model<ProductsDocument>,
        @InjectModel(Client.name) private readonly clientModel: Model<ClientDocument>,
        private readonly clientsService: ClientsService,
        private readonly productService: ProductsService
    ) {}

    async create(clientId: string, createOrderDto: CreateOrderDto, userPayload: UserPayload) {
        try {
            createOrderDto.creator = userPayload.userId;
            createOrderDto.currentManager = userPayload.userId;

            const client = await this.clientsService.findOne(clientId);

            if (!client) {
                throw new HttpException(
                    'An error occurred while creating order! client',
                    HttpStatus.NOT_ACCEPTABLE
                );
            }
            createOrderDto.client = clientId;

            const products = await this.productService.findAllByWithOutPopulating({
                _id: {
                    $in: createOrderDto.orderedProducts.map((id) => new mongoose.Types.ObjectId(id))
                }
            });

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

    async findSortedItems(
        page: number,
        limit: number,
        status: OrderStatus,
        userId: string
    ): Promise<Pagination> {
        let options = {
            ...(status && {
                status
            }),
            ...(userId && {
                currentManager: userId
            })
        };

        const total = await this.orderModel.count({}).exec();
        const lastPage = Math.ceil(total / limit);
        const data = await this.orderModel
            .find(options)
            .populate({ path: clientRef, model: this.clientModel })
            .populate({ path: productRef, model: this.productModel })
            .populate(creatorRef, 'name email', this.userModel)
            .populate(lastEditorRef, 'name email', this.userModel)
            .populate(currentManagerRef, 'name email', this.userModel)
            .skip((page - 1) * limit)
            .limit(limit)
            .exec();

        const sortedData = {
            data,
            total,
            page,
            lastPage
        };

        return sortedData;
    }

    async findAll(): Promise<Order[]> {
        return await this.orderModel
            .find({})
            .populate({ path: clientRef, model: this.clientModel })
            .populate({ path: productRef, model: this.productModel })
            .populate(creatorRef, 'name email', this.userModel)
            .populate(lastEditorRef, 'name email', this.userModel)
            .populate(currentManagerRef, 'name email', this.userModel);
    }

    async findOne(_id: string): Promise<Order> {
        return await this.orderModel
            .findOne({ _id })
            .populate({ path: clientRef, model: this.clientModel })
            .populate({ path: productRef, model: this.productModel })
            .populate(creatorRef, 'name email', this.userModel)
            .populate(lastEditorRef, 'name email', this.userModel)
            .populate(currentManagerRef, 'name email', this.userModel);
    }

    async update(
        id: string,
        updateOrderDto: UpdateOrderDto,
        userPayload: UserPayload
    ): Promise<Order> {
        updateOrderDto.lastEditor = userPayload.userId;
        updateOrderDto.updateDate = new Date();

        return await this.orderModel
            .findOneAndUpdate({ _id: id }, { ...updateOrderDto }, { new: true })
            .populate({ path: productRef, model: this.productModel })
            .populate(creatorRef, 'name email', this.userModel)
            .populate(lastEditorRef, 'name email', this.userModel)
            .populate(currentManagerRef, 'name email', this.userModel);
    }

    async closeOrder(id: string, status: OrderStatus, userPayload: UserPayload) {
        const order = await this.findOne(id);

        const closeOrderInterval = calcRelToAnyDate(order.createDate, new Date(), false);

        return this.update(
            id,
            {
                status,
                closeOrderInterval
            },
            userPayload
        );
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
