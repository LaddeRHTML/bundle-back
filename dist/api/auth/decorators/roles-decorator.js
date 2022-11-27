"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HasRoles = void 0;
const common_1 = require("@nestjs/common");
const roles_const_1 = require("../constants/roles-const");
const HasRoles = (...roles) => (0, common_1.SetMetadata)(roles_const_1.ROLE_KEY, roles);
exports.HasRoles = HasRoles;
//# sourceMappingURL=roles-decorator.js.map