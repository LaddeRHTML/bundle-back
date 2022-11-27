"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const accessories_module_1 = require("../api/accessories/accessories.module");
const applications_module_1 = require("../api/applications/applications.module");
const assemblies_module_1 = require("../api/assemblies/assemblies.module");
const auth_module_1 = require("../api/auth/auth.module");
const clients_module_1 = require("../api/clients/clients.module");
const files_module_1 = require("../api/files/files.module");
const orders_module_1 = require("../api/orders/orders.module");
const products_module_1 = require("../api/products/products.module");
const users_module_1 = require("../api/users/users.module");
const configuration_module_1 = require("../common/config/configuration.module");
const configuration_service_1 = require("../common/config/configuration.service");
const app_controller_1 = require("./app.controller");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            configuration_module_1.ConfigurationModule,
            mongoose_1.MongooseModule.forRootAsync({
                imports: [configuration_module_1.ConfigurationModule],
                inject: [configuration_service_1.ConfigurationService],
                useFactory: (appConfigService) => {
                    const options = {
                        uri: appConfigService.connectionString,
                        useNewUrlParser: true,
                        useUnifiedTopology: true
                    };
                    return options;
                }
            }),
            users_module_1.UsersModule,
            auth_module_1.AuthModule,
            products_module_1.ProductsModule,
            applications_module_1.ApplicationsModule,
            files_module_1.FilesModule,
            clients_module_1.ClientsModule,
            orders_module_1.OrdersModule,
            accessories_module_1.AccessoriesModule,
            assemblies_module_1.AssemblyModule
        ],
        controllers: [app_controller_1.AppController],
        providers: []
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map