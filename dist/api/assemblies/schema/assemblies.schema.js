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
exports.AssemblySchema = exports.Assembly = void 0;
const mongoose_1 = require("@nestjs/mongoose");
let Assembly = class Assembly {
};
__decorate([
    (0, mongoose_1.Prop)({ required: true, default: 'assemblies' }),
    __metadata("design:type", String)
], Assembly.prototype, "category", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, ref: 'accessories' }),
    __metadata("design:type", Array)
], Assembly.prototype, "accessories", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, default: 'assemblies' }),
    __metadata("design:type", String)
], Assembly.prototype, "templateType", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, default: '' }),
    __metadata("design:type", String)
], Assembly.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, default: 0 }),
    __metadata("design:type", Number)
], Assembly.prototype, "marketprice", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, default: 0 }),
    __metadata("design:type", Number)
], Assembly.prototype, "supplierPrice", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, default: 0 }),
    __metadata("design:type", Number)
], Assembly.prototype, "price", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, default: 0 }),
    __metadata("design:type", Number)
], Assembly.prototype, "discountPrice", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, default: '' }),
    __metadata("design:type", String)
], Assembly.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false }),
    __metadata("design:type", Array)
], Assembly.prototype, "pictures", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Assembly.prototype, "previewPicture", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, default: 0, min: 0, max: 5 }),
    __metadata("design:type", Number)
], Assembly.prototype, "rating", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, default: 0 }),
    __metadata("design:type", Number)
], Assembly.prototype, "count", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: [] }),
    __metadata("design:type", Array)
], Assembly.prototype, "characteristics", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, default: '' }),
    __metadata("design:type", String)
], Assembly.prototype, "vendor\u0421ode", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, default: '' }),
    __metadata("design:type", String)
], Assembly.prototype, "weight", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], Assembly.prototype, "warrantyDays", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, default: new Date() }),
    __metadata("design:type", Date)
], Assembly.prototype, "uploadDate", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, default: new Date() }),
    __metadata("design:type", Date)
], Assembly.prototype, "updateDate", void 0);
Assembly = __decorate([
    (0, mongoose_1.Schema)({ versionKey: false, collection: process.env.COLLECTION_KEY_ASSEMBLIES })
], Assembly);
exports.Assembly = Assembly;
exports.AssemblySchema = mongoose_1.SchemaFactory.createForClass(Assembly);
//# sourceMappingURL=assemblies.schema.js.map