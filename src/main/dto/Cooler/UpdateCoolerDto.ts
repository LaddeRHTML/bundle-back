import { Cooler } from 'model/accessories/Cooler/Cooler';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateCoolerDto extends PartialType(Cooler) {}
