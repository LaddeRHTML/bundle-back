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
import { JwtAuthGuard } from 'api/auth/guards/jwt-auth.guard';
import RoleGuard from 'api/auth/guards/role-auth.guard';
import { Role } from 'api/users/enum/roles.enum';
import { apiVersion } from 'src/common/constants/api-const';
import { Pagination } from 'src/common/interfaces/utils.interface';

import { AssembliesService } from './assemblies.service';
import { CreateAssemblyDto } from './dto/create-assemblies.dto';
import { UpdateAssemblyDto } from './dto/update-assemblies.dto';
import { Assembly } from './schema/assemblies.schema';

const controllerName = `${apiVersion}/assemblies/`;
@Controller(controllerName)
export class AssembliesController {
    constructor(private readonly assembliesService: AssembliesService) {}

    @UseGuards(RoleGuard(Role.Moderator))
    @UseGuards(RoleGuard(Role.Admin))
    @Post('')
    create(@Body() createAssemblyDto: CreateAssemblyDto): Promise<Assembly> {
        return this.assembliesService.create(createAssemblyDto);
    }

    @UseGuards(RoleGuard(Role.User))
    @UseGuards(RoleGuard(Role.Moderator))
    @UseGuards(RoleGuard(Role.Admin))
    @Get()
    findAll(): Promise<Assembly[]> {
        return this.assembliesService.findAll();
    }

    @UseGuards(RoleGuard(Role.User))
    @UseGuards(RoleGuard(Role.Moderator))
    @UseGuards(RoleGuard(Role.Admin))
    @Get('/filter?')
    async findSortedItems(
        @Query('page') page: number,
        @Query('limit') limit: number
    ): Promise<Pagination> {
        return await this.assembliesService.findSortedItems(page, limit);
    }

    @UseGuards(RoleGuard(Role.User))
    @UseGuards(RoleGuard(Role.Moderator))
    @UseGuards(RoleGuard(Role.Admin))
    @Get(':id')
    findOne(@Param('id') id: string): Promise<Assembly> {
        return this.assembliesService.findOne(id);
    }

    @UseGuards(RoleGuard(Role.Moderator))
    @UseGuards(RoleGuard(Role.Admin))
    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updateAssemblyDto: UpdateAssemblyDto
    ): Promise<Assembly> {
        return this.assembliesService.update(id, updateAssemblyDto);
    }

    @UseGuards(RoleGuard(Role.Admin))
    @Delete(':id')
    remove(@Param('id') id: string): Promise<Assembly> {
        return this.assembliesService.remove(id);
    }
}
