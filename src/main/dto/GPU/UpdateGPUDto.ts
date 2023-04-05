import { PartialType } from '@nestjs/mapped-types';
import { GPU } from 'model/accessories/GPU/GPU';

export class UpdateGPUDto extends PartialType(GPU) {}
