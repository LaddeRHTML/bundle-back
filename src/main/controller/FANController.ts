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
import { PageOptionsDto } from 'common/pagination/dtos/page-options.dto';
import { PageDto } from 'common/pagination/dtos/page.dto';

import { CreateFANDto } from 'dto/FAN/CreateFANDto';
import { UpdateFANDto } from 'dto/FAN/UpdateFANDto';

import { FAN } from 'model/accessories/FAN/FAN';
import { Role } from 'model/user/UserEnums';

import { RequestWithUser } from 'service/AuthService';
import { FANService } from 'service/FANService';

@ApiTags('FAN')
@Controller('/fan')
export class FANController {
    constructor(private readonly fanService: FANService) {}

    @HasRoles(Role.Manager, Role.Admin)
    @UseGuards(RoleGuard)
    @Post('/')
    async createOne(
        @Body() createFANDto: CreateFANDto,
        @Req() { user: { id } }: RequestWithUser
    ): Promise<FAN> {
        return await this.fanService.createOne(createFANDto, id);
    }

    @HasRoles(Role.User, Role.Manager, Role.Admin)
    @UseGuards(RoleGuard)
    @Get('/:id')
    findOne(@Param('id') id: string): Promise<FAN | null> {
        return this.fanService.findOne({ where: { id } });
    }

    @HasRoles(Role.User, Role.Manager, Role.Admin)
    @UseGuards(RoleGuard)
    @Post('/search?')
    async findSome(
        @Query() pageOptionsDto: PageOptionsDto,
        @Body() filters: FAN
    ): Promise<PageDto<FAN>> {
        return await this.fanService.findSome(pageOptionsDto, filters);
    }

    @HasRoles(Role.Manager, Role.Admin)
    @UseGuards(RoleGuard)
    @Patch('/:id')
    async updateById(
        @Param('id') id: string,
        @Req() { user: { id: userId } }: RequestWithUser,
        @Body() updateFANDto: UpdateFANDto
    ): Promise<FAN> {
        return await this.fanService.updateOne(id, updateFANDto, userId);
    }

    @HasRoles(Role.Admin)
    @UseGuards(RoleGuard)
    @Delete('/:id')
    async removedOneById(@Param('id') id: string): Promise<FAN> {
        return await this.fanService.removeOneById(id);
    }
}
