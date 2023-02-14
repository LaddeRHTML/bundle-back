import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserPayload } from 'api/auth/interface/userId.interface';
import { ProductsService } from 'api/products/products.service';
import { Role } from 'api/users/enum/roles.enum';
import { User, UserDocument } from 'api/users/schema/user.schema';
import { UsersService } from 'api/users/users.service';
import mongoose, {
    FilterQuery,
    Model,
    ProjectionType,
    QueryOptions,
    UpdateQuery,
    UpdateWithAggregationPipeline
} from 'mongoose';
import { Pagination } from 'src/common/interfaces/utils.interface';
import sumAllFields from 'utils/sumAllFields';

import { calcRelToAnyDate } from '../../common/utils/index';
import { Product, ProductsDocument } from './../products/schema/products.schema';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order, OrderDocument } from './schema/orders.schema';
import { OrderStatus } from './types/order-status.types';

const clientRef = 'client';
const productRef = 'products';
const creatorRef = 'creator';
const lastEditorRef = 'lastEditor';
const currentManagerRef = 'currentManager';

@Injectable()
export class OrdersService {
    constructor(
        @InjectModel(Order.name) private readonly orderModel: Model<OrderDocument>,
        @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
        @InjectModel(Product.name) private readonly productModel: Model<ProductsDocument>,
        private readonly userService: UsersService,
        private readonly productService: ProductsService
    ) {}

    async createOne(createOrderDto: CreateOrderDto, userPayload: UserPayload): Promise<Order> {
        try {
            createOrderDto.creator = userPayload.userId;
            if (userPayload.role !== Role.User) {
                createOrderDto.currentManager = userPayload.userId;
            }

            const client = await this.userModel.findOne({ _id: userPayload.userId });

            if (!client) {
                throw new HttpException(
                    'An error occurred while creating order! client',
                    HttpStatus.NOT_ACCEPTABLE
                );
            }
            createOrderDto.client = userPayload.userId;

            const products = await this.productService.findAllWithOutPopulating({
                _id: {
                    $in: createOrderDto.products.map((id) => new mongoose.Types.ObjectId(id))
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

            const clientUpdated = await this.userService.updateOne(userPayload.userId, {
                orders: client.orders.concat(orderId)
            });

            if (!clientUpdated) {
                throw new HttpException(
                    'An error occurred while creating order! order',
                    HttpStatus.NOT_ACCEPTABLE
                );
            }

            return order;
        } catch (error) {
            throw new HttpException(
                'An error occurred while creating order!',
                HttpStatus.NOT_ACCEPTABLE
            );
        }
    }

    async getAllPrices() {
        const orders = await this.findAllBy();

        const products = [];

        orders.forEach((o: Order) => {
            o.products.forEach((s) => {
                products.push(s);
            });
        });

        const prices = sumAllFields<Product>(products, 'price');
        const market_prices = sumAllFields<Product>(products, 'market_price');
        const supplier_prices = sumAllFields<Product>(products, 'supplier_price');
        return {
            prices,
            market_prices,
            supplier_prices
        };
    }

    async findSortedItems(
        page: number,
        limit: number,
        status: OrderStatus,
        userId: string,
        createOrderDto: CreateOrderDto
    ): Promise<Pagination<Order[]>> {
        let options = {
            ...(status && {
                status
            }),
            ...(userId && {
                currentManager: userId
            }),
            ...(createOrderDto && {
                ...createOrderDto
            })
        };

        const total = await this.orderModel.count(options).exec();
        const lastPage = Math.ceil(total / limit);
        const data = await this.orderModel
            .find(options)
            .populate(clientRef, '-password', this.userModel)
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

    async findAllBy(filter?: FilterQuery<OrderDocument>): Promise<Order[]> {
        return await this.orderModel
            .find(filter)
            .populate(clientRef, '-password', this.userModel)
            .populate({ path: productRef, model: this.productModel })
            .populate(creatorRef, 'name email', this.userModel)
            .populate(lastEditorRef, 'name email', this.userModel)
            .populate(currentManagerRef, 'name email', this.userModel);
    }

    async findOne(_id: string): Promise<Order> {
        return await this.orderModel
            .findOne({ _id })
            .populate(clientRef, '-password', this.userModel)
            .populate({ path: productRef, model: this.productModel })
            .populate(creatorRef, 'name email', this.userModel)
            .populate(lastEditorRef, 'name email', this.userModel)
            .populate(currentManagerRef, 'name email', this.userModel);
    }

    async updateOne(
        id: string,
        updateOrderDto: UpdateOrderDto,
        userPayload: UserPayload
    ): Promise<Order> {
        updateOrderDto.lastEditor = userPayload.userId;
        updateOrderDto.update_date = new Date();

        if (updateOrderDto.status !== 'open') {
            updateOrderDto.closeOrderInterval = calcRelToAnyDate(
                updateOrderDto.createDate,
                new Date(),
                false
            );
        }

        return await this.orderModel
            .findOneAndUpdate({ _id: id }, { ...updateOrderDto }, { new: true })
            .populate(clientRef, '-password', this.userModel)
            .populate({ path: productRef, model: this.productModel })
            .populate(creatorRef, 'name email', this.userModel)
            .populate(lastEditorRef, 'name email', this.userModel)
            .populate(currentManagerRef, 'name email', this.userModel);
    }

    async updateStatus(id: string, status: OrderStatus, userPayload: UserPayload) {
        let closeOrderInterval: number;
        const order = await this.findOne(id);

        if (status !== 'open') {
            closeOrderInterval = calcRelToAnyDate(order.createDate, new Date(), false);
        }

        return this.updateOne(
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
        settings?: QueryOptions
    ) {
        return await this.orderModel
            .updateMany(filter, parameter, {
                ...settings,
                new: true
            })
            .populate(clientRef, '-password', this.userModel)
            .populate({ path: productRef, model: this.productModel });
    }

    async removeOneById(id: string) {
        const ObjectId = new mongoose.Types.ObjectId(id);

        const updatedClients = await this.userModel.updateMany(
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
