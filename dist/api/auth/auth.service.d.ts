import { JwtService } from '@nestjs/jwt';
import { CreateUserDto, CreateUserSettingsDto } from 'api/users/dto/create-user.dto';
import { UsersService } from 'api/users/users.service';
import { ConfigurationService } from 'config/configuration.service';
import { User } from '../users/schema/user.schema';
import { AccessToken } from './interface/auth.interface';
import { UserPayload } from './interface/userId.interface';
export declare class AuthService {
    private readonly userService;
    private readonly jwtService;
    private readonly configService;
    constructor(userService: UsersService, jwtService: JwtService, configService: ConfigurationService);
    validateUser(email: string, password: string): Promise<CreateUserDto>;
    signJwt(payload: UserPayload): string;
    login(req: User): Promise<AccessToken>;
    register(registrationData: CreateUserDto, userSettings: CreateUserSettingsDto): Promise<CreateUserDto>;
}
