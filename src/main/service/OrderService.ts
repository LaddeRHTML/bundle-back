import { Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common/exceptions';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, FindOneOptions, FindOptionsWhere, In, Repository } from 'typeorm';

import { PageMetaDto } from 'common/pagination/dtos/page-meta.dto';
import { PageOptionsDto } from 'common/pagination/dtos/page-options.dto';
import { PageDto } from 'common/pagination/dtos/page.dto';
import getSQLSearch from 'common/utils/array/getSQLSearch';
import getErrorMessage from 'common/utils/errors/getErrorMessage';

import { AllowedOrderRelations } from 'controller/OrderController';
import { CreateOrderDto } from 'dto/Order/CreateOrderDto';
import { UpdateOrderDto } from 'dto/Order/UpdateOrderDto';

import { Order } from 'model/order/Order';
import { Status } from 'model/order/OrderEnums';
import { ProductsService } from './ProductService';
import { UsersService } from './UserService';

export interface SearchByChild {
    client?: string;
    product?: string;
}

@Injectable()
export class OrdersService {
    constructor(
        @InjectRepository(Order) private orderRepository: Repository<Order>,
        private readonly productService: ProductsService,
        private readonly userService: UsersService
    ) {}

    get name() {
        return Order.name.toLowerCase();
    }

    async createOne(createOrderDto: CreateOrderDto, userId: string): Promise<Order> {
        try {
            if (createOrderDto.products && createOrderDto.products?.length > 0) {
                createOrderDto.products = await this.productService.findAllBy({
                    where: { id: In(createOrderDto.products) }
                });
            }

            if (createOrderDto.currentManager) {
                const manager = await this.userService.findOne({ where: { id: userId } });

                if (!manager) {
                    throw new NotFoundException('Order not found!');
                }

                createOrderDto.currentManager = manager;
            }

            createOrderDto.lastChangedBy = userId;
            createOrderDto.createdBy = userId;

            return await this.orderRepository.save(createOrderDto);
        } catch (error) {
            throw new Error(`order.service | createOne error: ${getErrorMessage(error)}`);
        }
    }

    async findOne(parameter: FindOneOptions<Order>): Promise<Order | null> {
        try {
            const order = await this.orderRepository.findOne(parameter);

            if (!order) {
                throw new NotFoundException('Order not found!');
            }

            return order;
        } catch (error) {
            throw new Error(`orders.service | findOne error: ${getErrorMessage(error)}`);
        }
    }

    async findOneById(id: string): Promise<Order | null> {
        try {
            return await this.orderRepository.findOne({ where: { id } });
        } catch (error) {
            throw new Error(`orders.service | findOneById error: ${getErrorMessage(error)}`);
        }
    }

    async findSome(
        pageOptionsDto: PageOptionsDto,
        relations: AllowedOrderRelations,
        searchByChild: SearchByChild,
        filters?: Partial<Order>
    ): Promise<PageDto<Order>> {
        try {
            const includedInClientSearchFields = [
                'address',
                'name',
                'familyName',
                'patronymic',
                'iin',
                'phoneNumber',
                'email'
            ];
            const includedInProductSearchFields = ['name'];

            const queryBuilder = this.orderRepository.createQueryBuilder(this.name);

            if (filters) {
                queryBuilder.where(filters);
            }

            if (searchByChild.client) {
                queryBuilder.where(getSQLSearch(includedInClientSearchFields, 'client'), {
                    s: `%${searchByChild.client}%`
                });
            }

            if (searchByChild.product) {
                queryBuilder.where(getSQLSearch(includedInProductSearchFields, 'products'), {
                    s: `%${searchByChild.product}%`
                });
            }

            queryBuilder
                .orderBy(`${this.name}.lastChangeDate`, pageOptionsDto.order)
                .skip(pageOptionsDto.skip)
                .take(pageOptionsDto.limit);

            if (relations.length > 0) {
                relations.forEach((relation) => {
                    queryBuilder.leftJoinAndSelect(`${this.name}.${relation}`, relation);
                });
            }

            const total = await queryBuilder.getCount();
            const { entities } = await queryBuilder.getRawAndEntities();

            const pageMetaDto = new PageMetaDto({ pageOptionsDto, total });

            return new PageDto(entities, pageMetaDto);
        } catch (error) {
            throw new Error(`orders.service | findSome error: ${getErrorMessage(error)}`);
        }
    }

    async updateOne(id: string, updateOrderDto: UpdateOrderDto, userId: string): Promise<Order> {
        try {
            const order = await this.findOne({ where: { id } });

            if (!order) {
                throw new NotFoundException('Order not found!');
            }

            updateOrderDto.lastChangeDate = new Date();
            updateOrderDto.lastChangedBy = userId;

            if (updateOrderDto.products && updateOrderDto.products?.length > 0) {
                const orderedProducts =
                    order.products && order.products.length > 0
                        ? order.products.map((p) => p.id)
                        : [];

                updateOrderDto.products = await this.productService.findAllBy({
                    where: {
                        id: In([...updateOrderDto.products, ...orderedProducts])
                    }
                });
            }

            if (updateOrderDto.currentManager) {
                const manager = await this.userService.findOne({ where: { id: userId } });

                if (!manager) {
                    throw new NotFoundException('Order not found!');
                }

                updateOrderDto.currentManager = manager;
            }

            return await this.orderRepository.save({ ...updateOrderDto, id });
        } catch (error) {
            throw new Error(`orders.service | updateOne error: ${getErrorMessage(error)}`);
        }
    }

    async updateStatus(id: string, status: Status, userId: string): Promise<Order> {
        return this.updateOne(id, { status }, userId);
    }

    async updateMany(orderIds: string[], updateOrderDto: UpdateOrderDto, userId: string) {
        try {
            return await this.orderRepository
                .createQueryBuilder()
                .update(Order)
                .set({ ...updateOrderDto, lastChangeDate: new Date(), lastChangedBy: userId })
                .whereInIds(orderIds)
                .execute();
        } catch (error) {
            throw new Error(`users.service | updateMany error: ${getErrorMessage(error)}`);
        }
    }

    async removeOneById(id: string): Promise<DeleteResult> {
        try {
            const isExists = await this.isOrderExists({ id });

            if (!isExists) {
                throw new NotFoundException('Order not found!');
            }

            return await this.orderRepository.delete({ id });
        } catch (error) {
            throw new Error(`orders.service | removeOneById error: ${getErrorMessage(error)}`);
        }
    }

    async isOrderExists(orderProperty: FindOptionsWhere<Order>): Promise<boolean> {
        try {
            return await this.orderRepository.exist({ where: orderProperty });
        } catch (error) {
            throw new Error(`orders.service | isOrderExists error: ${getErrorMessage(error)}`);
        }
    }
}
