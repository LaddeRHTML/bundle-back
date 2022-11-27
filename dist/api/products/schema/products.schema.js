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
exports.ProductsSchema = exports.Product = void 0;
const mongoose_1 = require("@nestjs/mongoose");
let Product = class Product {
};
__decorate([
    (0, mongoose_1.Prop)({ required: true, default: 'home_c' }),
    __metadata("design:type", String)
], Product.prototype, "category", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, ref: 'orders' }),
    __metadata("design:type", Array)
], Product.prototype, "includedInOrders", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, ref: 'clients' }),
    __metadata("design:type", Array)
], Product.prototype, "buyers", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, default: '' }),
    __metadata("design:type", String)
], Product.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, default: 0 }),
    __metadata("design:type", Number)
], Product.prototype, "marketPrice", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, default: 0 }),
    __metadata("design:type", Number)
], Product.prototype, "supplierPrice", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, default: 0 }),
    __metadata("design:type", Number)
], Product.prototype, "price", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, default: 0 }),
    __metadata("design:type", Number)
], Product.prototype, "discountPrice", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, default: '' }),
    __metadata("design:type", String)
], Product.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false }),
    __metadata("design:type", Array)
], Product.prototype, "pictures", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false }),
    __metadata("design:type", String)
], Product.prototype, "previewPicture", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, default: 0, min: 0, max: 5 }),
    __metadata("design:type", Number)
], Product.prototype, "rating", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, default: 1 }),
    __metadata("design:type", Number)
], Product.prototype, "count", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: [] }),
    __metadata("design:type", Array)
], Product.prototype, "characteristics", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, default: '' }),
    __metadata("design:type", String)
], Product.prototype, "class", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, default: '' }),
    __metadata("design:type", String)
], Product.prototype, "vendor\u0421ode", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, default: '' }),
    __metadata("design:type", String)
], Product.prototype, "maker", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, default: '' }),
    __metadata("design:type", String)
], Product.prototype, "weight", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, default: '' }),
    __metadata("design:type", String)
], Product.prototype, "model", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], Product.prototype, "warrantyDays", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, default: new Date() }),
    __metadata("design:type", Date)
], Product.prototype, "uploadDate", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, default: new Date() }),
    __metadata("design:type", Date)
], Product.prototype, "updateDate", void 0);
Product = __decorate([
    (0, mongoose_1.Schema)({ versionKey: false, collection: process.env.COLLECTION_KEY_PRODUCTS })
], Product);
exports.Product = Product;
exports.ProductsSchema = mongoose_1.SchemaFactory.createForClass(Product);
//# sourceMappingURL=products.schema.js.map