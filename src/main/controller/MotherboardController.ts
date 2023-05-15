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
import { ApiBearerAuth, ApiOperation, ApiProperty, ApiTags } from '@nestjs/swagger';

import { HasRoles } from 'auth/decorators/roles-decorator';
import RoleGuard from 'auth/guards/role-auth.guard';

import { Motherboard } from 'model/accessories/Motherboard/Motherboard';
import { Role } from 'model/user/UserEnums';

import { RequestWithUser } from 'service/AuthService';
import { MotherboardService } from 'service/MotherboardService';

import { CreateMotherboardDto } from 'dto/Motherboard/CreateMotherboardDto';
import { UpdateMotherboardDto } from 'dto/Motherboard/UpdateMotherboardDto';

import { PageOptionsDto } from 'common/pagination/dtos/page-options.dto';
import { PageDto } from 'common/pagination/dtos/page.dto';
import { SuccessfullyUpdatedEntityResponse } from 'common/interfaces';

@ApiTags('Motherboard')
@Controller('/motherboard')
@ApiBearerAuth('JWT-auth')
export class MotherboardController {
    constructor(private readonly motherboardService: MotherboardService) {}

    @ApiOperation({ description: 'Создание мат.платы' })
    @ApiProperty()
    @HasRoles(Role.Manager, Role.Admin)
    @UseGuards(RoleGuard)
    @Post('/')
    async createOne(
        @Body() createMotherboardDto: CreateMotherboardDto,
        @Req() { user: { id } }: RequestWithUser
    ): Promise<Motherboard> {
        return await this.motherboardService.createOne(createMotherboardDto, id);
    }

    @ApiOperation({ description: 'Получение одной мат.платы по id' })
    @HasRoles(Role.User, Role.Manager, Role.Admin)
    @UseGuards(RoleGuard)
    @Get('/:id')
    findOne(@Param('id') id: string): Promise<Motherboard | null> {
        return this.motherboardService.findOneById(id);
    }

    @ApiOperation({ description: 'Поиск определенной мат.платы по id' })
    @HasRoles(Role.User, Role.Manager, Role.Admin)
    @UseGuards(RoleGuard)
    @Post('/search?')
    async findSome(
        @Query() pageOptionsDto: PageOptionsDto,
        @Body() filters: Motherboard
    ): Promise<PageDto<Motherboard>> {
        return await this.motherboardService.findSome(pageOptionsDto, filters);
    }

    @ApiOperation({ description: 'Обновление мат.платы по id' })
    @HasRoles(Role.Manager, Role.Admin)
    @UseGuards(RoleGuard)
    @Patch('/:id')
    async updateById(
        @Param('id') id: string,
        @Req() { user: { id: userId } }: RequestWithUser,
        @Body() updateMotherboardDto: UpdateMotherboardDto
    ): Promise<SuccessfullyUpdatedEntityResponse<Motherboard>> {
        return await this.motherboardService.updateOne(id, updateMotherboardDto, userId);
    }

    @ApiOperation({ description: 'Удаление мат.платы по id' })
    @HasRoles(Role.Admin)
    @UseGuards(RoleGuard)
    @Delete('/:id')
    async removeOneById(@Param('id') id: string): Promise<Motherboard> {
        return await this.motherboardService.removeOneById(id);
    }
}
