import {
    Body,
    Controller,
    DefaultValuePipe,
    Delete,
    Get,
    Param,
    ParseArrayPipe,
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
import { CreatePCCaseDto } from 'dto/PCCase/CreatePCCaseDto';
import { UpdatePCCaseDto } from 'dto/PCCase/UpdatePCCaseDto';
import { PCCase } from 'model/accessories/PCCase/PCCase';
import { Role } from 'model/user/UserEnums';
import { RequestWithUser } from 'service/AuthService';
import { PCCaseService } from 'service/PCCaseService';

export type AllowedPcCaseRelations = ['fan'];

@ApiTags('PC-Case')
@Controller('/pc-case')
@ApiBearerAuth('JWT-auth')
export class PCCaseController {
    constructor(private readonly pcCaseService: PCCaseService) {}

    @ApiOperation({ description: 'Создание корпуса' })
    @HasRoles(Role.Manager, Role.Admin)
    @UseGuards(RoleGuard)
    @Post('/')
    async createOne(
        @Body() createPCCaseDto: CreatePCCaseDto,
        @Req() { user: { id } }: RequestWithUser
    ): Promise<PCCase> {
        return await this.pcCaseService.createOne(createPCCaseDto, id);
    }

    @ApiOperation({ description: 'Получение корпуса по id' })
    @HasRoles(Role.User, Role.Manager, Role.Admin)
    @UseGuards(RoleGuard)
    @Get('/:id')
    findOne(@Param('id') id: string): Promise<PCCase | null> {
        return this.pcCaseService.findOneById(id);
    }

    @ApiOperation({ description: 'Поиск определенного корпуса' })
    @HasRoles(Role.User, Role.Manager, Role.Admin)
    @UseGuards(RoleGuard)
    @Post('/search?')
    async findSome(
        @Query() pageOptionsDto: PageOptionsDto,
        @Body() filters: PCCase,
        @Query(
            'relations',
            new DefaultValuePipe([]),
            new ParseArrayPipe({
                items: String,
                separator: ',',
                optional: true
            })
        )
        relations: AllowedPcCaseRelations
    ): Promise<PageDto<PCCase>> {
        return await this.pcCaseService.findSome(pageOptionsDto, filters, relations);
    }

    @ApiOperation({ description: 'Обновление корпуса по id' })
    @HasRoles(Role.Manager, Role.Admin)
    @UseGuards(RoleGuard)
    @Patch('/:id')
    async updateById(
        @Param('id') id: string,
        @Req() { user: { id: userId } }: RequestWithUser,
        @Body() updatePCCaseDto: UpdatePCCaseDto
    ): Promise<SuccessfullyUpdatedEntityResponse<PCCase>> {
        return await this.pcCaseService.updateOne(id, updatePCCaseDto, userId);
    }

    @ApiOperation({ description: 'Удаление корпуса по id' })
    @HasRoles(Role.Admin)
    @UseGuards(RoleGuard)
    @Delete('/:id')
    async removedOneById(@Param('id') id: string): Promise<PCCase> {
        return await this.pcCaseService.removeOneById(id);
    }
}
