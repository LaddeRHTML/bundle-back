import { ClientsService } from 'api/clients/clients.service';
import { ClientDocument } from 'api/clients/schema/clients.schema';
import { MulterFile } from 'api/files/interface/multer.interface';
import { OrderDocument } from 'api/orders/schema/orders.schema';
import { FilterQuery, Model, ProjectionType, QueryOptions, UpdateQuery, UpdateWithAggregationPipeline } from 'mongoose';
import { Pagination } from 'src/common/interfaces/utils.interface';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FilterProductsResponse, ProductsFilter } from './interfaces/products.filter.interface';
import { Product, ProductsDocument } from './schema/products.schema';
export declare class ProductsService {
    private readonly productModel;
    private readonly orderModel;
    private readonly clientModel;
    private readonly clientsService;
    constructor(productModel: Model<ProductsDocument>, orderModel: Model<OrderDocument>, clientModel: Model<ClientDocument>, clientsService: ClientsService);
    create(createProductDto: CreateProductDto): Promise<Product>;
    findAllBy(filter?: FilterQuery<ProductsDocument>, projection?: ProjectionType<ProductsDocument>): Promise<Product[]>;
    findAllByWithOutPopulating(filter?: FilterQuery<ProductsDocument>, projection?: ProjectionType<ProductsDocument>): Promise<Product[]>;
    findAllByNames(names: string[]): Promise<Product[]>;
    findByQuery(parameter: string, page: number, limit: number, onlyOrdered: boolean, category: string, filters: Partial<ProductsFilter>): Promise<Pagination>;
    getMinMaxValues(): Promise<FilterProductsResponse>;
    findOneById(_id: string): Promise<Product>;
    updateById(id: string, updateProductDto: UpdateProductDto): Promise<Product>;
    updateMany(filter: FilterQuery<ProductsDocument>, parameter: UpdateWithAggregationPipeline | UpdateQuery<ProductsDocument>, settings?: QueryOptions): Promise<import("mongodb").UpdateResult>;
    remove(id: string): Promise<Product>;
    getDataFromExcel(file: MulterFile): CreateProductDto[];
    manipulateMultipleItems(products: CreateProductDto[]): Promise<void>;
}
