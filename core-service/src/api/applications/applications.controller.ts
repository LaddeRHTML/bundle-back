import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Query,
    UseGuards
} from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { JwtAuthGuard } from 'auth/guards/jwt-auth.guard';
import { PaginationTypes } from 'interfaces/utils.interface';
import { apiv1 } from 'src/constants/api-const';

import { ApplicationsService } from './applications.service';
import { CREATE, GET_ALL, GET_FILTERED, GET_ONE, UPDATE } from './constants/message.patterns';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationDto } from './dto/update-application.dto';
import { Application } from './schemas/applications.schema';

@Controller(`${apiv1}/applications`)
export class ApplicationsController {
    constructor(private readonly applicationsService: ApplicationsService) {}

    @MessagePattern(CREATE)
    @Post()
    create(@Body() createApplicationDto: CreateApplicationDto): Promise<Application> {
        return this.applicationsService.create(createApplicationDto);
    }

    @MessagePattern(GET_FILTERED)
    @UseGuards(JwtAuthGuard)
    @Get('/filter?')
    async findSortedItems(
        @Query('page') page: number,
        @Query('limit') limit: number
    ): Promise<PaginationTypes> {
        return await this.applicationsService.findSortedItems(page, limit);
    }

    @MessagePattern(GET_ALL)
    /* @UseGuards(JwtAuthGuard) */
    @Get()
    findAll(): Promise<Application[]> {
        return this.applicationsService.findAll();
    }

    @MessagePattern(GET_ONE)
    @UseGuards(JwtAuthGuard)
    @Get(':id')
    findOne(@Param('id') id: string): Promise<Application> {
        return this.applicationsService.findOne(id);
    }

    @MessagePattern(UPDATE)
    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updateApplicationDto: UpdateApplicationDto
    ): Promise<Application> {
        return this.applicationsService.update(id, updateApplicationDto);
    }

    /* @Delete(':id')
  remove(@Param('id') id: string) {
    return this.applicationsService.remove(+id);
  } */
}
