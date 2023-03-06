import { JwtModuleOptions } from '@nestjs/jwt';

export const ROLE_KEY = process.env.ROLE_KEY;

export const JWT_ENVIRONMENT_VARS: JwtModuleOptions = {
    secret: `${process.env.SECRET_KEY}`,
    signOptions: { expiresIn: process.env.TOKEN_EXPIRATION_TIME }
};
