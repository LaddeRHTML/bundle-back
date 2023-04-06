import { PartialType } from '@nestjs/mapped-types';
import { PCCase } from 'model/accessories/PCCase/PCCase';

export class UpdatePCCaseDto extends PartialType(PCCase) {}
