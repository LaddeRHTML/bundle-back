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
import { JwtAuthGuard } from 'api/auth/guards/jwt-auth.guard';
import RoleGuard from 'api/auth/guards/role-auth.guard';
import { MulterFile } from 'api/files/interface/multer.interface';
import { Role } from 'api/users/enum/roles.enum';
import { apiVersion } from 'src/common/constants/api-const';
import { Pagination } from 'src/common/interfaces/utils.interface';

import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsService } from './products.service';
import { Product } from './schema/products.schema';

const controllerName = `${apiVersion}/products`;

@Controller(controllerName)
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}

    @UseGuards(RoleGuard(Role.Moderator))
    @UseGuards(RoleGuard(Role.Admin))
    @Post('')
    create(@Body() createProductDto: CreateProductDto): Promise<Product> {
        return this.productsService.create(createProductDto);
    }

    @UseGuards(RoleGuard(Role.User))
    @UseGuards(RoleGuard(Role.Moderator))
    @UseGuards(RoleGuard(Role.Admin))
    @Get()
    findAll(): Promise<Product[]> {
        return this.productsService.findAll();
    }

    @UseGuards(RoleGuard(Role.User))
    @UseGuards(RoleGuard(Role.Moderator))
    @UseGuards(RoleGuard(Role.Admin))
    @Get('/search?')
    async findSortedItems(
        @Query('parameter') parameter: string,
        @Query('page') page: number,
        @Query('limit') limit: number
    ): Promise<Pagination> {
        return await this.productsService.findByQuery(parameter, page, limit);
    }

    @UseGuards(RoleGuard(Role.Admin))
    @UseInterceptors(FileInterceptor('excel-dealer-file'))
    @Post('/excel')
    async createMultipleItems(@UploadedFile() file: MulterFile) {
        if (file.originalname !== 'WW_dealers.xlsx') {
            throw new HttpException('Bad file provided', HttpStatus.CONFLICT);
        }
        const products = this.productsService.getDataFromExcel(file);
        return await this.productsService.manipulateMultipleItems(products);
    }

    @UseGuards(RoleGuard(Role.User))
    @UseGuards(RoleGuard(Role.Moderator))
    @UseGuards(RoleGuard(Role.Admin))
    @Get('/:id')
    findOne(@Param('id') id: string): Promise<Product> {
        return this.productsService.findOne(id);
    }

    @UseGuards(RoleGuard(Role.Moderator))
    @UseGuards(RoleGuard(Role.Admin))
    @Patch('/:id')
    update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto): Promise<Product> {
        return this.productsService.update(id, updateProductDto);
    }

    @UseGuards(RoleGuard(Role.Admin))
    @Delete('/:id')
    remove(@Param('id') id: string): Promise<Product> {
        return this.productsService.remove(id);
    }
}
