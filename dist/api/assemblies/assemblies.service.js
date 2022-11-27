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
exports.AssembliesService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const index_1 = require("../../common/utils/index");
const assemblies_schema_1 = require("./schema/assemblies.schema");
let AssembliesService = class AssembliesService {
    constructor(assemblyModel) {
        this.assemblyModel = assemblyModel;
    }
    async create(createAssemblyDto) {
        return await this.assemblyModel.create(createAssemblyDto);
    }
    async findAll() {
        return await this.assemblyModel.find({});
    }
    async findSortedItems(page, limit) {
        const total = await this.assemblyModel.count({}).exec();
        const query = this.assemblyModel.find({});
        return (0, index_1.paginate)(page, query, limit, total);
    }
    async findOne(_id) {
        return await this.assemblyModel.findOne({ _id });
    }
    async update(id, updateAssemblyDto) {
        return await this.assemblyModel.findOneAndUpdate({ _id: id }, Object.assign({}, updateAssemblyDto), { new: true });
    }
    async remove(_id) {
        return await this.assemblyModel.findOneAndRemove({ _id });
    }
};
AssembliesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(assemblies_schema_1.Assembly.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], AssembliesService);
exports.AssembliesService = AssembliesService;
//# sourceMappingURL=assemblies.service.js.map