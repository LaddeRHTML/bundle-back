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
import { Role } from 'api/users/enum';
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

    @HasRoles(Role.Manager, Role.Admin)
    @UseGuards(RoleGuard)
    @Post('')
    createOne(@Body() createAssemblyDto: CreateAssemblyDto): Promise<Assembly> {
        return this.assembliesService.createOne(createAssemblyDto);
    }

    @HasRoles(Role.User, Role.Manager, Role.Admin)
    @UseGuards(RoleGuard)
    @Get()
    findAll(): Promise<Assembly[]> {
        return this.assembliesService.findAll();
    }

    @HasRoles(Role.User, Role.Manager, Role.Admin)
    @UseGuards(RoleGuard)
    @Get('/filter?')
    async findSortedItems(
        @Query('page') page: number,
        @Query('limit') limit: number
    ): Promise<Pagination<Assembly[]>> {
        return await this.assembliesService.findSortedItems(page, limit);
    }

    @HasRoles(Role.User, Role.Manager, Role.Admin)
    @UseGuards(RoleGuard)
    @Get(':id')
    findOne(@Param('id') id: string): Promise<Assembly> {
        return this.assembliesService.findOne(id);
    }

    @HasRoles(Role.Manager, Role.Admin)
    @UseGuards(RoleGuard)
    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updateAssemblyDto: UpdateAssemblyDto
    ): Promise<Assembly> {
        return this.assembliesService.update(id, updateAssemblyDto);
    }

    @HasRoles(Role.Admin)
    @UseGuards(RoleGuard)
    @Delete(':id')
    remove(@Param('id') id: string): Promise<Assembly> {
        return this.assembliesService.remove(id);
    }
}
