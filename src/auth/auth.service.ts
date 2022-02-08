import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { UserDto, UserSettingsDto } from "src/users/dto/create-user.dto";
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcryptjs'


@Injectable()
export class AuthService {
    constructor(
        private userService: UsersService,
        private jwtService: JwtService,
        private configService: ConfigService
    ) { }

    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.userService.findOneUserByEmail(email);

        if (user) {

            const compareResult = await bcrypt.compare(password, user.password);

            if (compareResult) {
                user.password = undefined;
    
                return user;
            } else {
                throw new HttpException('Unauthorized!', HttpStatus.UNAUTHORIZED);
            }
        }
        return null;
    }


    async login(user: any) {
        const payload = { id: user._id };


        return { access_token: this.jwtService.sign({ payload }) };
    }

    async register(registrationData: UserDto, userSettings: UserSettingsDto): Promise<UserDto> {
        const hashedPassword = await bcrypt.hash(registrationData.password, 9);
        const userExists = await this.userService.findOneUserByEmail(registrationData.email);
        if (userExists) {
            throw new HttpException('User already exists', HttpStatus.CONFLICT);
        } else  {
            try {
                const createdUser = await this.userService.create({
                    ...registrationData,
                    password: hashedPassword
                }, userSettings);
                createdUser.password = undefined;
                return createdUser;
            } catch (error) {
                throw new HttpException('Server error!', HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
    }

    /* public getCookieWithJwtRefreshToken(user: any) {
        const payload = { id: user._id };
        const token = this.jwtService.sign(payload, {
            secret: this.configService.get('^hs027SJKIQWNJQWE29SJK2JFqweNN238sujiW'),
            expiresIn: `${this.configService.get('18000')}s`
        });
        const cookie = `Refresh=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get('18000')}`;
        return {
            cookie,
            token
        }
    } */
}
