import {
    Body,
    Controller,
    Delete,
    Get,
    HttpException,
    HttpStatus,
    Param,
    Patch,
    Post,
    Query,
    UploadedFile,
    UseGuards,
    UseInterceptors
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { HasRoles } from 'api/auth/decorators/roles-decorator';
import RoleGuard from 'api/auth/guards/role-auth.guard';
import { MulterFile } from 'api/files/interface/multer.interface';
import { Role } from 'api/users/enum/roles.enum';
import { DeleteResult } from 'interfaces/delete.result';
import { UpdateResult } from 'interfaces/update.ruslt';
import { apiVersion } from 'src/common/constants/api-const';
import { Pagination } from 'src/common/interfaces/utils.interface';

import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import {
    FilterProductsResponse,
    MinMaxProductValues,
    ProductsFilter
} from './interfaces/products.filter.interface';
import { ProductsService } from './products.service';
import { Product } from './schema/products.schema';

const controllerName = `${apiVersion}/products`;

@Controller(controllerName)
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}

    @HasRoles(Role.Manager, Role.Admin)
    @UseGuards(RoleGuard)
    @Post('')
    async createOne(@Body() createProductDto: CreateProductDto): Promise<Product> {
        return await this.productsService.createOne(createProductDto);
    }

    @HasRoles(Role.User, Role.Manager, Role.Admin)
    @UseGuards(RoleGuard)
    @Get()
    async findAll(@Query('param') productDto: Product): Promise<Product[]> {
        return await this.productsService.findAllBy(productDto);
    }

    @HasRoles(Role.User, Role.Manager, Role.Admin)
    @UseGuards(RoleGuard)
    @Post('/search?')
    async findSortedItems(
        @Query('search-by') parameter: string,
        @Query('page')
        page: number,
        @Query('limit') limit: number,
        @Body() filters: CreateProductDto
    ): Promise<Pagination<Product[]>> {
        return await this.productsService.findByFilters(parameter, page, limit, filters);
    }

    @HasRoles(Role.User, Role.Manager, Role.Admin)
    @UseGuards(RoleGuard)
    @Get('/min-max')
    async getMinMaxValues(): Promise<FilterProductsResponse> {
        return await this.productsService.getMinMaxValues();
    }

    @HasRoles(Role.Admin)
    @UseGuards(RoleGuard)
    @UseInterceptors(FileInterceptor('excel-dealer-file'))
    @Post('/excel')
    async createMultipleItems(@UploadedFile() file: MulterFile) {
        if (file.originalname !== 'WW_dealers.xlsx') {
            throw new HttpException('Bad file provided', HttpStatus.CONFLICT);
        }

        const products = this.productsService.getDataFromExcel(file);
        return await this.productsService.manipulateMultipleItems(products);
    }

    @HasRoles(Role.User, Role.Manager, Role.Admin)
    @UseGuards(RoleGuard)
    @Get('/:id')
    findOne(@Param('id') id: string): Promise<Product> {
        return this.productsService.findOneById(id);
    }

    @HasRoles(Role.Manager, Role.Admin)
    @UseGuards(RoleGuard)
    @Patch('/:id')
    async updateById(
        @Param('id') id: string,
        @Body() updateProductDto: UpdateProductDto
    ): Promise<Product> {
        return await this.productsService.updateById(id, updateProductDto);
    }

    @HasRoles(Role.Manager, Role.Admin)
    @UseGuards(RoleGuard)
    @Patch('/hide/many?')
    async updateVisiblityOfImportedProducts(
        @Query('is_hidden', {
            transform(value) {
                return value === 'true';
            }
        })
        is_hidden: boolean
    ): Promise<UpdateResult> {
        return await this.productsService.updateVisiblityOfImportedProducts(is_hidden);
    }

    @HasRoles(Role.Admin)
    @UseGuards(RoleGuard)
    @Delete('/remove/imported')
    async removeImported(): Promise<DeleteResult> {
        return await this.productsService.removeImported();
    }

    @HasRoles(Role.Admin)
    @UseGuards(RoleGuard)
    @Delete('/:id')
    async removeOne(@Param('id') id: string): Promise<Product> {
        return await this.productsService.removeOne(id);
    }
}
