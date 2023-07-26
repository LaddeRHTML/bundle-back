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
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

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

@ApiTags('GPU')
@Controller('/gpu')
@ApiBearerAuth('JWT-auth')
export class GPUController {
    constructor(private readonly gpuService: GPUService) {}

    @ApiOperation({ description: 'Создание видеокарты' })
    @HasRoles(Role.Manager, Role.Admin)
    @UseGuards(RoleGuard)
    @Post('/')
    async createOne(
        @Body() createGPUDto: CreateGPUDto,
        @Req() { user: { id } }: RequestWithUser
    ): Promise<GPU> {
        return await this.gpuService.createOne(createGPUDto, id);
    }

    @ApiOperation({ description: 'Получение одной видеокарты по id' })
    @HasRoles(Role.User, Role.Manager, Role.Admin)
    @UseGuards(RoleGuard)
    @Get('/:id')
    findOne(@Param('id') id: string): Promise<GPU | null> {
        return this.gpuService.findOneById(id);
    }

    @ApiOperation({ description: 'Поиск определенной видеокарты' })
    @HasRoles(Role.User, Role.Manager, Role.Admin)
    @UseGuards(RoleGuard)
    @Post('/search?')
    async findSome(
        @Query() pageOptionsDto: PageOptionsDto,
        @Body() filters: GPU
    ): Promise<PageDto<GPU>> {
        return await this.gpuService.findSome(pageOptionsDto, filters);
    }

    @ApiOperation({ description: 'Обновленние видеокарты по id' })
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

    @ApiOperation({ description: 'Удаление видеокарты по id' })
    @HasRoles(Role.Admin)
    @UseGuards(RoleGuard)
    @Delete('/:id')
    async removeOneById(@Param('id') id: string): Promise<GPU> {
        return await this.gpuService.removeOneById(id);
    }
}
