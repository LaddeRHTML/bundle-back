import { UserDto, UserSettingsDto } from 'src/users/dto/create-user.dto';

export interface UserData {
    user: UserDto;
    userSettings: UserSettingsDto;
}
