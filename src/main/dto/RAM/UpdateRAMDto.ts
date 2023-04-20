import { PartialType } from '@nestjs/mapped-types';
import { RAM } from './../../model/accessories/RAM/RAM';

export class UpdateRAMDto extends PartialType(RAM) {}
