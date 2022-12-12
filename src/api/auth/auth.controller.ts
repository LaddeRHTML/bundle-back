import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from 'api/auth/auth.service';
import { JwtAuthGuard } from 'api/auth/guards/jwt-auth.guard';
import { LocalAuthGuard } from 'api/auth/guards/local-auth.guard';
import { CreateUserDto, CreateUserSettingsDto } from 'api/users/dto/create-user.dto';
import { UserData } from 'api/users/interface/user.interface';
import { UsersService } from 'api/users/users.service';
import { Request } from 'express';
import { apiVersion } from 'src/common/constants/api-const';

import { User } from '../users/schema/user.schema';
import { AccessToken } from './interface/auth.interface';

const controllerName = `${apiVersion}/auth/`;

@Controller(controllerName)
export class AuthController {
    constructor(private authService: AuthService, private usersService: UsersService) {}

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Req() req: Request): Promise<AccessToken> {
        return await this.authService.login(req.user as User);
    }

    @UseGuards(JwtAuthGuard)
    @Get('check')
    async check(@Req() req: Request): Promise<UserData> {
        const userId = req.user['userId'] as string;

        const user = await this.usersService.findOneUserById(userId);
        const userSettings = await this.usersService.findOneUserSettings(userId);

        user.password = undefined;

        return {
            user,
            userSettings
        };
    }

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
