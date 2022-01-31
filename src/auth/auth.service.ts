import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { UserDto } from "src/users/dto/create-user.dto";
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
    constructor(
        private userService: UsersService,
        private jwtService: JwtService,
        private configService: ConfigService
    ) { }

    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.userService.findOneUserByEmail(email);

        if (user && user.password === password) {

            user.password = undefined;

            return user;
        }
        return null;
    }


    async login(user: any) {
        const payload = { id: user._id };

        console.log(payload);

        return { access_token: this.jwtService.sign({ payload }) };
    }

    public getCookieWithJwtRefreshToken(user: any) {
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
    }
}
