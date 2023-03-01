import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Query,
    Request,
    UseGuards
} from '@nestjs/common';
import { HasRoles } from 'api/auth/decorators/roles-decorator';
import { JwtAuthGuard } from 'api/auth/guards/jwt-auth.guard';
import RoleGuard from 'api/auth/guards/role-auth.guard';
import { Payload } from 'api/auth/strategies/jwt-auth.strategy';
import { UserPasswords } from 'api/users/interface/passwords.interface';
import { Request as ExpressRequest } from 'express';
import { Pagination } from 'interfaces/utils.interface';
import { apiVersion } from 'src/common/constants/api-const';
import { PageOptionsDto } from 'src/common/pagination/dtos/page-options.dto';
import { PageDto } from 'src/common/pagination/dtos/page.dto';
import { InsertResult, UpdateResult } from 'typeorm';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entity/user.entity';
import { Role } from './enum';
import { UsersService } from './users.service';

const controllerName = `${apiVersion}/users`;

interface RequestWithUser extends ExpressRequest {
    user: Payload;
}

@Controller(controllerName)
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    // @HasRoles(Role.Manager, Role.Admin)
    // @UseGuards(RoleGuard)
    @Post()
    createOne(
        @Body() createUserDto: CreateUserDto,
        @Query('role') role: Role
    ): Promise<InsertResult> {
        return this.usersService.createOne(createUserDto, role);
    }

    // @HasRoles(Role.User, Role.Manager, Role.Admin)
    // @UseGuards(RoleGuard)
    @Get()
    findAll(): Promise<User[]> {
        return this.usersService.findAll();
    }

    // @HasRoles(Role.Manager, Role.Admin)
    // @UseGuards(RoleGuard)
    @Get('/filter?')
    async findSortedItems(@Query() pageOptionsDto: PageOptionsDto): Promise<PageDto<User>> {
        return await this.usersService.findSome(pageOptionsDto);
    }

    // @HasRoles(Role.User, Role.Manager, Role.Admin)
    // @UseGuards(RoleGuard)
    @Get(':id')
    findOne(@Param('id') id: string): Promise<User> {
        return this.usersService.findOne({ where: { id } });
    }

    // @HasRoles(Role.User, Role.Manager, Role.Admin)
    // @UseGuards(RoleGuard)
    @Get('/email/:email')
    async findOneByEmail(@Param('email') email: string): Promise<User> {
        return await this.usersService.findOne({ where: { email } });
    }

    // @HasRoles(Role.User, Role.Manager, Role.Admin)
    // @UseGuards(RoleGuard)
    // @UseGuards(JwtAuthGuard)
    @Post(':id')
    update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<User> {
        return this.usersService.updateOne(id, updateUserDto);
    }

    // @HasRoles(Role.User, Role.Manager, Role.Admin)
    // @UseGuards(RoleGuard)
    // @Post('/password/update')
    async updateUserPassword(
        @Request() req: RequestWithUser,
        @Body() passwords: UserPasswords
    ): Promise<boolean> {
        return await this.usersService.updatePassword(req.user, passwords);
    }

    // @HasRoles(Role.User, Role.Manager, Role.Admin)
    // @UseGuards(RoleGuard)
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.usersService.removeOneById(id);
    }
}
