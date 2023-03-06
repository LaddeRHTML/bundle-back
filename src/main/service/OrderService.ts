import { Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common/exceptions';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, FindOneOptions, FindOptionsWhere, Repository, UpdateResult } from 'typeorm';

import { PageMetaDto } from 'common/pagination/dtos/page-meta.dto';
import { PageOptionsDto } from 'common/pagination/dtos/page-options.dto';
import { PageDto } from 'common/pagination/dtos/page.dto';
import getSQLSearch from 'common/utils/array/getSQLSearch';
import getErrorMessage from 'common/utils/errors/getErrorMessage';

import { CreateOrderDto } from 'dto/Order/CreateOrderDto';
import { UpdateOrderDto } from 'dto/Order/UpdateOrderDto';

import { Order } from 'model/order/Order';
import { Status } from 'model/order/OrderEnums';

@Injectable()
export class OrdersService {
    constructor(@InjectRepository(Order) private orderRepository: Repository<Order>) {}

    async createOne(createOrderDto: CreateOrderDto, userId: string): Promise<Order> {
        try {
            createOrderDto.last_changed_by = userId;
            createOrderDto.created_by = userId;

            return await this.orderRepository.save(createOrderDto);
        } catch (error) {
            throw new Error(`order.service | createOne error: ${getErrorMessage(error)}`);
        }
    }

    async findSome(pageOptionsDto: PageOptionsDto): Promise<PageDto<Order>> {
        try {
            const includedInSearchFields = [
                'address',
                'name',
                'family_name',
                'patronymic',
                'iin',
                'phone_number',
                'email'
            ];

            const queryBuilder = this.orderRepository.createQueryBuilder(Order.name.toLowerCase());

            if (pageOptionsDto.searchBy) {
                queryBuilder.where(getSQLSearch(includedInSearchFields, Order.name.toLowerCase()), {
                    s: `%${pageOptionsDto.searchBy}%`
                });
            }

            queryBuilder
                .orderBy(`${Order.name.toLowerCase()}.last_change_date`, pageOptionsDto.order)
                .skip(pageOptionsDto.skip)
                .take(pageOptionsDto.limit);

            const total = await queryBuilder.getCount();
            const { entities } = await queryBuilder.getRawAndEntities();

            const pageMetaDto = new PageMetaDto({ pageOptionsDto, total });

            return new PageDto(entities, pageMetaDto);
        } catch (error) {
            throw new Error(`orders.service | findSome error: ${getErrorMessage(error)}`);
        }
    }

    async findOne(parameter: FindOneOptions<Order>): Promise<Order | null> {
        try {
            return await this.orderRepository.findOne(parameter);
        } catch (error) {
            throw new Error(`orders.service | findOne error: ${getErrorMessage(error)}`);
        }
    }

    async updateOne(
        id: string,
        updateOrderDto: UpdateOrderDto,
        userId: string
    ): Promise<UpdateResult> {
        try {
            updateOrderDto.last_change_date = new Date();
            updateOrderDto.last_changed_by = userId;

            return await this.orderRepository.update(id, updateOrderDto);
        } catch (error) {
            throw new Error(`orders.service | updateOne error: ${getErrorMessage(error)}`);
        }
    }

    async updateStatus(id: string, status: Status, userId: string): Promise<UpdateResult> {
        return this.updateOne(id, { status }, userId);
    }

    async updateMany(orderIds: string[], updateOrderDto: UpdateOrderDto, userId: string) {
        try {
            return await this.orderRepository
                .createQueryBuilder()
                .update(Order)
                .set({ ...updateOrderDto, last_change_date: new Date(), last_changed_by: userId })
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
