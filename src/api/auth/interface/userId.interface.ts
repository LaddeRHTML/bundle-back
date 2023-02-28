import { Role } from 'api/users/enum';

export interface UserPayload {
    userId: string;
    role: Role;
}
