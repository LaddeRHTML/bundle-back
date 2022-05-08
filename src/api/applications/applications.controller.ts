import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { Application } from './applications.schema';
import { ApplicationsService } from './applications.service';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationDto } from './dto/update-application.dto';

@Controller('applications')
export class ApplicationsController {
    constructor(private readonly applicationsService: ApplicationsService) {}

    @Post()
    create(@Body() createApplicationDto: CreateApplicationDto): Promise<Application> {
        return this.applicationsService.create(createApplicationDto);
    }

    @Get()
    findAll(): Promise<Application[]> {
        return this.applicationsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string): Promise<Application> {
        return this.applicationsService.findOne(id);
    }

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
