"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const configuration_service_1 = require("../../common/config/configuration.service");
const mongoose_2 = __importStar(require("mongoose"));
const index_1 = require("../../common/utils/index");
const index_2 = require("../../common/utils/index");
const clients_schema_1 = require("./schema/clients.schema");
let ClientsService = class ClientsService {
    constructor(clientModel, configService) {
        this.clientModel = clientModel;
        this.configService = configService;
    }
    async create(createClientDto) {
        try {
            createClientDto.age = (0, index_2.calcRelToCurrentDate)(createClientDto.birthDay, true);
            return await this.clientModel.create(createClientDto);
        }
        catch (error) {
            throw new common_1.HttpException(error, common_1.HttpStatus.NOT_ACCEPTABLE);
        }
    }
    async findByQuery(parameter, page, limit) {
        let options = {};
        if (parameter) {
            options = {
                $or: [
                    {
                        address: new RegExp(parameter, 'i')
                    },
                    {
                        clientName: new RegExp(parameter, 'i')
                    },
                    {
                        famalyName: new RegExp(parameter, 'i')
                    },
                    {
                        phone: new RegExp(parameter, 'i')
                    },
                    {
                        email: new RegExp(parameter, 'i')
                    },
                    {
                        callManaged: new RegExp(parameter, 'i')
                    }
                ]
            };
        }
        const total = await this.clientModel.count(options).exec();
        const query = this.clientModel.find(options).populate(this.configService.orderRef);
        return (0, index_1.paginate)(page, query, limit, total);
    }
    async findAll() {
        return await this.clientModel.find({}).populate(this.configService.orderRef);
    }
    async findOne(_id) {
        return await this.clientModel.findOne({ _id }).populate(this.configService.orderRef);
    }
    async update(id, updateClientDto, settings) {
        try {
            if (updateClientDto === null || updateClientDto === void 0 ? void 0 : updateClientDto.birthDay) {
                updateClientDto.age = (0, index_2.calcRelToCurrentDate)(updateClientDto === null || updateClientDto === void 0 ? void 0 : updateClientDto.birthDay, true);
            }
            const ObjectId = new mongoose_2.default.Types.ObjectId(id);
            return await this.clientModel
                .findOneAndUpdate({ _id: ObjectId }, updateClientDto, Object.assign(Object.assign({}, settings), { new: true }))
                .populate(this.configService.orderRef);
        }
        catch (error) {
            throw new common_1.HttpException(error, common_1.HttpStatus.NOT_ACCEPTABLE);
        }
    }
    async updateMany(filter, parameter, settings) {
        return await this.clientModel
            .updateMany(filter, parameter, Object.assign(Object.assign({}, settings), { new: true }))
            .populate(this.configService.orderRef);
    }
    async remove(id) {
        return await this.clientModel.findOneAndDelete({ _id: id });
    }
};
ClientsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(clients_schema_1.Client.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        configuration_service_1.ConfigurationService])
], ClientsService);
exports.ClientsService = ClientsService;
//# sourceMappingURL=clients.service.js.map