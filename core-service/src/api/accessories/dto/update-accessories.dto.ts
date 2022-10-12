import { PartialType } from '@nestjs/swagger';
import { CreateAccessoryDto } from './create-accessories.dto';

export class UpdateAccessoryDto extends PartialType(CreateAccessoryDto) {}
