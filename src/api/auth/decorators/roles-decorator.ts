import { SetMetadata } from '@nestjs/common';
import { Role } from 'api/users/enum';

import { ROLE_KEY } from '../constants/roles-const';

export const HasRoles = (...roles: Role[]) => SetMetadata(ROLE_KEY, roles);
