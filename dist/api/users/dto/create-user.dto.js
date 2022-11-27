"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserSettingsDto = exports.CreateUserDto = void 0;
const user_schema_1 = require("../schema/user.schema");
class CreateUserDto extends user_schema_1.User {
}
exports.CreateUserDto = CreateUserDto;
class CreateUserSettingsDto extends user_schema_1.UserSettings {
}
exports.CreateUserSettingsDto = CreateUserSettingsDto;
//# sourceMappingURL=create-user.dto.js.map