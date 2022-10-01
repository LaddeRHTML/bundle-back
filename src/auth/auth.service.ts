import { HttpException, HttpStatus, Injectable, Req, Res } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto, CreateUserSettingsDto } from 'api/users/dto/create-user.dto';
import { UsersService } from 'api/users/users.service';
import * as bcrypt from 'bcryptjs';
import { AccessToken } from 'src/types/auth.types';

import { User } from './../api/users/user.schema';

@Injectable()
export class AuthService {
    constructor(private userService: UsersService, private jwtService: JwtService) {}

    async validateUser(email: string, password: string): Promise<CreateUserDto> {
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

    signJwt(payload: any) {
        return this.jwtService.sign(payload);
    }

    async login(req: User): Promise<AccessToken> {
        try {
            const userId = await req['_id'].toString();
            return { access_token: this.signJwt({ userId }) };
        } catch (error) {
            throw error;
        }
    }

    async register(
        registrationData: CreateUserDto,
        userSettings: CreateUserSettingsDto
    ): Promise<CreateUserDto> {
        const rounds = 1;
        const hashedPassword = await bcrypt.hash(registrationData.password, rounds);
        const userExists = await this.userService.findOneUserByEmail(registrationData.email);
        if (userExists) {
            throw new HttpException('User already exists', HttpStatus.CONFLICT);
        } else {
            try {
                const createdUser = await this.userService.create(
                    {
                        ...registrationData,
                        password: hashedPassword
                    },
                    userSettings
                );
                createdUser.password = undefined;
                return createdUser;
            } catch (error) {
                throw new HttpException('Server error!', HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
    }

    /* public async getRefreshToken(userId: string): Promise<string> {
        const userDataToUpdate = {
            refreshToken: randomToken.generate(16),
            refreshTokenExp: moment().add(1, 'd').format('YYYY/MM/DD H:m:s')
        };

        await this.userService.updateUser(userId, userDataToUpdate);
        return userDataToUpdate.refreshToken;
    }

    public async validRefreshToken(userId: string, refreshToken: string): Promise<CreateUserDto> {
        const currentDate = moment();
        let user = await this.userService.findOneUserById(userId);

        const isTokensEqual = user.refreshToken === refreshToken;
        const isTokenExp = moment(user.refreshTokenExp) < currentDate;

        if (isTokensEqual && isTokenExp) {
            return null;
        }

        return user;
    } */
}
