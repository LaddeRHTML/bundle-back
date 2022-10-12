import { AssembliesService } from './assemblies.service';
import { AssembliesController } from './assemblies.controller';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AssemblySchema } from './assemblies.schema';

@Module({
    imports: [MongooseModule.forFeature([{ name: 'assemblies', schema: AssemblySchema }])],
    controllers: [AssembliesController],
    providers: [AssembliesService],
    exports: [AssembliesService]
})
export class AssemblyModule {}
