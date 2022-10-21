import { JwtModuleOptions } from '@nestjs/jwt';

export const jwtConstants: JwtModuleOptions = {
    secret: `${process.env.SECRET_KEY}`,
    signOptions: { expiresIn: process.env.TOKEN_EXPIRATION_TIME }
};
