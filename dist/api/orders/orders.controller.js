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
exports.OrdersController = void 0;
const common_1 = require("@nestjs/common");
const roles_decorator_1 = require("../auth/decorators/roles-decorator");
const role_auth_guard_1 = require("../auth/guards/role-auth.guard");
const roles_enum_1 = require("../users/enum/roles.enum");
const api_const_1 = require("../../common/constants/api-const");
const create_order_dto_1 = require("./dto/create-order.dto");
const update_order_dto_1 = require("./dto/update-order.dto");
const orders_service_1 = require("./orders.service");
const controllerName = `${api_const_1.apiVersion}/orders`;
let OrdersController = class OrdersController {
    constructor(orderService) {
        this.orderService = orderService;
    }
    create(clientId, createOrderDto) {
        return this.orderService.create(clientId, createOrderDto);
    }
    async findSortedItems(page, limit) {
        return await this.orderService.findSortedItems(page, limit);
    }
    findAll() {
        return this.orderService.findAll();
    }
    findOne(id) {
        return this.orderService.findOne(id);
    }
    update(id, updateOrderDto) {
        return this.orderService.update(id, updateOrderDto);
    }
    async remove(id) {
        return await this.orderService.remove(id);
    }
};
__decorate([
    (0, roles_decorator_1.HasRoles)(roles_enum_1.Role.Moderator, roles_enum_1.Role.Admin),
    (0, common_1.UseGuards)(role_auth_guard_1.default),
    (0, common_1.Post)('/create?'),
    __param(0, (0, common_1.Query)('clientId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_order_dto_1.CreateOrderDto]),
    __metadata("design:returntype", void 0)
], OrdersController.prototype, "create", null);
__decorate([
    (0, roles_decorator_1.HasRoles)(roles_enum_1.Role.User, roles_enum_1.Role.Moderator, roles_enum_1.Role.Admin),
    (0, common_1.UseGuards)(role_auth_guard_1.default),
    (0, common_1.Get)('/filter?'),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "findSortedItems", null);
__decorate([
    (0, roles_decorator_1.HasRoles)(roles_enum_1.Role.User, roles_enum_1.Role.Moderator, roles_enum_1.Role.Admin),
    (0, common_1.UseGuards)(role_auth_guard_1.default),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "findAll", null);
__decorate([
    (0, roles_decorator_1.HasRoles)(roles_enum_1.Role.User, roles_enum_1.Role.Moderator, roles_enum_1.Role.Admin),
    (0, common_1.UseGuards)(role_auth_guard_1.default),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "findOne", null);
__decorate([
    (0, roles_decorator_1.HasRoles)(roles_enum_1.Role.Moderator, roles_enum_1.Role.Admin),
    (0, common_1.UseGuards)(role_auth_guard_1.default),
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_order_dto_1.UpdateOrderDto]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "update", null);
__decorate([
    (0, roles_decorator_1.HasRoles)(roles_enum_1.Role.Admin),
    (0, common_1.UseGuards)(role_auth_guard_1.default),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "remove", null);
OrdersController = __decorate([
    (0, common_1.Controller)(controllerName),
    __metadata("design:paramtypes", [orders_service_1.OrdersService])
], OrdersController);
exports.OrdersController = OrdersController;
//# sourceMappingURL=orders.controller.js.map