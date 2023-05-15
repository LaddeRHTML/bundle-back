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

import { CreateFanDto } from 'dto/Fan/CreateFanDto';
import { UpdateFanDto } from 'dto/Fan/UpdateFanDto';

import { Fan } from 'model/accessories/Fan/Fan';
import { Role } from 'model/user/UserEnums';

import { RequestWithUser } from 'service/AuthService';
import { FanService } from 'service/FanService';

@ApiTags('Fan')
@Controller('/fan')
@ApiBearerAuth('JWT-auth')
export class FanController {
    constructor(private readonly fanService: FanService) {}

    @ApiOperation({ description: 'Создание вентилятора' })
    @HasRoles(Role.Manager, Role.Admin)
    @UseGuards(RoleGuard)
    @Post('/')
    async createOne(
        @Body() createFanDto: CreateFanDto,
        @Req() { user: { id } }: RequestWithUser
    ): Promise<Fan> {
        return await this.fanService.createOne(createFanDto, id);
    }

    @ApiOperation({ description: 'Получение одного вентилятора по id' })
    @HasRoles(Role.User, Role.Manager, Role.Admin)
    @UseGuards(RoleGuard)
    @Get('/:id')
    findOne(@Param('id') id: string): Promise<Fan | null> {
        return this.fanService.findOneById(id);
    }

    @ApiOperation({ description: 'Поиск определенного вентилятора' })
    @HasRoles(Role.User, Role.Manager, Role.Admin)
    @UseGuards(RoleGuard)
    @Post('/search?')
    async findSome(
        @Query() pageOptionsDto: PageOptionsDto,
        @Body() filters: Fan
    ): Promise<PageDto<Fan>> {
        return await this.fanService.findSome(pageOptionsDto, filters);
    }

    @ApiOperation({ description: 'Обновление вентилятора по id' })
    @HasRoles(Role.Manager, Role.Admin)
    @UseGuards(RoleGuard)
    @Patch('/:id')
    async updateById(
        @Param('id') id: string,
        @Req() { user: { id: userId } }: RequestWithUser,
        @Body() updateFanDto: UpdateFanDto
    ): Promise<SuccessfullyUpdatedEntityResponse<Fan>> {
        return await this.fanService.updateOne(id, updateFanDto, userId);
    }

    @ApiOperation({ description: 'Удаления ветнилятора по id' })
    @HasRoles(Role.Admin)
    @UseGuards(RoleGuard)
    @Delete('/:id')
    async removedOneById(@Param('id') id: string): Promise<Fan> {
        return await this.fanService.removeOneById(id);
    }
}
