import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { CreateUserDto, CreateUserSettingsDto } from 'api/users/dto/create-user.dto';
import { UsersService } from 'api/users/users.service';
import { AuthService } from 'auth/auth.service';
import { JwtAuthGuard } from 'auth/guards/jwt-auth.guard';
import { LocalAuthGuard } from 'auth/guards/local-auth.guard';
import { AccessToken } from 'auth/interface/auth.types';
import { Request, Response } from 'express';
import { UserData } from 'src/common/interfaces/user.interface';

import { User } from '../api/users/schemas/user.schema';
import { CHECK, LOGIN, REGISTER } from './constants/message.patterns';

@Controller('/api/v1/auth/')
export class AuthController {
    constructor(private authService: AuthService, private usersService: UsersService) {}

    @MessagePattern(LOGIN)
    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Req() req: Request): Promise<AccessToken> {
        return await this.authService.login(req.user as User);
    }

    @MessagePattern(CHECK)
    @UseGuards(JwtAuthGuard)
    @Get('check')
    async check(@Req() req: Request): Promise<UserData> {
        const userId = req.user['userId'] as string;
        const user = await this.usersService.findOneUserById(userId);
        const userSettings = await this.usersService.findOneUserSettings(userId);
        return {
            user,
            userSettings
        };
    }

    @MessagePattern(REGISTER)
    @UseGuards(LocalAuthGuard)
    @Post('register')
    async register(
        @Req() req: Request,
        userSettings: CreateUserSettingsDto
    ): Promise<CreateUserDto> {
        return this.authService.register(req.body, userSettings);
    }

    /* @UseGuards(RefreshAuthGuard)
    @Get('refresh-tokens')
    async regenerateTokens(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
        const userId = req.user['_id'].toString();
        const access_token = await this.authService.signJwt(userId);
        const refreshToken = await this.authService.getRefreshToken(userId);
        const secretData = {
            access_token,
            refreshToken
        };

        res.cookie('auth-cookie', secretData, { httpOnly: true });
        return { msg: 'success' };
    } */
}
