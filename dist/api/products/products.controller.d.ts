import { MulterFile } from 'api/files/interface/multer.interface';
import { Pagination } from 'src/common/interfaces/utils.interface';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FilterProductsResponse, ProductsFilter } from './interfaces/products.filter.interface';
import { ProductsService } from './products.service';
import { Product } from './schema/products.schema';
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    create(createProductDto: CreateProductDto): Promise<Product>;
    findAll(): Promise<Product[]>;
    findSortedItems(parameter: string, onlyOrdered: boolean, page: number, limit: number, category: string, filters: ProductsFilter): Promise<Pagination>;
    getMinMaxValues(): Promise<FilterProductsResponse>;
    createMultipleItems(file: MulterFile): Promise<void>;
    findOne(id: string): Promise<Product>;
    update(id: string, updateProductDto: UpdateProductDto): Promise<Product>;
    remove(id: string): Promise<Product>;
}
