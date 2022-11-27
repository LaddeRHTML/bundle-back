import { ConfigurationService } from 'config/configuration.service';
import mongoose, { FilterQuery, Model, UpdateQuery, UpdateWithAggregationPipeline } from 'mongoose';
import { Pagination } from 'src/common/interfaces/utils.interface';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { UpdateSettings } from './interface/client.update.gui.interface';
import { Client, ClientDocument } from './schema/clients.schema';
export declare class ClientsService {
    private readonly clientModel;
    private readonly configService;
    constructor(clientModel: Model<ClientDocument>, configService: ConfigurationService);
    create(createClientDto: CreateClientDto): Promise<Client>;
    findByQuery(parameter: string, page: number, limit: number): Promise<Pagination>;
    findAll(): Promise<Client[]>;
    findOne(_id: string): Promise<Client>;
    update(id: string, updateClientDto: UpdateClientDto, settings?: UpdateSettings): Promise<Client>;
    updateMany(filter?: FilterQuery<ClientDocument>, parameter?: UpdateWithAggregationPipeline | UpdateQuery<ClientDocument>, settings?: UpdateSettings): Promise<import("mongodb").UpdateResult>;
    remove(id: string): Promise<Client & mongoose.Document<any, any, any> & {
        _id: any;
    }>;
}
