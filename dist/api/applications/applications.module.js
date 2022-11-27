"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplicationsModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const applications_controller_1 = require("./applications.controller");
const applications_service_1 = require("./applications.service");
const applications_schema_1 = require("./schema/applications.schema");
let ApplicationsModule = class ApplicationsModule {
};
ApplicationsModule = __decorate([
    (0, common_1.Module)({
        imports: [mongoose_1.MongooseModule.forFeature([{ name: applications_schema_1.Application.name, schema: applications_schema_1.ApplicationsSchema }])],
        controllers: [applications_controller_1.ApplicationsController],
        providers: [applications_service_1.ApplicationsService]
    })
], ApplicationsModule);
exports.ApplicationsModule = ApplicationsModule;
//# sourceMappingURL=applications.module.js.map