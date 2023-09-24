import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { HasRoles } from 'auth/decorators/roles-decorator';
import RoleGuard from 'auth/guards/role-auth.guard';
import { PageOptionsDto } from 'common/pagination/dtos/page-options.dto';
import { Role } from 'model/user/UserEnums';
import { AccessoriesService } from 'service/AccessoriesService';

@ApiTags('Accessories')
@Controller('/accessories')
@ApiBearerAuth('JWT-auth')
export class AccessoriesController {
    constructor(private readonly accessoriesService: AccessoriesService) {}

    @ApiOperation({ description: 'Сбор деталей' })
    @HasRoles(Role.User, Role.Manager, Role.Admin)
    @UseGuards(RoleGuard)
    @Get('/')
    async batchAccessories(@Query() pageOptionsDto: PageOptionsDto) {
        return await this.accessoriesService.batchAccessories(pageOptionsDto);
    }
}
