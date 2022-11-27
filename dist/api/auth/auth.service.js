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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const users_service_1 = require("../users/users.service");
const bcrypt = require("bcryptjs");
const configuration_service_1 = require("../../common/config/configuration.service");
const bcrypt_1 = require("../../common/constants/bcrypt");
let AuthService = class AuthService {
    constructor(userService, jwtService, configService) {
        this.userService = userService;
        this.jwtService = jwtService;
        this.configService = configService;
    }
    async validateUser(email, password) {
        const user = await this.userService.findOneByEmail(email);
        if (user) {
            const compareResult = await bcrypt.compare(password, user.password);
            if (compareResult) {
                user.password = undefined;
                return user;
            }
            else {
                throw new common_1.HttpException('Unauthorized!', common_1.HttpStatus.UNAUTHORIZED);
            }
        }
        return null;
    }
    signJwt(payload) {
        return this.jwtService.sign(payload, {
            expiresIn: this.configService.jwtExpiresIn
        });
    }
    async login(req) {
        try {
            const userId = await req['_id'].toString();
            const role = req.role;
            const access_token = this.signJwt({ userId, role });
            return { access_token };
        }
        catch (error) {
            throw error;
        }
    }
    async register(registrationData, userSettings) {
        const hashedPassword = await bcrypt.hash(registrationData.password, bcrypt_1.hashRounds);
        const userExists = await this.userService.findOneByEmail(registrationData.email);
        if (userExists) {
            throw new common_1.HttpException('User already exists', common_1.HttpStatus.CONFLICT);
        }
        else {
            try {
                const { user } = await this.userService.create(Object.assign(Object.assign({}, registrationData), { password: hashedPassword }), userSettings);
                user.password = undefined;
                return user;
            }
            catch (error) {
                throw new common_1.HttpException('Server error!', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService,
        configuration_service_1.ConfigurationService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map