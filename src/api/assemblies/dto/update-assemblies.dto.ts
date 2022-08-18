import { PartialType } from '@nestjs/swagger';
import { CreateAssemblyDto } from './create-assemblies.dto';

export class UpdateAssemblyDto extends PartialType(CreateAssemblyDto) {}
