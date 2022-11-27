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
exports.AccessorySchema = exports.Accessory = void 0;
const mongoose_1 = require("@nestjs/mongoose");
let Accessory = class Accessory {
};
__decorate([
    (0, mongoose_1.Prop)({ required: true, default: 'accessories' }),
    __metadata("design:type", String)
], Accessory.prototype, "category", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, default: '' }),
    __metadata("design:type", String)
], Accessory.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, default: 0 }),
    __metadata("design:type", Number)
], Accessory.prototype, "marketprice", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, default: 0 }),
    __metadata("design:type", Number)
], Accessory.prototype, "supplierPrice", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, default: 0 }),
    __metadata("design:type", Number)
], Accessory.prototype, "price", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, default: 0 }),
    __metadata("design:type", Number)
], Accessory.prototype, "discountPrice", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, default: '' }),
    __metadata("design:type", String)
], Accessory.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false }),
    __metadata("design:type", Array)
], Accessory.prototype, "pictures", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Accessory.prototype, "previewPicture", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, default: 0, min: 0, max: 5 }),
    __metadata("design:type", Number)
], Accessory.prototype, "rating", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, default: 0 }),
    __metadata("design:type", Number)
], Accessory.prototype, "count", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: [] }),
    __metadata("design:type", Array)
], Accessory.prototype, "characteristics", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, default: '' }),
    __metadata("design:type", String)
], Accessory.prototype, "class", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, default: '' }),
    __metadata("design:type", String)
], Accessory.prototype, "vendor\u0421ode", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, default: '' }),
    __metadata("design:type", String)
], Accessory.prototype, "maker", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, default: '' }),
    __metadata("design:type", String)
], Accessory.prototype, "weight", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, default: '' }),
    __metadata("design:type", String)
], Accessory.prototype, "model", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], Accessory.prototype, "warrantyDays", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, default: new Date() }),
    __metadata("design:type", Date)
], Accessory.prototype, "uploadDate", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, default: new Date() }),
    __metadata("design:type", Date)
], Accessory.prototype, "updateDate", void 0);
Accessory = __decorate([
    (0, mongoose_1.Schema)({ versionKey: false, collection: process.env.COLLECTION_KEY_ACCESSORIES })
], Accessory);
exports.Accessory = Accessory;
exports.AccessorySchema = mongoose_1.SchemaFactory.createForClass(Accessory);
//# sourceMappingURL=accessories.schema.js.map