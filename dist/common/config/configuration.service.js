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
exports.ConfigurationService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const configuration_constants_1 = require("./constants/configuration.constants");
let ConfigurationService = class ConfigurationService {
    constructor(_configService) {
        this._configService = _configService;
        this._connectionString = this._getConnectionStringFromEnvFile();
        this._jwtExpiresIn = this._getJwtFieldsFromEnvFile();
        this._orderRef = this._getCollectionNamesFromEnvFile().ordersCollectionName;
        this._clientRef = this._getCollectionNamesFromEnvFile().clientsCollectionName;
    }
    get connectionString() {
        return this._connectionString;
    }
    get jwtExpiresIn() {
        return this._jwtExpiresIn;
    }
    get orderRef() {
        return this._orderRef;
    }
    get clientRef() {
        return this._clientRef;
    }
    _getConnectionStringFromEnvFile() {
        const connectionString = this._configService.get('MONGODB_URI');
        if (!connectionString) {
            throw new Error(configuration_constants_1.ErrorMessages.connection_string_message);
        }
        return connectionString;
    }
    _getJwtFieldsFromEnvFile() {
        const jwtExpiresIn = this._configService.get('TOKEN_EXPIRATION_TIME');
        if (!jwtExpiresIn) {
            throw new Error(configuration_constants_1.ErrorMessages.jwt_exp_message);
        }
        return jwtExpiresIn;
    }
    _getCollectionNamesFromEnvFile() {
        const ordersCollectionName = this._configService.get('COLLECTION_KEY_ORDERS');
        const clientsCollectionName = this._configService.get('COLLECTION_KEY_CLIENTS');
        if (!ordersCollectionName || !clientsCollectionName) {
            throw new Error(configuration_constants_1.ErrorMessages.collection_name_message);
        }
        return { ordersCollectionName, clientsCollectionName };
    }
};
ConfigurationService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], ConfigurationService);
exports.ConfigurationService = ConfigurationService;
//# sourceMappingURL=configuration.service.js.map