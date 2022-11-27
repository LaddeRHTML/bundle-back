"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const clients_module_1 = require("../clients/clients.module");
const clients_schema_1 = require("../clients/schema/clients.schema");
const orders_schema_1 = require("../orders/schema/orders.schema");
const products_controller_1 = require("./products.controller");
const products_service_1 = require("./products.service");
const products_schema_1 = require("./schema/products.schema");
let ProductsModule = class ProductsModule {
};
ProductsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            clients_module_1.ClientsModule,
            mongoose_1.MongooseModule.forFeature([
                { name: products_schema_1.Product.name, schema: products_schema_1.ProductsSchema },
                { name: orders_schema_1.Order.name, schema: orders_schema_1.OrdersSchema },
                { name: clients_schema_1.Client.name, schema: clients_schema_1.ClientSchema }
            ])
        ],
        controllers: [products_controller_1.ProductsController],
        providers: [products_service_1.ProductsService],
        exports: [products_service_1.ProductsService]
    })
], ProductsModule);
exports.ProductsModule = ProductsModule;
//# sourceMappingURL=products.module.js.map