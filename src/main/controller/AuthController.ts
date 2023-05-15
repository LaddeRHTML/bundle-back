import { Controller, Get, Post, Query, Req, UseGuards } from '@nestjs/common';
import { InsertResult } from 'typeorm';
import { Request } from 'express';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { AccessToken, AuthService, RequestWithUser } from 'service/AuthService';
import { UsersService } from 'service/UserService';

import { LocalAuthGuard } from 'auth/guards/local-auth.guard';
import { JwtAuthGuard } from 'auth/guards/jwt-auth.guard';

import { User } from 'model/user/User';
import { Role } from 'model/user/UserEnums';

@ApiTags('Authorization')
@Controller('/auth')
@ApiBearerAuth('JWT-auth')
export class AuthController {
    constructor(private authService: AuthService, private usersService: UsersService) {}

    @UseGuards(LocalAuthGuard)
    @Post('/login')
    async login(@Req() { user: { id, role } }: RequestWithUser): Promise<AccessToken> {
        return await this.authService.login({ id, role });
    }

    @UseGuards(JwtAuthGuard)
    @Get('/check')
    async check(@Req() { user: { id } }: RequestWithUser): Promise<User | null> {
        return await this.usersService.findOne({ where: { id } });
    }

    @Post('/register')
    async register(@Req() req: Request, @Query('role') role: Role): Promise<InsertResult> {
        return this.authService.register(req.body, role);
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
