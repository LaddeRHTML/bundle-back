"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssemblyModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const assemblies_controller_1 = require("./assemblies.controller");
const assemblies_service_1 = require("./assemblies.service");
const assemblies_schema_1 = require("./schema/assemblies.schema");
let AssemblyModule = class AssemblyModule {
};
AssemblyModule = __decorate([
    (0, common_1.Module)({
        imports: [mongoose_1.MongooseModule.forFeature([{ name: assemblies_schema_1.Assembly.name, schema: assemblies_schema_1.AssemblySchema }])],
        controllers: [assemblies_controller_1.AssembliesController],
        providers: [assemblies_service_1.AssembliesService],
        exports: [assemblies_service_1.AssembliesService]
    })
], AssemblyModule);
exports.AssemblyModule = AssemblyModule;
//# sourceMappingURL=assemblies.module.js.map