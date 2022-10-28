import { Body, Controller, Delete, Get, Param, Post, Request, UseGuards } from '@nestjs/common';
import { HasRoles } from 'api/auth/decorators/roles-decorator';
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

    @HasRoles(Role.Moderator, Role.Admin)
    @UseGuards(RoleGuard)
    @Post()
    create(
        @Body() createUserDto: CreateUserDto,
        createUserSettingsDto: CreateUserSettingsDto
    ): Promise<any> {
        return this.usersService.create(createUserDto, createUserSettingsDto);
    }

    @HasRoles(Role.User, Role.Moderator, Role.Admin)
    @UseGuards(RoleGuard)
    @Get()
    findAll(): Promise<User[]> {
        return this.usersService.findAllUsers();
    }

    @HasRoles(Role.User, Role.Moderator, Role.Admin)
    @UseGuards(RoleGuard)
    @Get('settings/all')
    findAllWithSettings(): Promise<UserSettings[]> {
        return this.usersService.findAllUsersWithSettings();
    }

    @HasRoles(Role.User, Role.Moderator, Role.Admin)
    @UseGuards(RoleGuard)
    @Get(':id')
    findOne(@Param('id') _id: string): Promise<User> {
        return this.usersService.findOneUserById(_id);
    }

    @HasRoles(Role.User, Role.Moderator, Role.Admin)
    @UseGuards(RoleGuard)
    @Get('/email/:email')
    async findOneByEmail(@Param('email') email: string): Promise<User> {
        const user = await this.usersService.findOneByEmail(email);
        user.password = undefined;
        return user;
    }

    @HasRoles(Role.User, Role.Moderator, Role.Admin)
    @UseGuards(RoleGuard)
    @UseGuards(JwtAuthGuard)
    @Post(':id')
    update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<User> {
        return this.usersService.updateUser(id, updateUserDto);
    }

    @HasRoles(Role.User, Role.Moderator, Role.Admin)
    @UseGuards(RoleGuard)
    @Get('/settings/:userId')
    findOneUserSettings(@Param('userId') userId: string): Promise<UserSettings> {
        return this.usersService.findOneUserSettings(userId);
    }

    @HasRoles(Role.User, Role.Moderator, Role.Admin)
    @UseGuards(RoleGuard)
    @Post('/settings/:userId')
    async updateUserSettings(
        @Param('userId') userId: string,
        @Body() updateUserSettingsDto: UpdateUserSettingsDto
    ): Promise<UserSettings> {
        return await this.usersService.updateUserSettings(userId, updateUserSettingsDto);
    }

    @HasRoles(Role.User, Role.Moderator, Role.Admin)
    @UseGuards(RoleGuard)
    @Post('/update/:userId')
    async updateUserData(
        @Param('userId') userId: string,
        @Body() updateUserSettingsDto: UpdateUserSettingsDto,
        @Body() updateUserDto: UpdateUserDto
    ): Promise<UserData> {
        return await this.usersService.updateUserData(userId, updateUserSettingsDto, updateUserDto);
    }

    @HasRoles(Role.User, Role.Moderator, Role.Admin)
    @UseGuards(RoleGuard)
    @Post('/password/update')
    async updateUserPassword(
        @Request() req: any,
        @Body() passwords: UserPasswords
    ): Promise<boolean> {
        return await this.usersService.updateUserPassword(req, passwords);
    }

    @HasRoles(Role.User, Role.Moderator, Role.Admin)
    @UseGuards(RoleGuard)
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.usersService.removeUser(id);
    }
}
