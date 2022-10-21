import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AssembliesController } from './assemblies.controller';
import { AssembliesService } from './assemblies.service';
import { Assembly, AssemblySchema } from './schema/assemblies.schema';

@Module({
    imports: [MongooseModule.forFeature([{ name: Assembly.name, schema: AssemblySchema }])],
    controllers: [AssembliesController],
    providers: [AssembliesService],
    exports: [AssembliesService]
})
export class AssemblyModule {}
