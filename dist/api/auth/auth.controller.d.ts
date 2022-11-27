import { AuthService } from 'api/auth/auth.service';
import { CreateUserDto, CreateUserSettingsDto } from 'api/users/dto/create-user.dto';
import { UserData } from 'api/users/interface/user.interface';
import { UsersService } from 'api/users/users.service';
import { Request } from 'express';
import { AccessToken } from './interface/auth.interface';
export declare class AuthController {
    private authService;
    private usersService;
    constructor(authService: AuthService, usersService: UsersService);
    login(req: Request): Promise<AccessToken>;
    check(req: Request): Promise<UserData>;
    register(req: Request, userSettings: CreateUserSettingsDto): Promise<CreateUserDto>;
}
