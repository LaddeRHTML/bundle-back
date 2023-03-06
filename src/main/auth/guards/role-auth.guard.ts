import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { Role } from 'model/user/UserEnums';

import { ROLE_KEY } from '../constants';
import { JwtAuthGuard } from './jwt-auth.guard';

const matchRoles = (roles: Role[], userRoles: string): boolean => {
    return roles.some((role) => role === userRoles);
};

@Injectable()
export class RoleGuard extends JwtAuthGuard {
    constructor(private reflector: Reflector) {
        super();
    }

    async canActivate(context: ExecutionContext) {
        await super.canActivate(context);
        const roles = this.reflector.getAllAndOverride<Role[]>(ROLE_KEY, [
            context.getHandler(),
            context.getClass()
        ]);
        if (!roles) {
            return true;
        }
        const { user } = context.switchToHttp().getRequest();
        return matchRoles(roles, user.role);
    }
}

export default RoleGuard;
