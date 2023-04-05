import { PartialType } from '@nestjs/mapped-types';
import { Motherboard } from 'model/accessories/Motherboard/Motherboard';

export class UpdateMotherboardDto extends PartialType(Motherboard) {}
