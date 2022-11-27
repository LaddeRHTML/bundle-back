"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateFileDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_file_dto_1 = require("./create-file.dto");
class UpdateFileDto extends (0, swagger_1.PartialType)(create_file_dto_1.CreateFileDto) {
}
exports.UpdateFileDto = UpdateFileDto;
//# sourceMappingURL=update-file.dto.js.map