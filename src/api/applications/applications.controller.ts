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
import { JwtAuthGuard } from 'auth/guards/jwt-auth.guard';
import { PaginationTypes } from 'interfaces/utils.interface';
import { apiv1 } from 'src/constants/api-const';

import { Application } from './applications.schema';
import { ApplicationsService } from './applications.service';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationDto } from './dto/update-application.dto';

@Controller(`${apiv1}/applications`)
export class ApplicationsController {
    constructor(private readonly applicationsService: ApplicationsService) {}

    @Post()
    create(@Body() createApplicationDto: CreateApplicationDto): Promise<Application> {
        return this.applicationsService.create(createApplicationDto);
    }

    @UseGuards(JwtAuthGuard)
    @Get('/filter?')
    async findSortedItems(
        @Query('page') page: number,
        @Query('limit') limit: number
    ): Promise<PaginationTypes> {
        return await this.applicationsService.findSortedItems(page, limit);
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    findAll(): Promise<Application[]> {
        return this.applicationsService.findAll();
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    findOne(@Param('id') id: string): Promise<Application> {
        return this.applicationsService.findOne(id);
    }

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
