import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { UserData } from './interfaces/user.interface';
import { AccessToken } from './types/auth.types';
import { UserDto, UserSettingsDto } from './users/dto/create-user.dto';
import { UsersService } from './users/users.service';

@Controller()
export class AppController {
    constructor(private authService: AuthService, private usersService: UsersService) {}

    @UseGuards(LocalAuthGuard)
    @Post('auth/login')
    async login(@Request() req: any): Promise<AccessToken> {
        return this.authService.login(req.user);
    }

    @UseGuards(JwtAuthGuard)
    @Get('auth/check')
    async check(@Request() req: any): Promise<UserData> {
        const userId = req.user.userId;
        const user = await this.usersService.findOneUserById(userId);
        const userSettings = await this.usersService.findOneUserSettings(userId);
        return {
            user,
            userSettings
        };
    }

    /* @UseGuards(LocalAuthGuard) */
    @Post('auth/register')
    async register(@Request() req: any, userSettings: UserSettingsDto): Promise<UserDto> {
        return this.authService.register(req.body, userSettings);
    }
}
