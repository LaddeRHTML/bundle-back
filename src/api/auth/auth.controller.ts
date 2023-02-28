import { Controller, Get, Post, Query, Req, UseGuards } from '@nestjs/common';
import { AuthService } from 'api/auth/auth.service';
import { JwtAuthGuard } from 'api/auth/guards/jwt-auth.guard';
import { LocalAuthGuard } from 'api/auth/guards/local-auth.guard';
import { CreateUserDto } from 'api/users/dto/create-user.dto';
import { Role } from 'api/users/enum';
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

    // @UseGuards(JwtAuthGuard)
    // @Get('check')
    // async check(@Req() req: Request): Promise<User> {
    //     const userId = req.user['userId'] as string;

    //     const user = await this.usersService.findOneById(userId);

    //     user.password = undefined;

    //     return user;
    // }

    // @Post('register')
    // async register(@Req() req: Request, @Query('role') role: Role): Promise<CreateUserDto> {
    //     return this.authService.register(req.body, role);
    // }

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
