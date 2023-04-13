import {
    Body,
    Controller,
    DefaultValuePipe,
    Delete,
    Get,
    Param,
    ParseArrayPipe,
    Patch,
    Post,
    Query,
    Request,
    UploadedFile,
    UseGuards,
    UseInterceptors
} from '@nestjs/common';
import { Req } from '@nestjs/common/decorators';
import { FileInterceptor } from '@nestjs/platform-express';
import { InsertResult } from 'typeorm';
import { ApiHeader, ApiOperation, ApiTags } from '@nestjs/swagger';

import { HasRoles } from 'auth/decorators/roles-decorator';
import { JwtAuthGuard } from 'auth/guards/jwt-auth.guard';
import RoleGuard from 'auth/guards/role-auth.guard';

import { PageOptionsDto } from 'common/pagination/dtos/page-options.dto';
import { PageDto } from 'common/pagination/dtos/page.dto';

import { CreateUserDto } from 'dto/User/CreateUserDto';
import { UpdateUserDto } from 'dto/User/UpdateUserDto';

import { User } from 'model/user/User';
import { Role } from 'model/user/UserEnums';

import { RequestWithUser } from 'service/AuthService';
import { FilesService, MulterFile } from 'service/FileService';
import { ChangePassword, UsersService } from 'service/UserService';
import { File } from 'model/file/File';

export type AllowedUserRelations = ['orders'];

@ApiTags('User')
@Controller('/users')
export class UsersController {
    constructor(
        private readonly usersService: UsersService,
        private readonly filesService: FilesService
    ) {}

    @ApiOperation({description: "Отношения между продуктом и файлом"})
    @HasRoles(Role.Manager, Role.Admin)
    @UseGuards(RoleGuard)
    @Post()
    createOne(
        @Body() createUserDto: CreateUserDto,
        @Query('role') role: Role
    ): Promise<InsertResult> {
        return this.usersService.createOne(createUserDto, role);
    }
    @ApiOperation({description: ""})
    @HasRoles(Role.User, Role.Manager, Role.Admin)
    @UseGuards(RoleGuard)
    @Get()
    findAll(): Promise<User[]> {
        return this.usersService.findAll();
    }

    @ApiOperation({description: ""})
    @HasRoles(Role.Manager, Role.Admin)
    @UseGuards(RoleGuard)
    @Get('/filter?')
    async findSome(
        @Query() pageOptionsDto: PageOptionsDto,
        @Query(
            'relations',
            new DefaultValuePipe([]),
            new ParseArrayPipe({
                items: String,
                separator: ',',
                optional: true
            })
        )
        relations: AllowedUserRelations
    ): Promise<PageDto<User>> {
        return await this.usersService.findSome(pageOptionsDto, relations);
    }

    @ApiOperation({description: ""})
    @HasRoles(Role.User, Role.Manager, Role.Admin)
    @UseGuards(RoleGuard)
    @Get(':id')
    findOne(
        @Param('id') id: string,
        @Query(
            'relations',
            new DefaultValuePipe([]),
            new ParseArrayPipe({
                items: String,
                separator: ',',
                optional: true
            })
        )
        relations: AllowedUserRelations
    ): Promise<User | null> {
        return this.usersService.findOne({ where: { id }, relations });
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
        @Req() { user: { id } }: RequestWithUser,
        @Body() passwords: ChangePassword
    ): Promise<boolean> {
        return await this.usersService.updatePassword(id, passwords);
    }

    @HasRoles(Role.User, Role.Manager, Role.Admin)
    @UseGuards(RoleGuard)
    @UseInterceptors(FileInterceptor('image'))
    @Patch('/avatar/upload')
    async updateAvatar(
        @UploadedFile()
        file: MulterFile,
        @Request() { user: { id } }: RequestWithUser
    ): Promise<File> {
        const avatar = await this.filesService.uploadFile(file, id);
        await this.usersService.updateOne(id, { avatar, avatar_id: avatar.id });
        return avatar;
    }

    @HasRoles(Role.User, Role.Manager, Role.Admin)
    @UseGuards(RoleGuard)
    @Patch('/avatar/remove')
    async removeAvatar(@Request() { user: { id } }: RequestWithUser): Promise<User> {
        return await this.usersService.updateOne(id, {
            avatar: null,
            avatar_id: null
        });
    }

    @HasRoles(Role.User, Role.Manager, Role.Admin)
    @UseGuards(RoleGuard)
    @Delete(':id')
    deleteOne(@Param('id') id: string) {
        return this.usersService.deleteOneById(id);
    }
}
