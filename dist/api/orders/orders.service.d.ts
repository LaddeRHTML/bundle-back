import { UpdateSettings } from 'api/clients/interface/client.update.gui.interface';
import { ProductsService } from 'api/products/products.service';
import mongoose, { FilterQuery, Model, UpdateQuery, UpdateWithAggregationPipeline } from 'mongoose';
import { Pagination } from 'src/common/interfaces/utils.interface';
import { ClientDocument } from '../clients/schema/clients.schema';
import { ClientsService } from './../clients/clients.service';
import { ProductsDocument } from './../products/schema/products.schema';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order, OrderDocument } from './schema/orders.schema';
export declare class OrdersService {
    private readonly orderModel;
    private readonly productModel;
    private readonly clientModel;
    private readonly clientsService;
    private readonly productService;
    constructor(orderModel: Model<OrderDocument>, productModel: Model<ProductsDocument>, clientModel: Model<ClientDocument>, clientsService: ClientsService, productService: ProductsService);
    create(clientId: string, createOrderDto: CreateOrderDto): Promise<void>;
    findSortedItems(page: number, limit: number): Promise<Pagination>;
    findAll(): Promise<Order[]>;
    findOne(_id: string): Promise<Order>;
    update(id: string, updateOrderDto: UpdateOrderDto): Promise<Order>;
    updateMany(filter?: FilterQuery<OrderDocument>, parameter?: UpdateWithAggregationPipeline | UpdateQuery<OrderDocument>, settings?: UpdateSettings): Promise<import("mongodb").UpdateResult>;
    remove(id: string): Promise<Order & mongoose.Document<any, any, any> & {
        _id: any;
    }>;
}
