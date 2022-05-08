import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { Accessories } from '../dto/product.dto';
import { AccessoriesService } from './products.accessories.service';

@Controller('products/accessories/')
export class AccessoriesController {
    constructor(private readonly accessoriesService: AccessoriesService) {}

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

    @Patch(':id')
    update(@Param('id') id: string, @Body() accessories: Accessories) {
        return this.accessoriesService.update(id, accessories);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.accessoriesService.remove(id);
    }
}
