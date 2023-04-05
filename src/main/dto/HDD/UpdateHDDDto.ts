import { HDD } from 'model/accessories/HDD/HDD';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateHDDDto extends PartialType(HDD) {}
