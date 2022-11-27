"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const products_service_1 = require("../products/products.service");
const configuration_module_1 = require("../../common/config/configuration.module");
const clients_schema_1 = require("../clients/schema/clients.schema");
const clients_service_1 = require("./../clients/clients.service");
const products_schema_1 = require("./../products/schema/products.schema");
const orders_controller_1 = require("./orders.controller");
const orders_service_1 = require("./orders.service");
const orders_schema_1 = require("./schema/orders.schema");
let OrdersModule = class OrdersModule {
};
OrdersModule = __decorate([
    (0, common_1.Module)({
        imports: [
            configuration_module_1.ConfigurationModule,
            mongoose_1.MongooseModule.forFeature([
                { name: orders_schema_1.Order.name, schema: orders_schema_1.OrdersSchema },
                { name: clients_schema_1.Client.name, schema: clients_schema_1.ClientSchema },
                { name: products_schema_1.Product.name, schema: products_schema_1.ProductsSchema }
            ])
        ],
        controllers: [orders_controller_1.OrdersController],
        providers: [orders_service_1.OrdersService, clients_service_1.ClientsService, products_service_1.ProductsService],
        exports: [orders_service_1.OrdersService]
    })
], OrdersModule);
exports.OrdersModule = OrdersModule;
//# sourceMappingURL=orders.module.js.map