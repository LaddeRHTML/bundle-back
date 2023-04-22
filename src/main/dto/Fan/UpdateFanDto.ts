import { PartialType } from '@nestjs/mapped-types';
import { Fan } from 'model/accessories/Fan/Fan';

export class UpdateFanDto extends PartialType(Fan) {}
