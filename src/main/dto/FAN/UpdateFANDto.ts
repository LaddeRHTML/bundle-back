import { PartialType } from '@nestjs/mapped-types';
import { FAN } from 'model/accessories/FAN/FAN';

export class UpdateFANDto extends PartialType(FAN) {}
