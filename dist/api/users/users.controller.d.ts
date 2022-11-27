import { UserPasswords } from 'api/users/interface/passwords.interface';
import { UserData } from 'api/users/interface/user.interface';
import { CreateUserDto, CreateUserSettingsDto } from './dto/create-user.dto';
import { UpdateUserDto, UpdateUserSettingsDto } from './dto/update-user.dto';
import { User, UserSettings } from './schema/user.schema';
import { UsersService } from './users.service';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(createUserDto: CreateUserDto, createUserSettingsDto: CreateUserSettingsDto): Promise<any>;
    findAll(): Promise<User[]>;
    findAllWithSettings(): Promise<UserSettings[]>;
    findOne(_id: string): Promise<User>;
    findOneByEmail(email: string): Promise<User>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<User>;
    findOneUserSettings(userId: string): Promise<UserSettings>;
    updateUserSettings(userId: string, updateUserSettingsDto: UpdateUserSettingsDto): Promise<UserSettings>;
    updateUserData(userId: string, updateUserSettingsDto: UpdateUserSettingsDto, updateUserDto: UpdateUserDto): Promise<UserData>;
    updateUserPassword(req: any, passwords: UserPasswords): Promise<boolean>;
    remove(id: string): Promise<void>;
}
