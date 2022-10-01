import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'api/users/users.module';

import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt-auth.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { RefreshStrategy } from './strategies/refresh.strategy';

@Module({
    imports: [
        UsersModule,
        PassportModule,
        JwtModule.register({
            secret: `${process.env.SECRET_KEY}`,
            signOptions: { expiresIn: '18000s' }
        })
    ],
    providers: [AuthService, LocalStrategy, JwtStrategy, RefreshStrategy],
    exports: [AuthService]
})
export class AuthModule {}
