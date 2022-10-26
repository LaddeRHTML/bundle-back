import { CanActivate, ExecutionContext, Type, mixin } from '@nestjs/common';
import { Role } from 'api/users/enum/roles.enum';

import { JwtAuthGuard } from './jwt-auth.guard';

const RoleGuard = (role: Role): Type<CanActivate> => {
    class RoleGuardMixin extends JwtAuthGuard {
        async canActivate(context: ExecutionContext) {
            await super.canActivate(context);
            const { user } = context.switchToHttp().getRequest();

            return user?.role.includes(role);
        }
    }

    return mixin(RoleGuardMixin);
};

export default RoleGuard;
