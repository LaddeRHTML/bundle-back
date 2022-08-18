import { PaginationTypes } from 'interfaces/utils.interface';
import { UpdateAssemblyDto } from './dto/update-assemblies.dto';
import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UseGuards,
    Query
} from '@nestjs/common';
import { JwtAuthGuard } from 'auth/jwt-auth.guard';
import { CreateAssemblyDto } from './dto/create-assemblies.dto';
import { AssembliesService } from './assemblies.service';
import { Assembly } from './assemblies.schema';

@Controller('products/assemblies/')
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
