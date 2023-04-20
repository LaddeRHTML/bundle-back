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
import { CreatePCCaseDto } from 'dto/PCCase/CreatePCCaseDto';
import { UpdatePCCaseDto } from 'dto/PCCase/UpdatePCCaseDto';
import { PCCase } from 'model/accessories/PCCase/PCCase';
import { Role } from 'model/user/UserEnums';
import { RequestWithUser } from 'service/AuthService';
import { PCCaseService } from 'service/PCCaseService';

@ApiTags('PC-Case')
@Controller('/pc-case')
export class PCCaseController {
    constructor(private readonly pcCaseService: PCCaseService) {}

    @HasRoles(Role.Manager, Role.Admin)
    @UseGuards(RoleGuard)
    @Post('/')
    async createOne(
        @Body() createPCCaseDto: CreatePCCaseDto,
        @Req() { user: { id } }: RequestWithUser
    ): Promise<PCCase> {
        return await this.pcCaseService.createOne(createPCCaseDto, id);
    }

    @HasRoles(Role.User, Role.Manager, Role.Admin)
    @UseGuards(RoleGuard)
    @Get('/:id')
    findOne(@Param('id') id: string): Promise<PCCase | null> {
        return this.pcCaseService.findOne({ where: { id } });
    }

    @HasRoles(Role.User, Role.Manager, Role.Admin)
    @UseGuards(RoleGuard)
    @Post('/search?')
    async findSome(
        @Query() pageOptionsDto: PageOptionsDto,
        @Body() filters: PCCase
    ): Promise<PageDto<PCCase>> {
        return await this.pcCaseService.findSome(pageOptionsDto, filters);
    }

    @HasRoles(Role.Manager, Role.Admin)
    @UseGuards(RoleGuard)
    @Patch('/:id')
    async updateById(
        @Param('id') id: string,
        @Req() { user: { id: userId } }: RequestWithUser,
        @Body() updatePCCaseDto: UpdatePCCaseDto
    ): Promise<SuccessfullyUpdatedEntityResponse<PCCase>> {
        return await this.pcCaseService.updateOne(id, updatePCCaseDto, userId);
    }

    @HasRoles(Role.Admin)
    @UseGuards(RoleGuard)
    @Delete('/:id')
    async removedOneById(@Param('id') id: string): Promise<PCCase> {
        return await this.pcCaseService.removeOneById(id);
    }
}
