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

import { ApplicationsService } from './applications.service';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationDto } from './dto/update-application.dto';
import { Application } from './schema/applications.schema';

const controllerName = `${apiVersion}/applications`;

@Controller(controllerName)
export class ApplicationsController {
    constructor(private readonly applicationsService: ApplicationsService) {}

    @UseGuards(RoleGuard(Role.Moderator))
    @UseGuards(RoleGuard(Role.Admin))
    @Post()
    create(@Body() createApplicationDto: CreateApplicationDto): Promise<Application> {
        return this.applicationsService.create(createApplicationDto);
    }

    @UseGuards(RoleGuard(Role.User))
    @UseGuards(RoleGuard(Role.Moderator))
    @UseGuards(RoleGuard(Role.Admin))
    @Get('/filter?')
    async findSortedItems(
        @Query('page') page: number,
        @Query('limit') limit: number
    ): Promise<Pagination> {
        return await this.applicationsService.findSortedItems(page, limit);
    }

    @UseGuards(RoleGuard(Role.User))
    @UseGuards(RoleGuard(Role.Moderator))
    @UseGuards(RoleGuard(Role.Admin))
    @Get()
    findAll(): Promise<Application[]> {
        return this.applicationsService.findAll();
    }

    @UseGuards(RoleGuard(Role.User))
    @UseGuards(RoleGuard(Role.Moderator))
    @UseGuards(RoleGuard(Role.Admin))
    @Get(':id')
    findOne(@Param('id') id: string): Promise<Application> {
        return this.applicationsService.findOne(id);
    }

    @UseGuards(RoleGuard(Role.Moderator))
    @UseGuards(RoleGuard(Role.Admin))
    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updateApplicationDto: UpdateApplicationDto
    ): Promise<Application> {
        return this.applicationsService.update(id, updateApplicationDto);
    }

    @UseGuards(RoleGuard(Role.Admin))
    @Delete(':id')
    async remove(@Param('id') id: string) {
        return await this.applicationsService.remove(id);
    }
}
