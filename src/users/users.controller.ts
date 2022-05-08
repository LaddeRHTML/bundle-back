import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    BadRequestException,
    HttpException,
    HttpStatus
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto, UserSettingsDto } from './dto/create-user.dto';
import { UpdateUserDto, UpdateUserSettingsDto } from './dto/update-user.dto';
import { User, UserSettings } from './user.schema';
import { UserData } from 'src/interfaces/user.interface';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post()
    create(@Body() UserDto: UserDto, UserSettingsDto: UserSettingsDto): Promise<any> {
        return this.usersService.create(UserDto, UserSettingsDto);
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

    @Post(':id')
    update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<User> {
        return this.usersService.updateUser(id, updateUserDto);
    }

    @Get('/settings/:userId')
    findOneUserSettings(@Param('userId') userId: string): Promise<UserSettings> {
        return this.usersService.findOneUserSettings(userId);
    }

    @Post('/settings/:userId')
    async updateUserSettings(
        @Param('userId') userId: string,
        @Body() UpdateUserSettingsDto: UpdateUserSettingsDto
    ): Promise<UserSettings> {
        return await this.usersService.updateUserSettings(userId, UpdateUserSettingsDto);
    }

    @Post('/update/:userId')
    async updateUserData(
        @Param('userId') userId: string,
        @Body() UpdateUserSettingsDto: UpdateUserSettingsDto,
        @Body() updateUserDto: UpdateUserDto
    ): Promise<UserData> {
        return await this.usersService.updateUserData(userId, UpdateUserSettingsDto, updateUserDto);
    }

    /* @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.removeUser(+id);
  } */
}
