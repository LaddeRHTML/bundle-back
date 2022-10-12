import {
    Body,
    Controller,
    Get,
    Inject,
    Param,
    Patch,
    Post,
    Query,
    Res,
    Response
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { apiPrefix } from 'src/common/api';

interface ApplicationEntity {
    creatorName: string;
    email: string;
    phone: string;
    message: string;
    createDate: Date;
}

@Controller(`${apiPrefix}/applications`)
export class ApplicationsController {
    constructor(@Inject('core-service') private readonly coreServiceClient: ClientProxy) {}

    async onApplicationBootstrap() {
        await this.coreServiceClient.connect();
    }

    @Get()
    async getAll() {
        return this.coreServiceClient.send('core_api_application_get_all', '200');
    }

    @Get('/filter?')
    async findSortedItems(@Query('page') page: number, @Query('limit') limit: number) {
        console.log('core_api_application_filtered ->', page, limit);
        return this.coreServiceClient.send('core_api_application_filtered', { page, limit });
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        console.log('core_api_application_get_one ->', id);
        return this.coreServiceClient.send('core_api_application_get_one', id);
    }

    @Post()
    async create(@Body() applicationEntity: ApplicationEntity) {
        console.log('core_api_application_create ->', applicationEntity);
        return this.coreServiceClient.send('core_api_application_create', applicationEntity);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() applicationEntity: ApplicationEntity) {
        console.log('core_api_application_update ->', id, applicationEntity);
        return this.coreServiceClient.send('core_api_application_update', {
            id,
            applicationEntity
        });
    }
}
