import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductsService } from '../products.service';
import { Assembly } from '../dto/product.dto';
import { AssemblyService } from './products.assembly.service';

@Controller('products/assembly/')
export class AssemblyController {
    constructor(private readonly assemblyService: AssemblyService) {}

    @Post('')
    create(@Body() assembly: Assembly): Promise<Assembly> {
        return this.assemblyService.create(assembly);
    }

    @Get()
    findAll(): Promise<Assembly[]> {
        return this.assemblyService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string): Promise<Assembly> {
        return this.assemblyService.findOne(id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() assembly: Assembly): Promise<Assembly> {
        return this.assemblyService.update(id, assembly);
    }

    @Delete(':id')
    remove(@Param('id') id: string): Promise<Assembly> {
        return this.assemblyService.remove(id);
    }
}
