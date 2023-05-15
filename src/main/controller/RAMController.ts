import {
    Controller,
    UseGuards,
    Post,
    Req,
    Body,
    Query,
    Get,
    Param,
    Patch,
    Delete
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { HasRoles } from 'auth/decorators/roles-decorator';
import RoleGuard from 'auth/guards/role-auth.guard';
import { PageOptionsDto } from 'common/pagination/dtos/page-options.dto';
import { PageDto } from 'common/pagination/dtos/page.dto';

import { CreateRAMDto } from 'dto/RAM/CreateRAMDto';
import { UpdateRAMDto } from 'dto/RAM/UpdateRAMDto';

import { RAM } from 'model/accessories/RAM/RAM';
import { Role } from 'model/user/UserEnums';

import { RequestWithUser } from 'service/AuthService';
import { RAMService } from 'service/RAMService';

@ApiTags('RAM')
@Controller('/ram')
@ApiBearerAuth('JWT-auth')
export class RAMController {
    constructor(private readonly ramService: RAMService) {}

    @ApiOperation({ description: 'Создание оперативной памяти' })
    @HasRoles(Role.Manager, Role.Admin)
    @UseGuards(RoleGuard)
    @Post('/')
    async createOne(
        @Body() createRAMDto: CreateRAMDto,
        @Req() { user: { id } }: RequestWithUser
    ): Promise<RAM> {
        return await this.ramService.createOne(createRAMDto, id);
    }

    @ApiOperation({ description: 'Получение одной | kit оперативной памяти по id' })
    @HasRoles(Role.User, Role.Manager, Role.Admin)
    @UseGuards(RoleGuard)
    @Get('/:id')
    findOne(@Param('id') id: string): Promise<RAM | null> {
        return this.ramService.findOneById(id);
    }

    @ApiOperation({ description: 'Поиск определенной оперативной памяти' })
    @HasRoles(Role.User, Role.Manager, Role.Admin)
    @UseGuards(RoleGuard)
    @Post('/search?')
    async findSome(
        @Query() pageOptionsDto: PageOptionsDto,
        @Body() filters: RAM
    ): Promise<PageDto<RAM>> {
        return await this.ramService.findSome(pageOptionsDto, filters);
    }

    @ApiOperation({ description: 'Обновление оперативной памяти по id' })
    @HasRoles(Role.Manager, Role.Admin)
    @UseGuards(RoleGuard)
    @Patch('/:id')
    async updateById(
        @Param('id') id: string,
        @Req() { user: { id: userId } }: RequestWithUser,
        @Body() updateRAMDto: UpdateRAMDto
    ): Promise<RAM> {
        return await this.ramService.updateOne(id, updateRAMDto, userId);
    }

    @ApiOperation({ description: 'Удаление оперативной памяти по id' })
    @HasRoles(Role.Admin)
    @UseGuards(RoleGuard)
    @Delete('/:id')
    async removeOneById(@Param('id') id: string): Promise<RAM> {
        return await this.ramService.removeOneById(id);
    }
}
