import { Request } from 'express';

import { Role } from 'api/users/enum';
export interface UserPayload {
    userId: string;
    role: Role;
}
export interface AccessToken {
    access_token: string;
}

export interface Payload {
    userId: string;
    iat: number;
    exp: number;
}

export interface RequestWithUser extends Request {
    user: Payload;
}
