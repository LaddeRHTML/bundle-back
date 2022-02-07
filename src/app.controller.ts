import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { UserSettingsDto } from './users/dto/create-user.dto';
import { UsersService } from './users/users.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private authService: AuthService,
    private usersService: UsersService
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('auth/check')
  async check(@Request() req) {
    console.log(req);
    const userId = req.user.userId;
    const user = await this.usersService.findOneUserById(userId);
    const userSettings = await this.usersService.findOneUserSettings(userId);
    return {
      user,
      userSettings
    }
  }

  /* @UseGuards(LocalAuthGuard) */
  @Post('auth/register')
  async register(@Request() req, userSettings: UserSettingsDto) {
    return this.authService.register(req.body, userSettings);
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
