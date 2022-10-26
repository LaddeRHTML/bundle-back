import { Body, Controller, Delete, Get, Param, Post, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'api/auth/guards/jwt-auth.guard';
import RoleGuard from 'api/auth/guards/role-auth.guard';
import { UserPasswords } from 'api/users/interface/passwords.interface';
import { UserData } from 'api/users/interface/user.interface';
import { apiVersion } from 'src/common/constants/api-const';

import { CreateUserDto, CreateUserSettingsDto } from './dto/create-user.dto';
import { UpdateUserDto, UpdateUserSettingsDto } from './dto/update-user.dto';
import { Role } from './enum/roles.enum';
import { User, UserSettings } from './schema/user.schema';
import { UsersService } from './users.service';

const controllerName = `${apiVersion}/users`;

@Controller(controllerName)
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @UseGuards(RoleGuard(Role.Moderator))
    @UseGuards(RoleGuard(Role.Admin))
    @Post()
    create(
        @Body() createUserDto: CreateUserDto,
        createUserSettingsDto: CreateUserSettingsDto
    ): Promise<any> {
        return this.usersService.create(createUserDto, createUserSettingsDto);
    }

    @UseGuards(RoleGuard(Role.User))
    @UseGuards(RoleGuard(Role.Moderator))
    @UseGuards(RoleGuard(Role.Admin))
    @Get()
    findAll(): Promise<User[]> {
        return this.usersService.findAllUsers();
    }

    @UseGuards(RoleGuard(Role.User))
    @UseGuards(RoleGuard(Role.Moderator))
    @UseGuards(RoleGuard(Role.Admin))
    @Get('settings/all')
    findAllWithSettings(): Promise<UserSettings[]> {
        return this.usersService.findAllUsersWithSettings();
    }

    @UseGuards(RoleGuard(Role.User))
    @UseGuards(RoleGuard(Role.Moderator))
    @UseGuards(RoleGuard(Role.Admin))
    @Get(':id')
    findOne(@Param('id') _id: string): Promise<User> {
        return this.usersService.findOneUserById(_id);
    }

    @UseGuards(RoleGuard(Role.User))
    @UseGuards(RoleGuard(Role.Moderator))
    @UseGuards(RoleGuard(Role.Admin))
    @Get('/email/:email')
    async findOneByEmail(@Param('email') email: string): Promise<User> {
        const user = await this.usersService.findOneUserByEmail(email);
        user.password = undefined;
        return user;
    }

    @UseGuards(RoleGuard(Role.Moderator))
    @UseGuards(RoleGuard(Role.Admin))
    @UseGuards(JwtAuthGuard)
    @Post(':id')
    update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<User> {
        console.log(id);
        return this.usersService.updateUser(id, updateUserDto);
    }

    @UseGuards(RoleGuard(Role.User))
    @UseGuards(RoleGuard(Role.Moderator))
    @UseGuards(RoleGuard(Role.Admin))
    @Get('/settings/:userId')
    findOneUserSettings(@Param('userId') userId: string): Promise<UserSettings> {
        return this.usersService.findOneUserSettings(userId);
    }

    @UseGuards(RoleGuard(Role.User))
    @UseGuards(RoleGuard(Role.Moderator))
    @UseGuards(RoleGuard(Role.Admin))
    @Post('/settings/:userId')
    async updateUserSettings(
        @Param('userId') userId: string,
        @Body() updateUserSettingsDto: UpdateUserSettingsDto
    ): Promise<UserSettings> {
        return await this.usersService.updateUserSettings(userId, updateUserSettingsDto);
    }

    @UseGuards(RoleGuard(Role.User))
    @UseGuards(RoleGuard(Role.Moderator))
    @UseGuards(RoleGuard(Role.Admin))
    @Post('/update/:userId')
    async updateUserData(
        @Param('userId') userId: string,
        @Body() updateUserSettingsDto: UpdateUserSettingsDto,
        @Body() updateUserDto: UpdateUserDto
    ): Promise<UserData> {
        return await this.usersService.updateUserData(userId, updateUserSettingsDto, updateUserDto);
    }

    @UseGuards(RoleGuard(Role.User))
    @UseGuards(RoleGuard(Role.Moderator))
    @UseGuards(RoleGuard(Role.Admin))
    @Post('/password/update')
    async updateUserPassword(
        @Request() req: any,
        @Body() passwords: UserPasswords
    ): Promise<boolean> {
        return await this.usersService.updateUserPassword(req, passwords);
    }

    @UseGuards(RoleGuard(Role.Admin))
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.usersService.removeUser(id);
    }
}
