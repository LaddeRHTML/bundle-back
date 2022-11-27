import { Pagination } from 'src/common/interfaces/utils.interface';
import { AccessoriesService } from './accessories.service';
import { CreateAccessoryDto } from './dto/create-accessories.dto';
import { UpdateAccessoryDto } from './dto/update-accessories.dto';
import { Accessory } from './schema/accessories.schema';
export declare class AccessoriesController {
    private readonly accessoriesService;
    constructor(accessoriesService: AccessoriesService);
    create(createAccessoryDto: CreateAccessoryDto): Promise<Accessory>;
    findAll(): Promise<Accessory[]>;
    findSortedItems(page: number, limit: number): Promise<Pagination>;
    findOne(id: string): Promise<Accessory>;
    update(id: string, updateAccessoryDto: UpdateAccessoryDto): Promise<Accessory>;
    remove(id: string): Promise<Accessory>;
}
