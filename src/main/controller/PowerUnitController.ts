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

import { CreatePowerUnitDto } from 'dto/PowerUnit/CreatePowerUnitDto';
import { UpdatePowerUnitDto } from 'dto/PowerUnit/UpdatePowerUnitDto';

import { PowerUnit } from 'model/accessories/PowerUnit/PowerUnit';
import { Role } from 'model/user/UserEnums';

import { RequestWithUser } from 'service/AuthService';
import { PowerUnitService } from 'service/PowerUnitService';

@ApiTags('Power-unit')
@Controller('/power-unit')
@ApiBearerAuth('JWT-auth')
export class PowerUnitController {
    constructor(private readonly powerUnitService: PowerUnitService) {}

    @ApiOperation({ description: 'Создание блока питания' })
    @HasRoles(Role.Manager, Role.Admin)
    @UseGuards(RoleGuard)
    @Post('/')
    async createOne(
        @Body() createPowerUnitDto: CreatePowerUnitDto,
        @Req() { user: { id } }: RequestWithUser
    ): Promise<PowerUnit> {
        return await this.powerUnitService.createOne(createPowerUnitDto, id);
    }

    @ApiOperation({ description: 'Получение одного блока питания по id' })
    @HasRoles(Role.User, Role.Manager, Role.Admin)
    @UseGuards(RoleGuard)
    @Get('/:id')
    findOne(@Param('id') id: string): Promise<PowerUnit | null> {
        return this.powerUnitService.findOneById(id);
    }

    @ApiOperation({ description: 'Поиск определенного блока питания' })
    @HasRoles(Role.User, Role.Manager, Role.Admin)
    @UseGuards(RoleGuard)
    @Post('/search?')
    async findSome(
        @Query() pageOptionsDto: PageOptionsDto,
        @Body() filters: PowerUnit
    ): Promise<PageDto<PowerUnit>> {
        return await this.powerUnitService.findSome(pageOptionsDto, filters);
    }

    @ApiOperation({ description: 'Обновление блока питания по id' })
    @HasRoles(Role.Manager, Role.Admin)
    @UseGuards(RoleGuard)
    @Patch('/:id')
    async updateById(
        @Param('id') id: string,
        @Req() { user: { id: userId } }: RequestWithUser,
        @Body() updatePowerUnitDto: UpdatePowerUnitDto
    ): Promise<SuccessfullyUpdatedEntityResponse<PowerUnit>> {
        return await this.powerUnitService.updateOne(id, updatePowerUnitDto, userId);
    }

    @ApiOperation({ description: 'Удаление блока питания по id' })
    @HasRoles(Role.Admin)
    @UseGuards(RoleGuard)
    @Delete('/:id')
    async removeOneById(@Param('id') id: string): Promise<PowerUnit> {
        return await this.powerUnitService.removeOneById(id);
    }
}
