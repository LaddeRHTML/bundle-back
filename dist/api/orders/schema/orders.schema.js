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
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersSchema = exports.Order = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const products_schema_1 = require("../../products/schema/products.schema");
let Order = class Order {
};
__decorate([
    (0, mongoose_1.Prop)({ required: true, default: '', ref: 'clients' }),
    __metadata("design:type", String)
], Order.prototype, "client", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, default: [''], ref: products_schema_1.Product.name }),
    __metadata("design:type", Array)
], Order.prototype, "orderedProducts", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, default: new Date() }),
    __metadata("design:type", Date)
], Order.prototype, "purchaseDate", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, default: 0 }),
    __metadata("design:type", Number)
], Order.prototype, "askedPrice", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, default: 'delivery' }),
    __metadata("design:type", String)
], Order.prototype, "deliveryMethod", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, default: new Date() }),
    __metadata("design:type", Date)
], Order.prototype, "deliveryDate", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, default: '', type: String }),
    __metadata("design:type", String)
], Order.prototype, "deliveredBy", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, default: new Date() }),
    __metadata("design:type", Date)
], Order.prototype, "plannedDeliveryDate", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, default: '' }),
    __metadata("design:type", String)
], Order.prototype, "referal", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, default: 'cash' }),
    __metadata("design:type", String)
], Order.prototype, "paymentMethod", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, default: 'KZT' }),
    __metadata("design:type", String)
], Order.prototype, "paymentWallet", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, default: 0 }),
    __metadata("design:type", Number)
], Order.prototype, "paymentRemainder", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, default: '' }),
    __metadata("design:type", String)
], Order.prototype, "review", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, default: '', type: String }),
    __metadata("design:type", String)
], Order.prototype, "orderManaged", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, default: '' }),
    __metadata("design:type", String)
], Order.prototype, "comment", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, default: 0 }),
    __metadata("design:type", Number)
], Order.prototype, "closeRequestInterval", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, default: 'first-touch', type: String }),
    __metadata("design:type", String)
], Order.prototype, "orderStatus", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, default: new Date() }),
    __metadata("design:type", Date)
], Order.prototype, "firstContactDate", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, default: new Date() }),
    __metadata("design:type", Date)
], Order.prototype, "createDate", void 0);
Order = __decorate([
    (0, mongoose_1.Schema)({ versionKey: false, collection: process.env.COLLECTION_KEY_ORDERS })
], Order);
exports.Order = Order;
exports.OrdersSchema = mongoose_1.SchemaFactory.createForClass(Order);
//# sourceMappingURL=orders.schema.js.map