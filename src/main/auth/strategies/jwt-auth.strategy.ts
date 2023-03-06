import { Injectable, NotFoundException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { UserPayload } from 'service/AuthService';

import { JWT_ENVIRONMENT_VARS } from '../constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: JWT_ENVIRONMENT_VARS.secret,
            ignoreExpiration: false
        });
    }

    async validate(payload: UserPayload): Promise<UserPayload> {
        if (payload === null) {
            throw new NotFoundException();
        }

        return payload;
    }
}
