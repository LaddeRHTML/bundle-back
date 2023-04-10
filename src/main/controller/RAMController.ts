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

import { ApiTags } from '@nestjs/swagger';

@ApiTags('RAM')
@Controller('/ram')
export class RAMController {
    constructor(private readonly ramService: RAMService) {}

    @HasRoles(Role.Manager, Role.Admin)
    @UseGuards(RoleGuard)
    @Post('/')
    async createOne(
        @Body() createRAMDto: CreateRAMDto,
        @Req() { user: { id } }: RequestWithUser
    ): Promise<RAM> {
        return await this.ramService.createOne(createRAMDto, id);
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
    ): Promise<RAM | null> {
        return this.ramService.findOne({ where: { id } });
    }

    @HasRoles(Role.User, Role.Manager, Role.Admin)
    @UseGuards(RoleGuard)
    @Post('/search?')
    async findSome(
        @Query() pageOptionsDto: PageOptionsDto,
        @Body() filters: RAM

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
    ): Promise<PageDto<RAM>> {
        return await this.ramService.findSome(pageOptionsDto, filters);
    }

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

    @HasRoles(Role.Admin)
    @UseGuards(RoleGuard)
    @Delete('/:id')
    async removeOneById(@Param('id') id: string): Promise<RAM> {
        return await this.ramService.removeOneById(id);
    }
}
