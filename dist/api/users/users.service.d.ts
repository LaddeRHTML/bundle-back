import { UserPasswords } from 'api/users/interface/passwords.interface';
import { UserData } from 'api/users/interface/user.interface';
import { Model } from 'mongoose';
import { CreateUserDto, CreateUserSettingsDto } from './dto/create-user.dto';
import { UpdateUserDto, UpdateUserSettingsDto } from './dto/update-user.dto';
import { User, UserDocument, UserSettings, UserSettingsDocument } from './schema/user.schema';
export declare class UsersService {
    private readonly userModel;
    private readonly userSettingsModel;
    constructor(userModel: Model<UserDocument>, userSettingsModel: Model<UserSettingsDocument>);
    create(createUserDto: CreateUserDto, createUserSettingsDto: CreateUserSettingsDto): Promise<UserData>;
    findAllUsers(): Promise<User[]>;
    findAllUsersWithSettings(): Promise<UserSettings[]>;
    findOne(parameter: any): Promise<User>;
    findOneByEmail(email: string): Promise<User>;
    findOneUserById(id: string): Promise<User>;
    updateUser(id: string, updateUserDto: UpdateUserDto): Promise<User>;
    findOneUserSettings(userId: string): Promise<UserSettings>;
    updateUserSettings(userId: string, updateUserSettingsDto: UpdateUserSettingsDto): Promise<UserSettings>;
    updateUserData(userId: string, updateUserSettingsDto: UpdateUserSettingsDto, updateUserDto: UpdateUserDto): Promise<UserData>;
    updateUserPassword(req: any, passwords: UserPasswords): Promise<boolean>;
    removeUser(id: string): Promise<void>;
}
