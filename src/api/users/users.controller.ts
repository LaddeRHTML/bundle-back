import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Query,
    Request,
    UploadedFile,
    UseGuards,
    UseInterceptors
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { InsertResult } from 'typeorm';

import { HasRoles } from 'api/auth/decorators/roles-decorator';
import { JwtAuthGuard } from 'api/auth/guards/jwt-auth.guard';
import RoleGuard from 'api/auth/guards/role-auth.guard';
import { File } from 'api/files/entitiy/file.entity';
import { UserPasswords } from 'api/users/interface/passwords.interface';
import { apiVersion } from 'common/constants/api-const';
import { PageOptionsDto } from 'common/pagination/dtos/page-options.dto';
import { PageDto } from 'common/pagination/dtos/page.dto';

import { FilesService } from './../files/files.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entity/user.entity';
import { Role } from './enum';
import { UsersService } from './users.service';
import { RequestWithUser } from 'api/auth/interface/auth.interface';

const controllerName = `${apiVersion}/users`;
@Controller(controllerName)
export class UsersController {
    constructor(
        private readonly usersService: UsersService,
        private readonly filesService: FilesService
    ) {}

    @HasRoles(Role.Manager, Role.Admin)
    @UseGuards(RoleGuard)
    @Post()
    createOne(
        @Body() createUserDto: CreateUserDto,
        @Query('role') role: Role
    ): Promise<InsertResult> {
        return this.usersService.createOne(createUserDto, role);
    }

    @HasRoles(Role.User, Role.Manager, Role.Admin)
    @UseGuards(RoleGuard)
    @Get()
    findAll(): Promise<User[]> {
        return this.usersService.findAll();
    }

    @HasRoles(Role.Manager, Role.Admin)
    @UseGuards(RoleGuard)
    @Get('/filter?')
    async findSome(@Query() pageOptionsDto: PageOptionsDto): Promise<PageDto<User>> {
        return await this.usersService.findSome(pageOptionsDto);
    }

    @HasRoles(Role.User, Role.Manager, Role.Admin)
    @UseGuards(RoleGuard)
    @Get(':id')
    findOne(@Param('id') id: string): Promise<User | null> {
        return this.usersService.findOne({ where: { id } });
    }

    @HasRoles(Role.User, Role.Manager, Role.Admin)
    @UseGuards(RoleGuard)
    @Get('/email/:email')
    async findOneByEmail(@Param('email') email: string): Promise<User | null> {
        return await this.usersService.findOne({ where: { email } });
    }

    @HasRoles(Role.User, Role.Manager, Role.Admin)
    @UseGuards(RoleGuard)
    @UseGuards(JwtAuthGuard)
    @Post(':id')
    update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<User> {
        return this.usersService.updateOne(id, updateUserDto);
    }

    @HasRoles(Role.User, Role.Manager, Role.Admin)
    @UseGuards(RoleGuard)
    @Post('/password/update')
    async updateUserPassword(
        @Request() req: RequestWithUser,
        @Body() passwords: UserPasswords
    ): Promise<boolean> {
        return await this.usersService.updatePassword(req.user, passwords);
    }

    @HasRoles(Role.User, Role.Manager, Role.Admin)
    @UseGuards(RoleGuard)
    @UseInterceptors(FileInterceptor('image'))
    @Patch('/avatar/upload')
    async updateAvatar(
        @UploadedFile()
        file: Express.Multer.File,
        @Request() req: RequestWithUser
    ): Promise<File> {
        const userId = req.user['userId'];
        const avatar = await this.filesService.uploadFile(file, userId);
        await this.usersService.updateOne(userId, { avatar, avatar_id: avatar.id });
        return avatar;
    }

    @HasRoles(Role.User, Role.Manager, Role.Admin)
    @UseGuards(RoleGuard)
    @Patch('/avatar/remove')
    async removeAvatar(@Request() req: RequestWithUser): Promise<User> {
        const userId = req.user['userId'];
        return await this.usersService.updateOne(userId, {
            avatar: undefined,
            avatar_id: undefined
        });
    }

    @HasRoles(Role.User, Role.Manager, Role.Admin)
    @UseGuards(RoleGuard)
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.usersService.removeOneById(id);
    }
}
