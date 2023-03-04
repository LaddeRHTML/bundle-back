import {
    Body,
    Controller,
    Get,
    Param,
    Patch,
    Post,
    Query,
    Req,
    Request,
    UploadedFiles,
    UseGuards,
    UseInterceptors
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { InsertResult } from 'typeorm';

import { HasRoles } from 'api/auth/decorators/roles-decorator';
import RoleGuard from 'api/auth/guards/role-auth.guard';
import { RequestWithUser } from 'api/auth/interface/auth.interface';
import { FilesService } from 'api/files/files.service';
import { Role } from 'api/users/enum';
import { apiVersion } from 'common/constants/api-const';
import { PageOptionsDto } from 'common/pagination/dtos/page-options.dto';
import { PageDto } from 'common/pagination/dtos/page.dto';

import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entity/product.entity';
import { getPricesResponse } from './interfaces/products.interface';
import { ProductsService } from './products.service';
import { MulterFile } from 'api/files/interface/file.interface';

const controllerName = `${apiVersion}/products`;

@Controller(controllerName)
export class ProductsController {
    constructor(
        private readonly productsService: ProductsService,
        private readonly filesService: FilesService
    ) {}

    @HasRoles(Role.Manager, Role.Admin)
    @UseGuards(RoleGuard)
    @Post('/create')
    async createOne(
        @Body() createProductDto: CreateProductDto,
        @Req() { user }: RequestWithUser
    ): Promise<InsertResult> {
        const userId = user['userId'];
        return await this.productsService.createOne(createProductDto, userId);
    }

    @HasRoles(Role.User, Role.Manager, Role.Admin)
    @UseGuards(RoleGuard)
    @Get()
    async findAll(): Promise<Product[]> {
        return await this.productsService.findAll();
    }

    @HasRoles(Role.User, Role.Manager, Role.Admin)
    @UseGuards(RoleGuard)
    @Post('/search?')
    async findSome(
        @Query() pageOptionsDto: PageOptionsDto,
        @Body() filters: CreateProductDto
    ): Promise<PageDto<Product>> {
        return await this.productsService.findSome(pageOptionsDto, filters);
    }

    @HasRoles(Role.User, Role.Manager, Role.Admin)
    @UseGuards(RoleGuard)
    @Get('/min-max')
    async getPrices(): Promise<getPricesResponse> {
        return await this.productsService.getPrices();
    }

    @HasRoles(Role.User, Role.Manager, Role.Admin)
    @UseGuards(RoleGuard)
    @Get('/:id')
    findOne(@Param('id') id: string): Promise<Product | null> {
        return this.productsService.findOne({ where: { id } });
    }

    @HasRoles(Role.Manager, Role.Admin)
    @UseGuards(RoleGuard)
    @Patch('/:id')
    async updateById(
        @Param('id') id: string,
        @Req() { user }: RequestWithUser,
        @Body() updateProductDto: UpdateProductDto
    ): Promise<Product> {
        const userId = user['userId'];
        return await this.productsService.updateOne(id, updateProductDto, userId);
    }

    @HasRoles(Role.Manager, Role.Admin)
    @UseGuards(RoleGuard)
    @UseInterceptors(FilesInterceptor('images'))
    @Patch('/pictures/upload/:id')
    async uploadPictures(
        @UploadedFiles()
        files: MulterFile[],
        @Param('id') id: string,
        @Request() { user }: RequestWithUser
    ): Promise<Product> {
        const userId = user['userId'];
        const uploadedPictures = await this.filesService.uploadFiles(files, userId);

        return this.productsService.updateOne(
            id,
            {
                pictures_id: uploadedPictures.map((p) => p.id),
                pictures: uploadedPictures
            },
            userId
        );
    }

    // @HasRoles(Role.Admin)
    // @UseGuards(RoleGuard)
    // @Delete('/:id')
    // async removeOne(@Param('id') id: string): Promise<Product> {
    //     return await this.productsService.removeOne(id);
    // }
}
