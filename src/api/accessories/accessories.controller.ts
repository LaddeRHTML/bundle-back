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

    @UseGuards(RoleGuard(Role.Moderator))
    @UseGuards(RoleGuard(Role.Admin))
    @Post('')
    create(@Body() createAccessoryDto: CreateAccessoryDto): Promise<Accessory> {
        return this.accessoriesService.create(createAccessoryDto);
    }

    @UseGuards(RoleGuard(Role.User))
    @UseGuards(RoleGuard(Role.Moderator))
    @UseGuards(RoleGuard(Role.Admin))
    @Get()
    findAll(): Promise<Accessory[]> {
        return this.accessoriesService.findAll();
    }

    @UseGuards(RoleGuard(Role.User))
    @UseGuards(RoleGuard(Role.Moderator))
    @UseGuards(RoleGuard(Role.Admin))
    @Get('/filter?')
    async findSortedItems(
        @Query('page') page: number,
        @Query('limit') limit: number
    ): Promise<Pagination> {
        return await this.accessoriesService.findSortedItems(page, limit);
    }

    @UseGuards(RoleGuard(Role.User))
    @UseGuards(RoleGuard(Role.Moderator))
    @UseGuards(RoleGuard(Role.Admin))
    @Get(':id')
    findOne(@Param('id') id: string): Promise<Accessory> {
        return this.accessoriesService.findOne(id);
    }

    @UseGuards(RoleGuard(Role.Moderator))
    @UseGuards(RoleGuard(Role.Admin))
    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updateAccessoryDto: UpdateAccessoryDto
    ): Promise<Accessory> {
        return this.accessoriesService.update(id, updateAccessoryDto);
    }

    @UseGuards(RoleGuard(Role.Admin))
    @Delete(':id')
    remove(@Param('id') id: string): Promise<Accessory> {
        return this.accessoriesService.remove(id);
    }
}
