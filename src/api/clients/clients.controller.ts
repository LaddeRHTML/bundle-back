import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Query,
    UseGuards
} from '@nestjs/common';
import { HasRoles } from 'api/auth/decorators/roles-decorator';
import RoleGuard from 'api/auth/guards/role-auth.guard';
import { Role } from 'api/users/enum/roles.enum';
import { apiVersion } from 'src/common/constants/api-const';
import { Pagination } from 'src/common/interfaces/utils.interface';

import { ClientsService } from './clients.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { Client } from './schema/clients.schema';

const controllerName = `${apiVersion}/clients`;

@Controller(controllerName)
export class ClientsController {
    constructor(private readonly clientsService: ClientsService) {}

    @HasRoles(Role.Moderator, Role.Admin)
    @UseGuards(RoleGuard)
    @Post()
    create(@Body() createClientDto: CreateClientDto): Promise<Client> {
        return this.clientsService.create(createClientDto);
    }

    @HasRoles(Role.User, Role.Moderator, Role.Admin)
    @UseGuards(RoleGuard)
    @Get()
    findAll(): Promise<Client[]> {
        return this.clientsService.findAll();
    }

    @HasRoles(Role.User, Role.Moderator, Role.Admin)
    @UseGuards(RoleGuard)
    @Get('/search?')
    async findByQuery(
        @Query('parameter') parameter: string,
        @Query('page') page: number,
        @Query('limit') limit: number
    ): Promise<Pagination> {
        return await this.clientsService.findByQuery(parameter, page, limit);
    }

    @HasRoles(Role.User, Role.Moderator, Role.Admin)
    @UseGuards(RoleGuard)
    @Get(':id')
    findOne(@Param('id') id: string): Promise<Client> {
        return this.clientsService.findOne(id);
    }

    @HasRoles(Role.Moderator, Role.Admin)
    @UseGuards(RoleGuard)
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateClientDto: UpdateClientDto): Promise<Client> {
        return this.clientsService.update(id, updateClientDto);
    }

    @HasRoles(Role.Admin)
    @UseGuards(RoleGuard)
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.clientsService.remove(id);
    }
}
