"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const products_service_1 = require("../products/products.service");
const mongoose_2 = require("mongoose");
const index_1 = require("../../common/utils/index");
const clients_schema_1 = require("../clients/schema/clients.schema");
const clients_service_1 = require("./../clients/clients.service");
const products_schema_1 = require("./../products/schema/products.schema");
const orders_schema_1 = require("./schema/orders.schema");
const clientRef = 'client';
const productRef = 'orderedProducts';
let OrdersService = class OrdersService {
    constructor(orderModel, productModel, clientModel, clientsService, productService) {
        this.orderModel = orderModel;
        this.productModel = productModel;
        this.clientModel = clientModel;
        this.clientsService = clientsService;
        this.productService = productService;
    }
    async create(clientId, createOrderDto) {
        try {
            const client = await this.clientsService.findOne(clientId);
            createOrderDto.closeRequestInterval = (0, index_1.calcRelToAnyDate)(createOrderDto.firstContactDate, createOrderDto.deliveryDate, false);
            console.log('client - >', client);
            if (!client) {
                throw new common_1.HttpException('An error occurred while creating order! client', common_1.HttpStatus.NOT_ACCEPTABLE);
            }
            createOrderDto.client = clientId;
            console.log(createOrderDto);
            const products = await this.productService.findAllByWithOutPopulating({
                _id: {
                    $in: createOrderDto.orderedProducts.map((id) => new mongoose_2.default.Types.ObjectId(id))
                }
            });
            console.log('products->', products);
            if (!products || (products === null || products === void 0 ? void 0 : products.length) === 0) {
                throw new common_1.HttpException('An error occurred while creating order! product', common_1.HttpStatus.NOT_ACCEPTABLE);
            }
            const order = await this.orderModel.create(createOrderDto);
            const orderId = order._id;
            const clientUpdated = await this.clientsService.update(clientId, {
                orders: client.orders.concat(orderId)
            }, { new: true });
            console.log('order->', order);
            if (!clientUpdated) {
                throw new common_1.HttpException('An error occurred while creating order! order', common_1.HttpStatus.NOT_ACCEPTABLE);
            }
            return products.forEach(async (p) => {
                return await this.productService.updateById(p['_id'], {
                    includedInOrders: orderId,
                    buyers: [clientId]
                });
            });
        }
        catch (error) {
            console.log(error);
            throw new common_1.HttpException('An error occurred while creating order!', common_1.HttpStatus.NOT_ACCEPTABLE);
        }
    }
    async findSortedItems(page, limit) {
        const total = await this.orderModel.count({}).exec();
        const query = this.orderModel
            .find({})
            .populate({ path: clientRef, model: this.clientModel })
            .populate({ path: productRef, model: this.productModel });
        return (0, index_1.paginate)(page, query, limit, total);
    }
    async findAll() {
        return await this.orderModel
            .find({})
            .populate({ path: clientRef, model: this.clientModel })
            .populate({ path: productRef, model: this.productModel });
    }
    async findOne(_id) {
        return await this.orderModel
            .findOne({ _id })
            .populate({ path: clientRef, model: this.clientModel })
            .populate({ path: productRef, model: this.productModel });
    }
    async update(id, updateOrderDto) {
        const order = await this.findOne(id);
        const firstContactDate = (updateOrderDto === null || updateOrderDto === void 0 ? void 0 : updateOrderDto.firstContactDate)
            ? updateOrderDto === null || updateOrderDto === void 0 ? void 0 : updateOrderDto.firstContactDate
            : order === null || order === void 0 ? void 0 : order.firstContactDate;
        const deliveryDate = (updateOrderDto === null || updateOrderDto === void 0 ? void 0 : updateOrderDto.deliveryDate)
            ? updateOrderDto === null || updateOrderDto === void 0 ? void 0 : updateOrderDto.deliveryDate
            : order === null || order === void 0 ? void 0 : order.deliveryDate;
        updateOrderDto.closeRequestInterval = (0, index_1.calcRelToAnyDate)(firstContactDate, deliveryDate, false);
        return await this.orderModel
            .findOneAndUpdate({ _id: id }, Object.assign({}, updateOrderDto), { new: true })
            .populate({ path: productRef, model: this.productModel });
    }
    async updateMany(filter, parameter, settings) {
        return await this.orderModel
            .updateMany(filter, parameter, Object.assign(Object.assign({}, settings), { new: true }))
            .populate({ path: productRef, model: this.productModel });
    }
    async remove(id) {
        const ObjectId = new mongoose_2.default.Types.ObjectId(id);
        const updatedClients = await this.clientsService.updateMany({ orders: { $in: ObjectId } }, {
            $pull: {
                orders: { $in: ObjectId }
            }
        });
        if (!updatedClients.acknowledged) {
            throw new common_1.HttpException('An error occurred while creating order!', common_1.HttpStatus.NOT_ACCEPTABLE);
        }
        const updatedProducts = await this.productService.updateMany({ includedInOrders: { $in: ObjectId } }, {
            $pull: {
                includedInOrders: { $in: ObjectId }
            }
        });
        if (!updatedProducts.acknowledged) {
            throw new common_1.HttpException('An error occurred while creating order!', common_1.HttpStatus.NOT_ACCEPTABLE);
        }
        return await this.orderModel.findOneAndRemove({ _id: ObjectId });
    }
};
OrdersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(orders_schema_1.Order.name)),
    __param(1, (0, mongoose_1.InjectModel)(products_schema_1.Product.name)),
    __param(2, (0, mongoose_1.InjectModel)(clients_schema_1.Client.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        clients_service_1.ClientsService,
        products_service_1.ProductsService])
], OrdersService);
exports.OrdersService = OrdersService;
//# sourceMappingURL=orders.service.js.map