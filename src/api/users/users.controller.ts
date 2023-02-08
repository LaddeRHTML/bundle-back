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

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Role } from './enum/roles.enum';
import { User } from './schema/user.schema';
import { UsersService } from './users.service';

const controllerName = `${apiVersion}/users`;

interface RequestWithUser extends ExpressRequest {
    user: Payload;
}

@Controller(controllerName)
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @HasRoles(Role.Manager, Role.Admin)
    @UseGuards(RoleGuard)
    @Post()
    createOne(@Body() createUserDto: CreateUserDto, @Query('role') role: Role): Promise<User> {
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
    async findSortedItems(
        @Query('page') page: number,
        @Query('limit') limit: number,
        @Query('search-by') parameter: string
    ): Promise<Pagination<User[]>> {
        return await this.usersService.findByQuery(parameter, page, limit);
    }

    @HasRoles(Role.User, Role.Manager, Role.Admin)
    @UseGuards(RoleGuard)
    @Get(':id')
    findOne(@Param('id') id: string): Promise<User> {
        return this.usersService.findOneById(id);
    }

    @HasRoles(Role.User, Role.Manager, Role.Admin)
    @UseGuards(RoleGuard)
    @Get('/email/:email')
    async findOneByEmail(@Param('email') email: Pick<User, 'email'>): Promise<User> {
        const user = await this.usersService.findOneByEmail(email);
        user.password = undefined;
        return user;
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
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.usersService.removeOneById(id);
    }
}
