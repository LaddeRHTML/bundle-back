import { PartialType } from '@nestjs/mapped-types';
import { CPU } from 'model/accessories/CPU/CPU';

export class UpdateCPUDto extends PartialType(CPU) {}
