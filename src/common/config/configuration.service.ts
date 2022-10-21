import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { ErrorMessages } from './constants/configuration.constants';
import { CollectionNames } from './interface/configuration.interface';

@Injectable()
export class ConfigurationService {
    private readonly _connectionString!: string;
    private readonly _jwtExpiresIn!: string;
    private readonly _orderRef!: string;
    private readonly _clientRef!: string;

    get connectionString(): string {
        return this._connectionString;
    }

    get jwtExpiresIn(): string {
        return this._jwtExpiresIn;
    }

    get orderRef(): string {
        return this._orderRef;
    }

    get clientRef(): string {
        return this._clientRef;
    }

    constructor(private readonly _configService: ConfigService) {
        this._connectionString = this._getConnectionStringFromEnvFile();
        this._jwtExpiresIn = this._getJwtFieldsFromEnvFile();
        this._orderRef = this._getCollectionNamesFromEnvFile().ordersCollectionName;
        this._clientRef = this._getCollectionNamesFromEnvFile().clientsCollectionName;
    }

    private _getConnectionStringFromEnvFile(): string {
        const connectionString = this._configService.get<string>('MONGODB_URI');

        if (!connectionString) {
            throw new Error(ErrorMessages.connection_string_message);
        }

        return connectionString;
    }

    private _getJwtFieldsFromEnvFile(): string {
        const jwtExpiresIn = this._configService.get<string>('TOKEN_EXPIRATION_TIME');

        if (!jwtExpiresIn) {
            throw new Error(ErrorMessages.jwt_exp_message);
        }

        return jwtExpiresIn;
    }

    private _getCollectionNamesFromEnvFile(): CollectionNames {
        const ordersCollectionName = this._configService.get<string>('COLLECTION_KEY_ORDERS');
        const clientsCollectionName = this._configService.get<string>('COLLECTION_KEY_CLIENTS');

        if (!ordersCollectionName || !clientsCollectionName) {
            throw new Error(ErrorMessages.collection_name_message);
        }

        return { ordersCollectionName, clientsCollectionName };
    }
}
