"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateApplicationDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_application_dto_1 = require("./create-application.dto");
class UpdateApplicationDto extends (0, swagger_1.PartialType)(create_application_dto_1.CreateApplicationDto) {
}
exports.UpdateApplicationDto = UpdateApplicationDto;
//# sourceMappingURL=update-application.dto.js.map