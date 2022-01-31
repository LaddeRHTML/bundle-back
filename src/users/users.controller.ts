import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException, HttpException, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto, UserSettingsDto } from './dto/create-user.dto';
import { UpdateUserDto, UpdateUserSettingsDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() UserDto: UserDto, UserSettingsDto: UserSettingsDto) {
    return this.usersService.create(UserDto, UserSettingsDto);
    /* try {
      return this.usersService.create(UserDto, UserSettingsDto);
    } catch {
      throw new HttpException('BadRequestException', HttpStatus.BAD_REQUEST);
    } */
  }

  @Get()
  findAll() {
    return this.usersService.findAllUsers();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOneUser(id);
  }

  @Post(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.updateUser(id, updateUserDto);
  }

  @Get('/settings/:userId')
  findOneUserSettings(@Param('userId') userId: string) {
    return this.usersService.findOneUserSettings(userId);
  }

  @Post('/settings/:userId')
  async updateUserSettings(@Param('userId') userId: string, @Body() UpdateUserSettingsDto: UpdateUserSettingsDto) {
    return await this.usersService.updateUserSettings(userId, UpdateUserSettingsDto);
  }

  /* @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.removeUser(+id);
  } */
}
