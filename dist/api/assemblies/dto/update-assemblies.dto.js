"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateAssemblyDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_assemblies_dto_1 = require("./create-assemblies.dto");
class UpdateAssemblyDto extends (0, swagger_1.PartialType)(create_assemblies_dto_1.CreateAssemblyDto) {
}
exports.UpdateAssemblyDto = UpdateAssemblyDto;
//# sourceMappingURL=update-assemblies.dto.js.map