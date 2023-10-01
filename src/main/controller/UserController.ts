import {
    Body,
    Controller,
    DefaultValuePipe,
    Delete,
    FileTypeValidator,
    Get,
    MaxFileSizeValidator,
    Param,
    ParseArrayPipe,
    ParseFilePipe,
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
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

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
@ApiBearerAuth('JWT-auth')
export class UsersController {
    constructor(
        private readonly usersService: UsersService,
        private readonly filesService: FilesService
    ) {}

    @ApiOperation({ description: 'Создание юзера в базе' })
    @HasRoles(Role.Manager, Role.Admin)
    @UseGuards(RoleGuard)
    @Post()
    createOne(
        @Body() createUserDto: CreateUserDto,
        @Query('role') role: Role
    ): Promise<InsertResult> {
        return this.usersService.createOne(createUserDto, role);
    }

    @ApiOperation({ description: 'Получение всех юзеров' })
    @HasRoles(Role.User, Role.Manager, Role.Admin)
    @UseGuards(RoleGuard)
    @Get()
    findAll(): Promise<User[]> {
        return this.usersService.findAll();
    }

    @ApiOperation({ description: 'Получение юзеров порционно' })
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

    @ApiOperation({ description: 'Получить одного юзера' })
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

    @ApiOperation({ description: 'Получить одного юзера по почте' })
    @HasRoles(Role.User, Role.Manager, Role.Admin)
    @UseGuards(RoleGuard)
    @Get('/email/:email')
    async findOneByEmail(@Param('email') email: string): Promise<User | null> {
        return await this.usersService.findOne({ where: { email } });
    }

    @ApiOperation({ description: 'Обновить одного юзера' })
    @HasRoles(Role.User, Role.Manager, Role.Admin)
    @UseGuards(RoleGuard)
    @UseGuards(JwtAuthGuard)
    @Post(':id')
    update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<User> {
        return this.usersService.updateOne(id, updateUserDto);
    }

    @ApiOperation({ description: 'Обновить пароль по айди из токена' })
    @HasRoles(Role.User, Role.Manager, Role.Admin)
    @UseGuards(RoleGuard)
    @Post('/password/update')
    async updateUserPassword(
        @Req() { user: { id } }: RequestWithUser,
        @Body() passwords: ChangePassword
    ): Promise<boolean> {
        return await this.usersService.updatePassword(id, passwords);
    }

    @ApiOperation({ description: 'Загрузить аватар' })
    @HasRoles(Role.User, Role.Manager, Role.Admin)
    @UseGuards(RoleGuard)
    @UseInterceptors(FileInterceptor('image'))
    @Post('/avatar/upload')
    async updateAvatar(
        @UploadedFile(
            new ParseFilePipe({
                validators: [
                    new FileTypeValidator({ fileType: '.(png|jpeg|jpg)' }),
                    new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 4 })
                ]
            })
        )
        file: MulterFile,
        @Request() { user: { id } }: RequestWithUser
    ): Promise<File> {
        const avatar = await this.filesService.uploadFile(file, id);
        await this.usersService.updateOne(id, { avatarId: avatar.id });
        return avatar;
    }

    @ApiOperation({ description: 'Удалить аватар' })
    @HasRoles(Role.User, Role.Manager, Role.Admin)
    @UseGuards(RoleGuard)
    @Post('/avatar/remove')
    async removeAvatar(@Request() { user: { id } }: RequestWithUser): Promise<User> {
        const user = await this.usersService.findOne({ where: { id }, select: ['avatarId'] });
        await this.filesService.deleteFile(user?.avatarId ?? '');
        return await this.usersService.updateOne(id, {
            avatarId: null
        });
    }

    @ApiOperation({ description: 'Удалить одного юзера' })
    @HasRoles(Role.User, Role.Manager, Role.Admin)
    @UseGuards(RoleGuard)
    @Delete(':id')
    deleteOne(@Param('id') id: string) {
        return this.usersService.deleteOneById(id);
    }
}
