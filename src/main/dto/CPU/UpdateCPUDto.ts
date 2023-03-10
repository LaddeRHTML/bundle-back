import { CPU } from 'model/accessories/CPU/CPU';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateCPUDto extends PartialType(CPU) {}
