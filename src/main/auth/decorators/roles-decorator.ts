import { SetMetadata } from '@nestjs/common';

import { Role } from 'model/user/UserEnums';

import { ROLE_KEY } from '../constants';

export const HasRoles = (...roles: Role[]) => SetMetadata(ROLE_KEY, roles);
