import { PartialType } from '@nestjs/mapped-types';
import { PowerUnit } from 'model/accessories/PowerUnit/PowerUnit';

export class UpdatePowerUnitDto extends PartialType(PowerUnit) {}
