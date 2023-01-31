import { BadRequestException, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { AuthService } from '../auth.service';

@Injectable()
export class RefreshStrategy extends PassportStrategy(Strategy, 'refresh') {
    constructor() {
        super({
            ignoreExpiration: true,
            passReqToCallback: true,
            secretOrKey: `${process.env.SECRET_KEY}`,
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
        });
    }

    /* async validate(req: Request, payload: any) {
        if (!payload) {
            throw new BadRequestException('invalid jwt token');
        }

        let data = req?.cookies['auth-cookie'];

        if (!data?.refreshToken) {
            throw new BadRequestException('invalid refresh token');
        }

        let user = await this.authService.validRefreshToken(payload, data.refreshToken);

        if (!user) {
            throw new BadRequestException('token expired');
        }

        return user;
    } */
}
