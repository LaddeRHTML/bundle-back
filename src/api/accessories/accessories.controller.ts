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

import { AccessoriesService } from './accessories.service';
import { CreateAccessoryDto } from './dto/create-accessories.dto';
import { UpdateAccessoryDto } from './dto/update-accessories.dto';
import { Accessory } from './schema/accessories.schema';

@Controller(`${apiVersion}/products/accessories/`)
export class AccessoriesController {
    constructor(private readonly accessoriesService: AccessoriesService) {}

    @UseGuards(JwtAuthGuard)
    @Post('')
    create(@Body() createAccessoryDto: CreateAccessoryDto): Promise<Accessory> {
        return this.accessoriesService.create(createAccessoryDto);
    }

    @Get()
    findAll(): Promise<Accessory[]> {
        return this.accessoriesService.findAll();
    }

    @UseGuards(JwtAuthGuard)
    @Get('/filter?')
    async findSortedItems(
        @Query('page') page: number,
        @Query('limit') limit: number
    ): Promise<Pagination> {
        return await this.accessoriesService.findSortedItems(page, limit);
    }

    @Get(':id')
    findOne(@Param('id') id: string): Promise<Accessory> {
        return this.accessoriesService.findOne(id);
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updateAccessoryDto: UpdateAccessoryDto
    ): Promise<Accessory> {
        return this.accessoriesService.update(id, updateAccessoryDto);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    remove(@Param('id') id: string): Promise<Accessory> {
        return this.accessoriesService.remove(id);
    }
}
