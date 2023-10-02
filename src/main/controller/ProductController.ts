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
    UseInterceptors,
    ParseFilePipe,
    FileTypeValidator,
    MaxFileSizeValidator,
    UploadedFile,
    HttpException,
    HttpStatus
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { HasRoles } from 'auth/decorators/roles-decorator';
import RoleGuard from 'auth/guards/role-auth.guard';
import { SuccessfullyUpdatedEntityResponse } from 'common/interfaces';

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
    'cpu',
    'gpu',
    'motherboard',
    'ram',
    'hdd',
    'cooler',
    'powerUnit',
    'pccase'
];

@ApiTags('Products')
@Controller('/products')
@ApiBearerAuth('JWT-auth')
export class ProductsController {
    constructor(
        private readonly productsService: ProductsService,
        private readonly filesService: FilesService
    ) {}

    @ApiOperation({ description: 'Создание продукта' })
    @HasRoles(Role.Manager, Role.Admin)
    @UseGuards(RoleGuard)
    @Post('/create')
    async createOne(
        @Body() createProductDto: CreateProductDto,
        @Req() { user: { id } }: RequestWithUser
    ): Promise<Product> {
        return await this.productsService.createOne(createProductDto, id);
    }

    @ApiOperation({ description: 'Получение всех продуктов' })
    @HasRoles(Role.User, Role.Manager, Role.Admin)
    @UseGuards(RoleGuard)
    @Get()
    async findAll(): Promise<Product[]> {
        return await this.productsService.findAll();
    }

    @ApiOperation({ description: 'Поиск определенного продукта' })
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
    @ApiOperation({ description: 'Получение одного продукта по id' })
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
        return this.productsService.findOneById(id, relations);
    }

    @ApiOperation({ description: 'Обновление продукта по id' })
    @HasRoles(Role.Manager, Role.Admin)
    @UseGuards(RoleGuard)
    @Patch('/:id')
    async updateById(
        @Param('id') id: string,
        @Req() { user: { id: userId } }: RequestWithUser,
        @Body() updateProductDto: UpdateProductDto
    ): Promise<SuccessfullyUpdatedEntityResponse<Product>> {
        return await this.productsService.updateOne(id, updateProductDto, userId);
    }

    @ApiOperation({ description: 'Загрузить продукты из файла' })
    @HasRoles(Role.Admin, Role.Manager)
    @UseGuards(RoleGuard)
    @UseInterceptors(FileInterceptor('excel-dealer-file'))
    @Post('/excel')
    async createMultipleItems(
        @Req() { user: { id: userId } }: RequestWithUser,
        @UploadedFile() file: MulterFile
    ) {
        if (file.originalname !== 'WW_dealers.xlsx') {
            throw new HttpException('Bad file provided', HttpStatus.CONFLICT);
        }
        const products = await this.productsService.getDataFromExcel(file);
        return await this.productsService.manipulateMultipleItems(products, userId);
    }

    @ApiOperation({ description: 'Загрузка изображений продукту по id' })
    @HasRoles(Role.Manager, Role.Admin)
    @UseGuards(RoleGuard)
    @UseInterceptors(FilesInterceptor('images'))
    @Post('/pictures/upload/:id')
    async uploadPictures(
        @Param('id') id: string,
        @UploadedFiles(
            new ParseFilePipe({
                validators: [
                    new FileTypeValidator({ fileType: '.(png|jpeg|jpg)' }),
                    new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 4 })
                ]
            })
        )
        files: MulterFile[],
        @Req() { user: { id: userId } }: RequestWithUser
    ): Promise<SuccessfullyUpdatedEntityResponse<Product>> {
        const product = await this.productsService.findOne({ where: { id } });
        const uploadedPictures = await this.filesService.uploadFiles(files, userId);

        return this.productsService.updateOne(
            id,
            {
                picturesId: [...(product?.picturesId ?? []), ...uploadedPictures.map((p) => p.id)]
            },
            userId
        );
    }

    @ApiOperation({ description: 'Удаление изображений продукту по id' })
    @HasRoles(Role.Manager, Role.Admin)
    @UseGuards(RoleGuard)
    @Post('/pictures/remove/:id')
    async removePictures(
        @Query(
            'pictures',
            new DefaultValuePipe([]),
            new ParseArrayPipe({
                items: String,
                separator: ',',
                optional: true
            })
        )
        pictures: string[],
        @Param('id') id: string,
        @Req() { user: { id: userId } }: RequestWithUser
    ): Promise<SuccessfullyUpdatedEntityResponse<Product>> {
        const product = await this.productsService.findOne({ where: { id } });
        await this.filesService.deleteFiles(pictures);

        const previewPictureId =
            product.previewPictureId && pictures.includes(product.previewPictureId)
                ? null
                : product.previewPictureId;

        return this.productsService.updateOne(
            id,
            {
                picturesId: product?.picturesId.filter((p) => !pictures.includes(p)),
                previewPictureId
            },
            userId
        );
    }

    @ApiOperation({ description: 'Удаление продукта по id' })
    @HasRoles(Role.Admin)
    @UseGuards(RoleGuard)
    @Delete('/:id')
    async removeOneById(@Param('id') id: string): Promise<Product> {
        return await this.productsService.removeOneById(id);
    }
}
