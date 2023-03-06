import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { ErrorMessages } from './constants/configuration.constants';

@Injectable()
export class ConfigurationService {
    private readonly _jwtExpiresIn!: string;

    get jwtExpiresIn(): string {
        return this._jwtExpiresIn;
    }

    constructor(private readonly _configService: ConfigService) {
        this._jwtExpiresIn = this._getJwtFieldsFromEnvFile();
    }

    private _getJwtFieldsFromEnvFile(): string {
        const jwtExpiresIn = this._configService.get<string>('TOKEN_EXPIRATION_TIME');

        if (!jwtExpiresIn) {
            throw new Error(ErrorMessages.jwt_exp_message);
        }

        return jwtExpiresIn;
    }
}
