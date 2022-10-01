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
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
        });
    }

    async validate(payload: any) {
        if (payload === null) {
            console.log('NULL');
            throw new UnauthorizedException();
        }

        return payload;
    }
}
