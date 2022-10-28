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

import { AccessoriesService } from './accessories.service';
import { CreateAccessoryDto } from './dto/create-accessories.dto';
import { UpdateAccessoryDto } from './dto/update-accessories.dto';
import { Accessory } from './schema/accessories.schema';

const controllerName = `${apiVersion}/accessories/`;
@Controller(controllerName)
export class AccessoriesController {
    constructor(private readonly accessoriesService: AccessoriesService) {}

    @HasRoles(Role.Moderator)
    @UseGuards(RoleGuard)
    @Post('')
    create(@Body() createAccessoryDto: CreateAccessoryDto): Promise<Accessory> {
        return this.accessoriesService.create(createAccessoryDto);
    }

    @HasRoles(Role.User, Role.Moderator, Role.Admin)
    @UseGuards(RoleGuard)
    @Get()
    findAll(): Promise<Accessory[]> {
        return this.accessoriesService.findAll();
    }

    @HasRoles(Role.User, Role.Moderator, Role.Admin)
    @UseGuards(RoleGuard)
    @Get('/filter?')
    async findSortedItems(
        @Query('page') page: number,
        @Query('limit') limit: number
    ): Promise<Pagination> {
        return await this.accessoriesService.findSortedItems(page, limit);
    }

    @HasRoles(Role.User, Role.Moderator, Role.Admin)
    @UseGuards(RoleGuard)
    @Get(':id')
    findOne(@Param('id') id: string): Promise<Accessory> {
        return this.accessoriesService.findOne(id);
    }

    @HasRoles(Role.Moderator, Role.Admin)
    @UseGuards(RoleGuard)
    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updateAccessoryDto: UpdateAccessoryDto
    ): Promise<Accessory> {
        return this.accessoriesService.update(id, updateAccessoryDto);
    }

    @HasRoles(Role.Admin)
    @UseGuards(RoleGuard)
    @Delete(':id')
    remove(@Param('id') id: string): Promise<Accessory> {
        return this.accessoriesService.remove(id);
    }
}
