import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AccessoriesSchema, AssemblySchema } from './product.schema';

@Module({
  imports: [MongooseModule.forFeature([{name: "assembly", schema: AssemblySchema}, {name: "accessories", schema: AccessoriesSchema}])],
  controllers: [ProductsController],
  providers: [ProductsService]
})
export class ProductsModule {}
