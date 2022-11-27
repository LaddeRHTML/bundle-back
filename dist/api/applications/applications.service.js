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
exports.ApplicationsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const index_1 = require("../../common/utils/index");
const applications_schema_1 = require("./schema/applications.schema");
let ApplicationsService = class ApplicationsService {
    constructor(applicationsModel) {
        this.applicationsModel = applicationsModel;
    }
    async create(createApplicationDto) {
        return await this.applicationsModel.create(createApplicationDto);
    }
    async findSortedItems(page, limit) {
        const total = await this.applicationsModel.count({}).exec();
        const query = this.applicationsModel.find({});
        return (0, index_1.paginate)(page, query, limit, total);
    }
    async findAll() {
        return await this.applicationsModel.find({});
    }
    async findOne(_id) {
        return await this.applicationsModel.findOne({ _id });
    }
    async update(_id, updateApplicationDto) {
        return await this.applicationsModel.findOneAndUpdate({ _id }, Object.assign({}, updateApplicationDto), { new: true });
    }
    async remove(id) {
        return await this.applicationsModel.findByIdAndDelete({ _id: id });
    }
};
ApplicationsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(applications_schema_1.Application.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], ApplicationsService);
exports.ApplicationsService = ApplicationsService;
//# sourceMappingURL=applications.service.js.map