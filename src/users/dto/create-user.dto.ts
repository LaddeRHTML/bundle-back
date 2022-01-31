
export class UserDto {
    public name: string;
    public email: string;
    public password: string;
}

export class UserSettingsDto {
    public registrationDate: Date;
    public age: number;
    public avatar: string; 
    public gender: number;
    public allowToLogin: boolean;
    public userId: string;
}
