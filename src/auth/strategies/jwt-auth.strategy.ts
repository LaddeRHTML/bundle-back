import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            ignoreExpiration: false,
            secretOrKey: `${process.env.SECRET_KEY}`,
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            signOptions: { expiresIn: `${process.env.TOKEN_EXPIRATION_TIME || '1d'}` }
        });
    }

    async validate(payload: any): Promise<string> {
        if (payload === null) {
            throw new UnauthorizedException();
        }

        return payload.payload;
    }
}
