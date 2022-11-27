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
exports.ProductsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const clients_service_1 = require("../clients/clients.service");
const clients_schema_1 = require("../clients/schema/clients.schema");
const orders_schema_1 = require("../orders/schema/orders.schema");
const moment = require("moment");
const mongoose_2 = require("mongoose");
const excel_sort_1 = require("../../common/utils/excel.sort");
const XLSX = require("xlsx");
const create_product_dto_1 = require("./dto/create-product.dto");
const products_schema_1 = require("./schema/products.schema");
const orderRef = 'includedInOrders';
const clientRef = 'buyers';
let ProductsService = class ProductsService {
    constructor(productModel, orderModel, clientModel, clientsService) {
        this.productModel = productModel;
        this.orderModel = orderModel;
        this.clientModel = clientModel;
        this.clientsService = clientsService;
    }
    async create(createProductDto) {
        return await this.productModel.create(createProductDto);
    }
    async findAllBy(filter, projection) {
        return await this.productModel
            .find(filter, projection)
            .populate({ path: orderRef, model: this.orderModel })
            .populate({ path: clientRef, model: this.clientModel });
    }
    async findAllByWithOutPopulating(filter, projection) {
        return await this.productModel.find(filter, projection);
    }
    async findAllByNames(names) {
        return await this.productModel
            .find({ name: { $in: names } })
            .populate({ path: orderRef, model: this.orderModel })
            .populate({ path: clientRef, model: this.clientModel });
    }
    async findByQuery(parameter, page, limit, onlyOrdered, category, filters) {
        var _a, _b, _c, _d, _e, _f;
        let options = Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, (onlyOrdered && {
            includedInOrders: {
                $exists: onlyOrdered,
                $not: { $size: 0 }
            }
        })), (category && {
            category
        })), (((_a = filters.price) === null || _a === void 0 ? void 0 : _a[0]) &&
            ((_b = filters.price) === null || _b === void 0 ? void 0 : _b[1]) && {
            price: { $gte: filters.price[0], $lte: filters.price[1] }
        })), (((_c = filters.supplierPrice) === null || _c === void 0 ? void 0 : _c[0]) &&
            ((_d = filters.supplierPrice) === null || _d === void 0 ? void 0 : _d[1]) && {
            supplierPrice: {
                $gte: filters.supplierPrice[0],
                $lte: filters.supplierPrice[1]
            }
        })), (((_e = filters.marketPrice) === null || _e === void 0 ? void 0 : _e[0]) &&
            ((_f = filters.marketPrice) === null || _f === void 0 ? void 0 : _f[1]) && {
            marketPrice: {
                $gte: filters.marketPrice[0],
                $lte: filters.marketPrice[1]
            }
        })), (typeof filters.warrantyDays === 'number' && {
            warrantyDays: filters.warrantyDays
        }));
        if (parameter) {
            options = Object.assign(Object.assign({}, options), { $or: [
                    {
                        category: new RegExp(parameter, 'i')
                    },
                    {
                        name: new RegExp(parameter, 'i')
                    },
                    {
                        maker: new RegExp(parameter, 'i')
                    },
                    {
                        model: new RegExp(parameter, 'i')
                    }
                ] });
        }
        const total = await this.productModel.count(options).exec();
        const lastPage = Math.ceil(total / limit);
        const data = await this.productModel
            .find(options)
            .populate({ path: orderRef, model: this.orderModel })
            .populate({ path: clientRef, model: this.clientModel })
            .skip((page - 1) * limit)
            .limit(limit)
            .exec();
        return {
            data,
            total,
            page,
            lastPage
        };
    }
    async getMinMaxValues() {
        const minMaxValues = await this.productModel.aggregate([
            {
                $facet: {
                    min: [{ $sort: { price: 1 } }, { $limit: 1 }],
                    max: [{ $sort: { price: -1 } }, { $limit: 1 }]
                }
            },
            {
                $project: {
                    price: [{ $first: '$min.price' }, { $first: '$max.price' }],
                    marketPrice: [{ $first: '$min.marketPrice' }, { $first: '$max.marketPrice' }],
                    supplierPrice: [
                        { $first: '$min.supplierPrice' },
                        { $first: '$max.supplierPrice' }
                    ]
                }
            }
        ]);
        const warrantyVariations = await this.productModel.distinct('warrantyDays');
        return {
            minMaxValues: minMaxValues === null || minMaxValues === void 0 ? void 0 : minMaxValues[0],
            warrantyVariations
        };
    }
    async findOneById(_id) {
        return await this.productModel
            .findOne({ _id })
            .populate({ path: orderRef, model: this.orderModel })
            .populate({ path: clientRef, model: this.clientModel });
    }
    async updateById(id, updateProductDto) {
        console.log(id, updateProductDto);
        return await this.productModel
            .findOneAndUpdate({ _id: id }, Object.assign({}, updateProductDto), { new: true })
            .populate({ path: orderRef, model: this.orderModel })
            .populate({ path: clientRef, model: this.clientModel });
    }
    async updateMany(filter, parameter, settings) {
        return await this.productModel
            .updateMany(filter, parameter, Object.assign(Object.assign({}, settings), { new: true }))
            .populate({ path: orderRef, model: this.orderModel })
            .populate({ path: clientRef, model: this.clientModel });
    }
    async remove(id) {
        const updatedOrders = await this.orderModel.updateMany({ orderedProducts: { $in: id } }, { $pull: { orderedProducts: { $in: id } } }, { new: false });
        if (!updatedOrders.acknowledged) {
            throw new common_1.HttpException('An error occurred while creating order!', common_1.HttpStatus.NOT_ACCEPTABLE);
        }
        return await this.productModel.findOneAndRemove({ _id: id });
    }
    getDataFromExcel(file) {
        const wb = XLSX.read(file.buffer);
        const ws = wb.Sheets[wb.SheetNames[0]];
        const data = XLSX.utils.sheet_to_json(ws, { header: 1 });
        const products = (0, excel_sort_1.SortExcelSheetData)(data).map((i) => {
            const productsFromExcel = i === null || i === void 0 ? void 0 : i.products.map((p) => {
                const productDto = new create_product_dto_1.CreateProductDto();
                const vendorСode = (p === null || p === void 0 ? void 0 : p[0]) || 0;
                const productName = (p === null || p === void 0 ? void 0 : p[1]) || '';
                const productModel = productName.split(',')[0];
                const marketPrice = (p === null || p === void 0 ? void 0 : p[2]) || 0;
                const price = (p === null || p === void 0 ? void 0 : p[3]) || 0;
                const supplierPrice = (p === null || p === void 0 ? void 0 : p[4]) || 0;
                const warrantyDays = (p === null || p === void 0 ? void 0 : p[5]) || 0;
                const countedWarranty = moment.duration(warrantyDays, 'months').asDays();
                const maker = productModel
                    .replace(/[^a-z ]/gi, '')
                    .trim()
                    .split(' ')[0];
                productDto.vendorСode = vendorСode.toString();
                productDto.category = i === null || i === void 0 ? void 0 : i.category;
                productDto.name = productName;
                productDto.model = productModel;
                productDto.marketPrice = marketPrice;
                productDto.price = price;
                productDto.supplierPrice = supplierPrice;
                productDto.warrantyDays = countedWarranty;
                productDto.maker = maker;
                productDto.count = 1;
                return productDto;
            });
            return productsFromExcel;
        });
        return products.flat(2);
    }
    async manipulateMultipleItems(products) {
        return products.forEach(async (p) => {
            return await this.productModel.findOneAndUpdate({ name: p.name }, p, { upsert: true });
        });
    }
};
ProductsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(products_schema_1.Product.name)),
    __param(1, (0, mongoose_1.InjectModel)(orders_schema_1.Order.name)),
    __param(2, (0, mongoose_1.InjectModel)(clients_schema_1.Client.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        clients_service_1.ClientsService])
], ProductsService);
exports.ProductsService = ProductsService;
//# sourceMappingURL=products.service.js.map