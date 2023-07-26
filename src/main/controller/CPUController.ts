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

import { CreateCPUDto } from 'dto/CPU/CreateCPUDto';
import { UpdateCPUDto } from 'dto/CPU/UpdateCPUDto';

import { CPU } from 'model/accessories/CPU/CPU';
import { Role } from 'model/user/UserEnums';

import { RequestWithUser } from 'service/AuthService';
import { CPUService } from 'service/CPUService';

@ApiTags('CPU')
@Controller('/cpu')
@ApiBearerAuth('JWT-auth')
export class CPUController {
    constructor(private readonly cpuService: CPUService) {}

    @ApiOperation({ description: 'Создание процессора' })
    @HasRoles(Role.Manager, Role.Admin)
    @UseGuards(RoleGuard)
    @Post('/')
    async createOne(
        @Body() createCPUDto: CreateCPUDto,
        @Req() { user: { id } }: RequestWithUser
    ): Promise<CPU> {
        return await this.cpuService.createOne(createCPUDto, id);
    }

    @ApiOperation({ description: 'Получение одного процессора по id' })
    @HasRoles(Role.User, Role.Manager, Role.Admin)
    @UseGuards(RoleGuard)
    @Get('/:id')
    findOne(@Param('id') id: string): Promise<CPU | null> {
        return this.cpuService.findOneById(id);
    }

    @ApiOperation({ description: 'Поиск определенного процессора' })
    @HasRoles(Role.User, Role.Manager, Role.Admin)
    @UseGuards(RoleGuard)
    @Post('/search?')
    async findSome(
        @Query() pageOptionsDto: PageOptionsDto,
        @Body() filters: CPU
    ): Promise<PageDto<CPU>> {
        return await this.cpuService.findSome(pageOptionsDto, filters);
    }

    @ApiOperation({ description: 'Обновления процессора по id' })
    @HasRoles(Role.Manager, Role.Admin)
    @UseGuards(RoleGuard)
    @Patch('/:id')
    async updateById(
        @Param('id') id: string,
        @Req() { user: { id: userId } }: RequestWithUser,
        @Body() updateCPUDto: UpdateCPUDto
    ): Promise<SuccessfullyUpdatedEntityResponse<CPU>> {
        return await this.cpuService.updateOne(id, updateCPUDto, userId);
    }

    @ApiOperation({ description: 'Удаление процессора по id' })
    @HasRoles(Role.Admin)
    @UseGuards(RoleGuard)
    @Delete('/:id')
    async removeOneById(@Param('id') id: string): Promise<CPU> {
        return await this.cpuService.removeOneById(id);
    }
}
