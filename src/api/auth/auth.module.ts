import { Module, forwardRef } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { jwtConstants } from 'api/auth/constants/jwt-const';
import { UsersModule } from 'api/users/users.module';
import { ConfigurationModule } from 'common/config/configuration.module';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt-auth.strategy';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
    imports: [
        ConfigurationModule,
        forwardRef(() => UsersModule),
        PassportModule,
        JwtModule.register(jwtConstants)
    ],
    providers: [AuthService, LocalStrategy, JwtStrategy],
    controllers: [AuthController],
    exports: [AuthService]
})
export class AuthModule {}
