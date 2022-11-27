"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const bcrypt = __importStar(require("bcryptjs"));
const mongoose_2 = require("mongoose");
const bcrypt_1 = require("../../common/constants/bcrypt");
const user_schema_1 = require("./schema/user.schema");
let UsersService = class UsersService {
    constructor(userModel, userSettingsModel) {
        this.userModel = userModel;
        this.userSettingsModel = userSettingsModel;
    }
    async create(createUserDto, createUserSettingsDto) {
        try {
            const newUser = await this.userModel.create(createUserDto);
            const { _id } = newUser;
            const newUserSettings = await this.userSettingsModel.create(Object.assign(Object.assign({}, createUserSettingsDto), { user: _id }));
            return { user: newUser, userSettings: newUserSettings };
        }
        catch (_a) {
            throw new common_1.HttpException('BadRequestException', common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async findAllUsers() {
        return await this.userModel.find({});
    }
    async findAllUsersWithSettings() {
        const usersData = await this.userSettingsModel.find({}).populate('user', 'name email');
        return usersData;
    }
    async findOne(parameter) {
        return await this.userModel.findOne(parameter);
    }
    async findOneByEmail(email) {
        return await this.userModel.findOne({ email });
    }
    async findOneUserById(id) {
        const user = await this.userModel.findOne({ _id: id });
        return user;
    }
    async updateUser(id, updateUserDto) {
        return await this.userModel.findOneAndUpdate({ _id: id }, Object.assign({}, updateUserDto), { new: true });
    }
    async findOneUserSettings(userId) {
        return await this.userSettingsModel.findOne({ user: userId });
    }
    async updateUserSettings(userId, updateUserSettingsDto) {
        const userSettingsToUpdate = await this.userSettingsModel.findOne({ user: userId });
        const { id } = userSettingsToUpdate;
        return await this.userSettingsModel.findOneAndUpdate({ _id: id }, Object.assign({}, updateUserSettingsDto), { new: true });
    }
    async updateUserData(userId, updateUserSettingsDto, updateUserDto) {
        const user = await this.updateUser(userId, updateUserDto);
        const userSettings = await this.updateUserSettings(userId, updateUserSettingsDto);
        return {
            user,
            userSettings
        };
    }
    async updateUserPassword(req, passwords) {
        const { oldPassword, newPassword } = passwords;
        try {
            const samePass = 'Passwords are the same!';
            if (oldPassword === newPassword) {
                throw new common_1.HttpException(samePass, common_1.HttpStatus.CONFLICT);
            }
            const { userId } = req.user;
            const user = await this.findOneUserById(userId);
            if (!user) {
                throw new common_1.HttpException("User wasn't found!", common_1.HttpStatus.CONFLICT);
            }
            const compareResult = await bcrypt.compare(newPassword, user.password);
            if (compareResult) {
                throw new common_1.HttpException(samePass, common_1.HttpStatus.CONFLICT);
            }
            const newPasswordHash = await bcrypt.hash(newPassword, bcrypt_1.hashRounds);
            const updatedUser = await this.updateUser(userId, {
                password: newPasswordHash
            });
            if (!updatedUser) {
                throw new common_1.HttpException("Password wasn't updated!", common_1.HttpStatus.CONFLICT);
            }
            return true;
        }
        catch (error) {
            throw new common_1.HttpException('Conflict!', common_1.HttpStatus.CONFLICT);
        }
    }
    async removeUser(id) {
        return await this.userModel.deleteOne({ _id: id }).then(async () => {
            await this.userSettingsModel.deleteOne({ user: id });
        });
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __param(1, (0, mongoose_1.InjectModel)(user_schema_1.UserSettings.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map