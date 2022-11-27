import { Model } from 'mongoose';
import { Pagination } from 'src/common/interfaces/utils.interface';
import { CreateAccessoryDto } from './dto/create-accessories.dto';
import { UpdateAccessoryDto } from './dto/update-accessories.dto';
import { AccessoriesDocument } from './schema/accessories.schema';
import { Accessory } from './schema/accessories.schema';
export declare class AccessoriesService {
    private accessoryModel;
    constructor(accessoryModel: Model<AccessoriesDocument>);
    create(createAccessoryDto: CreateAccessoryDto): Promise<Accessory>;
    findAll(): Promise<Accessory[]>;
    findSortedItems(page: number, limit: number): Promise<Pagination>;
    findOne(_id: string): Promise<Accessory>;
    update(id: string, updateAccessoryDto: UpdateAccessoryDto): Promise<Accessory>;
    remove(_id: string): Promise<Accessory>;
}
