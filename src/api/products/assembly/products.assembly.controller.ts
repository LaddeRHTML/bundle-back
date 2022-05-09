import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ProductsService } from '../products.service';
import { Assembly } from '../dto/product.dto';
import { AssemblyService } from './products.assembly.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('products/assembly/')
export class AssemblyController {
    constructor(private readonly assemblyService: AssemblyService) {}

    @UseGuards(JwtAuthGuard)
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

    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    update(@Param('id') id: string, @Body() assembly: Assembly): Promise<Assembly> {
        return this.assemblyService.update(id, assembly);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    remove(@Param('id') id: string): Promise<Assembly> {
        return this.assemblyService.remove(id);
    }
}
