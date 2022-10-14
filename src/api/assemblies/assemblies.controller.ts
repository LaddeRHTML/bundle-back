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
import { JwtAuthGuard } from 'api/auth/guards/jwt-auth.guard';
import { apiVersion } from 'src/common/constants/api-const';
import { Pagination } from 'src/common/interfaces/utils.interface';

import { AssembliesService } from './assemblies.service';
import { CreateAssemblyDto } from './dto/create-assemblies.dto';
import { UpdateAssemblyDto } from './dto/update-assemblies.dto';
import { Assembly } from './schema/assemblies.schema';

@Controller(`${apiVersion}/products/assemblies/`)
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
    ): Promise<Pagination> {
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
