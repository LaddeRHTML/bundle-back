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

import { Assembly } from './assemblies.schema';
import { AssembliesService } from './assemblies.service';
import { CreateAssemblyDto } from './dto/create-assemblies.dto';
import { UpdateAssemblyDto } from './dto/update-assemblies.dto';

@Controller(`${apiv1}/products/assemblies/`)
export class AssembliesController {
    constructor(private readonly assembliesService: AssembliesService) {}

    @UseGuards(JwtAuthGuard)
    @Post('')
    create(@Body() createAssemblyDto: CreateAssemblyDto): Promise<Assembly> {
        return this.assembliesService.create(createAssemblyDto);
    }

    @Get()
    findAll(): Promise<Assembly[]> {
        return this.assembliesService.findAll();
    }

    @UseGuards(JwtAuthGuard)
    @Get('/filter?')
    async findSortedItems(
        @Query('page') page: number,
        @Query('limit') limit: number
    ): Promise<PaginationTypes> {
        return await this.assembliesService.findSortedItems(page, limit);
    }

    @Get(':id')
    findOne(@Param('id') id: string): Promise<Assembly> {
        return this.assembliesService.findOne(id);
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updateAssemblyDto: UpdateAssemblyDto
    ): Promise<Assembly> {
        return this.assembliesService.update(id, updateAssemblyDto);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    remove(@Param('id') id: string): Promise<Assembly> {
        return this.assembliesService.remove(id);
    }
}
