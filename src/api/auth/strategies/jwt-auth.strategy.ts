import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { jwtConstants } from 'api/auth/constants/jwt-const';
import { ExtractJwt, Strategy } from 'passport-jwt';

export interface Payload {
    userId: string;
    iat: number;
    exp: number;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: jwtConstants.secret,
            ignoreExpiration: false
        });
    }

    async validate(payload: Payload): Promise<Payload> {
        if (payload === null) {
            throw new UnauthorizedException();
        }

        return payload;
    }
}
