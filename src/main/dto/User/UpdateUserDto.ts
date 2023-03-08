import { PartialType } from '@nestjs/mapped-types';
import { User } from 'model/user/User';

export class UpdateUserDto extends PartialType(User) {}
