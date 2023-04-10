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
import { ApiProperty, ApiTags } from '@nestjs/swagger';

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
export class CPUController {
    constructor(private readonly cpuService: CPUService) {}

    @ApiProperty()
    @HasRoles(Role.Manager, Role.Admin)
    @UseGuards(RoleGuard)
    @Post('/')
    async createOne(
        @Body() createCPUDto: CreateCPUDto,
        @Req() { user: { id } }: RequestWithUser
    ): Promise<CPU> {
        return await this.cpuService.createOne(createCPUDto, id);
    }

    @HasRoles(Role.User, Role.Manager, Role.Admin)
    @UseGuards(RoleGuard)
    @Get('/:id')
    findOne(
        @Param('id') id: string
        /* @Query(
            'relations',
            new DefaultValuePipe([]),
            new ParseArrayPipe({
                items: String,
                separator: ',',
                optional: true
            })
        )
        relations: AllowedProductRelations */
    ): Promise<CPU | null> {
        return this.cpuService.findOne({ where: { id } });
    }

    @HasRoles(Role.User, Role.Manager, Role.Admin)
    @UseGuards(RoleGuard)
    @Post('/search?')
    async findSome(
        @Query() pageOptionsDto: PageOptionsDto,
        @Body() filters: CPU

        // @Query(
        //     'relations',
        //     new DefaultValuePipe([]),
        //     new ParseArrayPipe({
        //         items: String,
        //         separator: ',',
        //         optional: true
        //     })
        // )
        // relations: AllowedProductRelations
    ): Promise<PageDto<CPU>> {
        return await this.cpuService.findSome(pageOptionsDto, filters);
    }

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

    @HasRoles(Role.Admin)
    @UseGuards(RoleGuard)
    @Delete('/:id')
    async removeOneById(@Param('id') id: string): Promise<CPU> {
        return await this.cpuService.removeOneById(id);
    }
}
