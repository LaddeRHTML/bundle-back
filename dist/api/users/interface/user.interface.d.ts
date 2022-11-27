import { CreateUserDto, CreateUserSettingsDto } from 'api/users/dto/create-user.dto';
export interface UserData {
    user: CreateUserDto;
    userSettings: CreateUserSettingsDto;
}
