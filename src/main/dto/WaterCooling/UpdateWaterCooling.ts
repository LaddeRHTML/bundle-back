import { PartialType } from '@nestjs/mapped-types';
import { WaterCooling } from 'model/accessories/WaterCooling/WaterCooling';

export class UpdateWaterCoolingDto extends PartialType(WaterCooling) {}
