import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Query,
    Req,
    UseGuards
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { HasRoles } from 'auth/decorators/roles-decorator';
import RoleGuard from 'auth/guards/role-auth.guard';
import { SuccessfullyUpdatedEntityResponse } from 'common/interfaces';
import { PageOptionsDto } from 'common/pagination/dtos/page-options.dto';
import { PageDto } from 'common/pagination/dtos/page.dto';

import { CreateHDDDto } from 'dto/HDD/CreateHDDDto';
import { UpdateHDDDto } from 'dto/HDD/UpdateHDDDto';

import { HDD } from 'model/accessories/HDD/HDD';
import { Role } from 'model/user/UserEnums';

import { RequestWithUser } from 'service/AuthService';
import { HDDService } from 'service/HDDService';

@ApiTags('HDD')
@Controller('/hdd')
export class HDDController {
    constructor(private readonly hddService: HDDService) {}

    @HasRoles(Role.Manager, Role.Admin)
    @UseGuards(RoleGuard)
    @Post('/')
    async createOne(
        @Body() createHDDDto: CreateHDDDto,
        @Req() { user: { id } }: RequestWithUser
    ): Promise<HDD> {
        return await this.hddService.createOne(createHDDDto, id);
    }

    @HasRoles(Role.User, Role.Manager, Role.Admin)
    @UseGuards(RoleGuard)
    @Get('/:id')
    findOne(@Param('id') id: string): Promise<HDD | null> {
        return this.hddService.findOneById(id);
    }

    @HasRoles(Role.User, Role.Manager, Role.Admin)
    @UseGuards(RoleGuard)
    @Post('/search?')
    async findSome(
        @Query() pageOptionsDto: PageOptionsDto,
        @Body() filters: HDD
    ): Promise<PageDto<HDD>> {
        return await this.hddService.findSome(pageOptionsDto, filters);
    }

    @HasRoles(Role.Manager, Role.Admin)
    @UseGuards(RoleGuard)
    @Patch('/:id')
    async updateById(
        @Param('id') id: string,
        @Req() { user: { id: userId } }: RequestWithUser,
        @Body() updateHDDDto: UpdateHDDDto
    ): Promise<SuccessfullyUpdatedEntityResponse<HDD>> {
        return await this.hddService.updateOne(id, updateHDDDto, userId);
    }

    @HasRoles(Role.Admin)
    @UseGuards(RoleGuard)
    @Delete('/:id')
    async removeOneById(@Param('id') id: string): Promise<HDD> {
        return await this.hddService.removeOneById(id);
    }
}
