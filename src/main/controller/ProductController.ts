import {
    Body,
    Controller,
    DefaultValuePipe,
    Get,
    Param,
    ParseArrayPipe,
    Patch,
    Post,
    Query,
    Req,
    Delete,
    UploadedFiles,
    UseGuards,
    UseInterceptors
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { InsertResult } from 'typeorm';
import { ApiTags } from '@nestjs/swagger';

import { HasRoles } from 'auth/decorators/roles-decorator';
import RoleGuard from 'auth/guards/role-auth.guard';

import { PageOptionsDto } from 'common/pagination/dtos/page-options.dto';
import { PageDto } from 'common/pagination/dtos/page.dto';

import { CreateProductDto } from 'dto/Product/CreateProductDto';
import { UpdateProductDto } from 'dto/Product/UpdateProductDto';

import { Product } from 'model/product/Product';
import { Role } from 'model/user/UserEnums';

import { RequestWithUser } from 'service/AuthService';
import { FilesService, MulterFile } from 'service/FileService';
import { GetPricesResponse, ProductsService } from 'service/ProductService';


export type AllowedProductRelations = [
    'orders',
    'CPU',
    'GPU',
    'motherboard',
    'RAM',
    'HDD',
    'cooler',
    'power_unit',
    'PCCase'
];


@ApiTags('Products')
@Controller('/products')
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
        @Req() { user: { id } }: RequestWithUser
    ): Promise<InsertResult> {
        return await this.productsService.createOne(createProductDto, id);
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
        @Body() filters: CreateProductDto,

        @Query(
            'relations',
            new DefaultValuePipe([]),
            new ParseArrayPipe({
                items: String,
                separator: ',',
                optional: true
            })
        )
        relations: AllowedProductRelations
    ): Promise<PageDto<Product>> {
        return await this.productsService.findSome(pageOptionsDto, filters, relations);
    }

    @HasRoles(Role.User, Role.Manager, Role.Admin)
    @UseGuards(RoleGuard)
    @Get('/min-max')
    async getPrices(): Promise<GetPricesResponse> {
        return await this.productsService.getPrices();
    }

    @HasRoles(Role.User, Role.Manager, Role.Admin)
    @UseGuards(RoleGuard)
    @Get('/:id')
    findOne(
        @Param('id') id: string,
        @Query(
            'relations',
            new DefaultValuePipe([]),
            new ParseArrayPipe({
                items: String,
                separator: ',',
                optional: true
            })
        )
        relations: AllowedProductRelations
    ): Promise<Product | null> {
        return this.productsService.findOne({ where: { id }, relations });
    }

    @HasRoles(Role.Manager, Role.Admin)
    @UseGuards(RoleGuard)
    @Patch('/:id')
    async updateById(
        @Param('id') id: string,
        @Req() { user: { id: userId } }: RequestWithUser,
        @Body() updateProductDto: UpdateProductDto
    ): Promise<Product> {
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
        @Req() { user: { id: userId } }: RequestWithUser
    ): Promise<Product> {
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

    @HasRoles(Role.Admin)
    @UseGuards(RoleGuard)
    @Delete('/:id')
    async removeOneById(@Param('id') id: string): Promise<Product> {
        return await this.productsService.removeOneById(id);
    }
}
