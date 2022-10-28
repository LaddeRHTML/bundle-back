import { Role } from 'api/users/enum/roles.enum';

export interface UserPayload {
    userId: string;
    role: Role;
}
