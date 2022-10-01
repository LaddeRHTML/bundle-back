import { Body, Controller, Get, Param, Patch, Post, Query, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'auth/guards/jwt-auth.guard';
import { Request } from 'express';
import { PaginationTypes } from 'interfaces/utils.interface';
import { apiv1 } from 'src/constants/api-const';

import { Client } from './clients.schema';
import { ClientsService } from './clients.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';

@Controller(`${apiv1}/clients`)
export class ClientsController {
    constructor(private readonly clientsService: ClientsService) {}

    @UseGuards(JwtAuthGuard)
    @Post()
    create(@Body() createClientDto: CreateClientDto): Promise<Client> {
        return this.clientsService.create(createClientDto);
    }

    /* @UseGuards(JwtAuthGuard)
    @Get('/filter?')
    async findSortedItems(
        @Query('page') page: number,
        @Query('limit') limit: number
    ): Promise<PaginationTypes> {
        return await this.clientsService.findSortedItems(page, limit);
    } */

    @UseGuards(JwtAuthGuard)
    @Get()
    findAll(): Promise<Client[]> {
        return this.clientsService.findAll();
    }

    @UseGuards(JwtAuthGuard)
    @Get('/search?')
    async findByQuery(
        @Query('parameter') parameter: string,
        @Query('page') page: number,
        @Query('limit') limit: number
    ): Promise<PaginationTypes> {
        return await this.clientsService.findByQuery(parameter, page, limit);
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
