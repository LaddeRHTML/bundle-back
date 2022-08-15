import { Client } from './entities/client.entity';
import { JwtAuthGuard } from './../../auth/jwt-auth.guard';
import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';

@Controller('clients')
export class ClientsController {
    constructor(private readonly clientsService: ClientsService) {}

    @UseGuards(JwtAuthGuard)
    @Post()
    create(@Body() createClientDto: CreateClientDto): Promise<Client> {
        return this.clientsService.create(createClientDto);
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    findAll(): Promise<Client[]> {
        return this.clientsService.findAll();
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    findOne(@Param('id') id: string): Promise<Client> {
        return this.clientsService.findOne(id);
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateClientDto: UpdateClientDto): Promise<Client> {
        return this.clientsService.update(id, updateClientDto);
    }

    /* @Delete(':id')
  remove(@Param('id') id: string) {
    return this.clientsService.remove(id);
  } */
}
