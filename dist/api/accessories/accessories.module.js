"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccessoriesModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const accessories_controller_1 = require("./accessories.controller");
const accessories_service_1 = require("./accessories.service");
const accessories_schema_1 = require("./schema/accessories.schema");
let AccessoriesModule = class AccessoriesModule {
};
AccessoriesModule = __decorate([
    (0, common_1.Module)({
        imports: [mongoose_1.MongooseModule.forFeature([{ name: accessories_schema_1.Accessory.name, schema: accessories_schema_1.AccessorySchema }])],
        controllers: [accessories_controller_1.AccessoriesController],
        providers: [accessories_service_1.AccessoriesService],
        exports: [accessories_service_1.AccessoriesService]
    })
], AccessoriesModule);
exports.AccessoriesModule = AccessoriesModule;
//# sourceMappingURL=accessories.module.js.map