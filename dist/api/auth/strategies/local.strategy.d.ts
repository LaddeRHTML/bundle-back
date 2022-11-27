import { CreateUserDto } from 'api/users/dto/create-user.dto';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
declare const LocalStrategy_base: new (...args: any[]) => Strategy;
export declare class LocalStrategy extends LocalStrategy_base {
    private authservice;
    constructor(authservice: AuthService);
    validate(email: string, password: string): Promise<CreateUserDto>;
}
export {};
