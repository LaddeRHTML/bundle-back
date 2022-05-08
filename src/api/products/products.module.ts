import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AccessoriesSchema, AssemblySchema } from './product.schema';
import { AccessoriesController } from './accessories/products.accessories.controller';
import { AssemblyController } from './assembly/products.assembly.controller';
import { AccessoriesService } from './accessories/products.accessories.service';
import { AssemblyService } from './assembly/products.assembly.service';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: 'assembly', schema: AssemblySchema },
            { name: 'accessories', schema: AccessoriesSchema }
        ])
    ],
    controllers: [AccessoriesController, AssemblyController],
    providers: [ProductsService, AccessoriesService, AssemblyService]
})
export class ProductsModule {}
