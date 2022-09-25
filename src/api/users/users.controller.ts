import { Controller, Get, Post, Body, Param, Request, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, CreateUserSettingsDto } from './dto/create-user.dto';
import { UpdateUserDto, UpdateUserSettingsDto } from './dto/update-user.dto';
import { User, UserSettings } from './user.schema';
import { UserData } from 'interfaces/user.interface';
import { JwtAuthGuard } from 'auth/jwt-auth.guard';
import { passwords } from 'types/passwords.types';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post()
    create(
        @Body() createUserDto: CreateUserDto,
        createUserSettingsDto: CreateUserSettingsDto
    ): Promise<any> {
        return this.usersService.create(createUserDto, createUserSettingsDto);
    }

    @Get()
    findAll(): Promise<User[]> {
        return this.usersService.findAllUsers();
    }

    @Get('settings/all')
    findAllWithSettings(): Promise<UserSettings[]> {
        return this.usersService.findAllUsersWithSettings();
    }

    @Get(':id')
    findOne(@Param('id') _id: string): Promise<User> {
        return this.usersService.findOneUserById(_id);
    }

    @Get('/email/:email')
    async findOneByEmail(@Param('email') email: string): Promise<User> {
        const user = await this.usersService.findOneUserByEmail(email);
        user.password = undefined;
        return user;
    }

    @UseGuards(JwtAuthGuard)
    @Post(':id')
    update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<User> {
        console.log(id);
        return this.usersService.updateUser(id, updateUserDto);
    }

    @Get('/settings/:userId')
    findOneUserSettings(@Param('userId') userId: string): Promise<UserSettings> {
        return this.usersService.findOneUserSettings(userId);
    }

    @UseGuards(JwtAuthGuard)
    @Post('/settings/:userId')
    async updateUserSettings(
        @Param('userId') userId: string,
        @Body() updateUserSettingsDto: UpdateUserSettingsDto
    ): Promise<UserSettings> {
        return await this.usersService.updateUserSettings(userId, updateUserSettingsDto);
    }

    @UseGuards(JwtAuthGuard)
    @Post('/update/:userId')
    async updateUserData(
        @Param('userId') userId: string,
        @Body() updateUserSettingsDto: UpdateUserSettingsDto,
        @Body() updateUserDto: UpdateUserDto
    ): Promise<UserData> {
        return await this.usersService.updateUserData(userId, updateUserSettingsDto, updateUserDto);
    }

    @UseGuards(JwtAuthGuard)
    @Post('/password/update')
    async updateUserPassword(@Request() req: any, @Body() passwords: passwords): Promise<boolean> {
        return await this.usersService.updateUserPassword(req, passwords);
    }

    /* @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.removeUser(+id);
  } */
}