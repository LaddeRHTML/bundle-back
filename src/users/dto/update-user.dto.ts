import { PartialType } from '@nestjs/mapped-types';
import { UserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(UserDto) {}
export class UpdateUserSettingsDto extends PartialType(UserDto) {}