import { Module, forwardRef } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { JWT_ENVIRONMENT_VARS } from 'auth/constants';
import { JwtStrategy } from 'auth/strategies/jwt-auth.strategy';
import { LocalStrategy } from 'auth/strategies/local.strategy';

import { ConfigurationModule } from 'config/configuration.module';

import { AuthController } from 'controller/AuthController';

import { AuthService } from 'service/AuthService';

import { UsersModule } from './UserModule';

@Module({
    imports: [
        ConfigurationModule,
        forwardRef(() => UsersModule),
        PassportModule,
        JwtModule.register(JWT_ENVIRONMENT_VARS)
    ],
    providers: [AuthService, LocalStrategy, JwtStrategy],
    controllers: [AuthController],
    exports: [AuthService]
})
export class AuthModule {}
