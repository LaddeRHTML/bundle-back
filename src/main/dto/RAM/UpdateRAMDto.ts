import { RAM } from './../../model/accessories/RAM/RAM';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateRAMDto extends PartialType(RAM) {}
