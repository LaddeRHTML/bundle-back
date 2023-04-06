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

import { HasRoles } from 'auth/decorators/roles-decorator';
import RoleGuard from 'auth/guards/role-auth.guard';
import { SuccessfullyUpdatedEntityResponse } from 'common/interfaces';
import { PageOptionsDto } from 'common/pagination/dtos/page-options.dto';
import { PageDto } from 'common/pagination/dtos/page.dto';

import { CreateGPUDto } from 'dto/GPU/CreateGPUDto';
import { UpdateGPUDto } from 'dto/GPU/UpdateGPUDto';

import { GPU } from 'model/accessories/GPU/GPU';
import { Role } from 'model/user/UserEnums';

import { RequestWithUser } from 'service/AuthService';
import { GPUService } from 'service/GPUService';

@Controller('/gpu')
export class GPUController {
    constructor(private readonly gpuService: GPUService) {}

    @HasRoles(Role.Manager, Role.Admin)
    @UseGuards(RoleGuard)
    @Post('/')
    async createOne(
        @Body() createGPUDto: CreateGPUDto,
        @Req() { user: { id } }: RequestWithUser
    ): Promise<GPU> {
        return await this.gpuService.createOne(createGPUDto, id);
    }

    @HasRoles(Role.User, Role.Manager, Role.Admin)
    @UseGuards(RoleGuard)
    @Get('/:id')
    findOne(@Param('id') id: string): Promise<GPU | null> {
        return this.gpuService.findOne({ where: { id } });
    }

    @HasRoles(Role.User, Role.Manager, Role.Admin)
    @UseGuards(RoleGuard)
    @Post('/search?')
    async findSome(
        @Query() pageOptionsDto: PageOptionsDto,
        @Body() filters: GPU
    ): Promise<PageDto<GPU>> {
        return await this.gpuService.findSome(pageOptionsDto, filters);
    }

    @HasRoles(Role.Manager, Role.Admin)
    @UseGuards(RoleGuard)
    @Patch('/:id')
    async updateById(
        @Param('id') id: string,
        @Req() { user: { id: userId } }: RequestWithUser,
        @Body() updateGPUDto: UpdateGPUDto
    ): Promise<SuccessfullyUpdatedEntityResponse<GPU>> {
        return await this.gpuService.updateOne(id, updateGPUDto, userId);
    }

    @HasRoles(Role.Admin)
    @UseGuards(RoleGuard)
    @Delete('/:id')
    async removeOneById(@Param('id') id: string): Promise<GPU> {
        return await this.gpuService.removeOneById(id);
    }
}
