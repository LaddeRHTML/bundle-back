import { Pagination } from 'src/common/interfaces/utils.interface';
import { AssembliesService } from './assemblies.service';
import { CreateAssemblyDto } from './dto/create-assemblies.dto';
import { UpdateAssemblyDto } from './dto/update-assemblies.dto';
import { Assembly } from './schema/assemblies.schema';
export declare class AssembliesController {
    private readonly assembliesService;
    constructor(assembliesService: AssembliesService);
    create(createAssemblyDto: CreateAssemblyDto): Promise<Assembly>;
    findAll(): Promise<Assembly[]>;
    findSortedItems(page: number, limit: number): Promise<Pagination>;
    findOne(id: string): Promise<Assembly>;
    update(id: string, updateAssemblyDto: UpdateAssemblyDto): Promise<Assembly>;
    remove(id: string): Promise<Assembly>;
}
