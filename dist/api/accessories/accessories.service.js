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
exports.AccessoriesService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const index_1 = require("../../common/utils/index");
const accessories_schema_1 = require("./schema/accessories.schema");
let AccessoriesService = class AccessoriesService {
    constructor(accessoryModel) {
        this.accessoryModel = accessoryModel;
    }
    async create(createAccessoryDto) {
        return await this.accessoryModel.create(createAccessoryDto);
    }
    async findAll() {
        return await this.accessoryModel.find({});
    }
    async findSortedItems(page, limit) {
        const total = await this.accessoryModel.count({}).exec();
        const query = this.accessoryModel.find({});
        return (0, index_1.paginate)(page, query, limit, total);
    }
    async findOne(_id) {
        return await this.accessoryModel.findOne({ _id });
    }
    async update(id, updateAccessoryDto) {
        return await this.accessoryModel.findOneAndUpdate({ _id: id }, Object.assign({}, updateAccessoryDto), { new: true });
    }
    async remove(_id) {
        return await this.accessoryModel.findOneAndRemove({ _id });
    }
};
AccessoriesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(accessories_schema_1.Accessory.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], AccessoriesService);
exports.AccessoriesService = AccessoriesService;
//# sourceMappingURL=accessories.service.js.map