import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Accessories } from '../dto/product.dto';
import { AccessoriesService } from './products.accessories.service';

@Controller('products/accessories/')
export class AccessoriesController {
    constructor(private readonly accessoriesService: AccessoriesService) {}

    @UseGuards(JwtAuthGuard)
    @Post('')
    create(@Body() accessories: Accessories) {
        return this.accessoriesService.create(accessories);
    }

    @Get()
    findAll() {
        return this.accessoriesService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') _id: string) {
        return this.accessoriesService.findOne(_id);
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    update(@Param('id') id: string, @Body() accessories: Accessories) {
        return this.accessoriesService.update(id, accessories);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.accessoriesService.remove(id);
    }
}
