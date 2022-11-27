import { ConfigService } from '@nestjs/config';
export declare class ConfigurationService {
    private readonly _configService;
    private readonly _connectionString;
    private readonly _jwtExpiresIn;
    private readonly _orderRef;
    private readonly _clientRef;
    get connectionString(): string;
    get jwtExpiresIn(): string;
    get orderRef(): string;
    get clientRef(): string;
    constructor(_configService: ConfigService);
    private _getConnectionStringFromEnvFile;
    private _getJwtFieldsFromEnvFile;
    private _getCollectionNamesFromEnvFile;
}
