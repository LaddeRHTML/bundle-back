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

import { CreateCoolerDto } from 'dto/Cooler/CreateCoolerDto';
import { UpdateCoolerDto } from 'dto/Cooler/UpdateCoolerDto';

import { Cooler } from 'model/accessories/Cooler/Cooler';
import { Role } from 'model/user/UserEnums';

import { RequestWithUser } from 'service/AuthService';
import { CoolerService } from 'service/CoolerService';

@ApiTags('Cooler')
@Controller('/cooler')
export class CoolerController {
    constructor(private readonly coolerService: CoolerService) {}

    @HasRoles(Role.Manager, Role.Admin)
    @UseGuards(RoleGuard)
    @Post('/')
    async createOne(
        @Body() createCoolerDto: CreateCoolerDto,
        @Req() { user: { id } }: RequestWithUser
    ): Promise<Cooler> {
        return await this.coolerService.createOne(createCoolerDto, id);
    }

    @HasRoles(Role.User, Role.Manager, Role.Admin)
    @UseGuards(RoleGuard)
    @Get('/:id')
    findOne(@Param('id') id: string): Promise<Cooler | null> {
        return this.coolerService.findOneById(id);
    }

    @HasRoles(Role.User, Role.Manager, Role.Admin)
    @UseGuards(RoleGuard)
    @Post('/search?')
    async findSome(
        @Query() pageOptionsDto: PageOptionsDto,
        @Body() filters: Cooler
    ): Promise<PageDto<Cooler>> {
        return await this.coolerService.findSome(pageOptionsDto, filters);
    }

    @HasRoles(Role.Manager, Role.Admin)
    @UseGuards(RoleGuard)
    @Patch('/:id')
    async updateById(
        @Param('id') id: string,
        @Req() { user: { id: userId } }: RequestWithUser,
        @Body() updateCoolerDto: UpdateCoolerDto
    ): Promise<Cooler> {
        return await this.coolerService.updateOne(id, updateCoolerDto, userId);
    }

    @HasRoles(Role.Admin)
    @UseGuards(RoleGuard)
    @Delete('/:id')
    async removedOneById(@Param('id') id: string): Promise<Cooler> {
        return await this.coolerService.removeOneById(id);
    }
}
