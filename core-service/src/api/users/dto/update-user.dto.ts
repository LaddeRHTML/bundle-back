import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto, CreateUserSettingsDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {}
export class UpdateUserSettingsDto extends PartialType(CreateUserSettingsDto) {}
