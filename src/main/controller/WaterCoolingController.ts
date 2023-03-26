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
import { PageOptionsDto } from 'common/pagination/dtos/page-options.dto';
import { PageDto } from 'common/pagination/dtos/page.dto';

import { CreateWaterCoolingDto } from 'dto/WaterCooling/CreateWaterCooling';
import { UpdateWaterCoolingDto } from 'dto/WaterCooling/UpdateWaterCooling';

import { WaterCooling } from 'model/accessories/WaterCooling/WaterCooling';
import { Role } from 'model/user/UserEnums';

import { RequestWithUser } from 'service/AuthService';
import { WaterCoolingService } from 'service/WaterCooling';

@Controller('/water-cooler')
export class WaterCoolingController {
    constructor(private readonly waterCoolingService: WaterCoolingService) {}

    @HasRoles(Role.Manager, Role.Admin)
    @UseGuards(RoleGuard)
    @Post('/')
    async createOne(
        @Body() createWaterCoolingDto: CreateWaterCoolingDto,
        @Req() { user: { id } }: RequestWithUser
    ): Promise<WaterCooling> {
        return await this.waterCoolingService.createOne(createWaterCoolingDto, id);
    }

    @HasRoles(Role.User, Role.Manager, Role.Admin)
    @UseGuards(RoleGuard)
    @Get('/:id')
    findOne(@Param('id') id: string): Promise<WaterCooling | null> {
        return this.waterCoolingService.findOne({ where: { id } });
    }

    @HasRoles(Role.User, Role.Manager, Role.Admin)
    @UseGuards(RoleGuard)
    @Post('/search?')
    async findSome(
        @Query() pageOptionsDto: PageOptionsDto,
        @Body() filters: WaterCooling
    ): Promise<PageDto<WaterCooling>> {
        return await this.waterCoolingService.findSome(pageOptionsDto, filters);
    }

    @HasRoles(Role.Manager, Role.Admin)
    @UseGuards(RoleGuard)
    @Patch('/:id')
    async updateById(
        @Param('id') id: string,
        @Req() { user: { id: userId } }: RequestWithUser,
        @Body() updateWaterCoolingDto: UpdateWaterCoolingDto
    ): Promise<WaterCooling> {
        return await this.waterCoolingService.updateOne(id, updateWaterCoolingDto, userId);
    }

    @HasRoles(Role.Admin)
    @UseGuards(RoleGuard)
    @Delete('/:id')
    async removeOneById(@Param('id') id: string): Promise<WaterCooling> {
        return await this.waterCoolingService.removeOneById(id);
    }
}
