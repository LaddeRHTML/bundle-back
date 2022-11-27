"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateAccessoryDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_accessories_dto_1 = require("./create-accessories.dto");
class UpdateAccessoryDto extends (0, swagger_1.PartialType)(create_accessories_dto_1.CreateAccessoryDto) {
}
exports.UpdateAccessoryDto = UpdateAccessoryDto;
//# sourceMappingURL=update-accessories.dto.js.map