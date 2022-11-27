import { Model } from 'mongoose';
import { Pagination } from 'src/common/interfaces/utils.interface';
import { CreateAssemblyDto } from './dto/create-assemblies.dto';
import { UpdateAssemblyDto } from './dto/update-assemblies.dto';
import { AssembliesDocument } from './schema/assemblies.schema';
import { Assembly } from './schema/assemblies.schema';
export declare class AssembliesService {
    private readonly assemblyModel;
    constructor(assemblyModel: Model<AssembliesDocument>);
    create(createAssemblyDto: CreateAssemblyDto): Promise<Assembly>;
    findAll(): Promise<Assembly[]>;
    findSortedItems(page: number, limit: number): Promise<Pagination>;
    findOne(_id: string): Promise<Assembly>;
    update(id: string, updateAssemblyDto: UpdateAssemblyDto): Promise<Assembly>;
    remove(_id: string): Promise<Assembly>;
}
