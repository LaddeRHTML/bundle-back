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
exports.RoleGuard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const roles_const_1 = require("../constants/roles-const");
const jwt_auth_guard_1 = require("./jwt-auth.guard");
const matchRoles = (roles, userRoles) => {
    return roles.some((role) => role === userRoles);
};
let RoleGuard = class RoleGuard extends jwt_auth_guard_1.JwtAuthGuard {
    constructor(reflector) {
        super();
        this.reflector = reflector;
    }
    async canActivate(context) {
        await super.canActivate(context);
        const roles = this.reflector.getAllAndOverride(roles_const_1.ROLE_KEY, [
            context.getHandler(),
            context.getClass()
        ]);
        if (!roles) {
            return true;
        }
        const { user } = context.switchToHttp().getRequest();
        return matchRoles(roles, user.role);
    }
};
RoleGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector])
], RoleGuard);
exports.RoleGuard = RoleGuard;
exports.default = RoleGuard;
//# sourceMappingURL=role-auth.guard.js.map