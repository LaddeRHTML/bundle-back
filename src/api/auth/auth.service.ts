import { HttpException, HttpStatus, Injectable, Req, Res } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto, CreateUserSettingsDto } from 'api/users/dto/create-user.dto';
import { UsersService } from 'api/users/users.service';
import * as bcrypt from 'bcryptjs';
import { ConfigurationService } from 'config/configuration.service';
import { hashRounds } from 'src/common/constants/bcrypt';

import { User } from '../users/schema/user.schema';
import { jwtConstants } from './constants/jwt-const';
import { AccessToken } from './interface/auth.interface';
import { UserIdPayload } from './interface/userId.interface';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UsersService,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigurationService
    ) {}

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

    signJwt(payload: UserIdPayload) {
        return this.jwtService.sign(payload, {
            expiresIn: this.configService.jwtExpiresIn
        });
    }

    async login(req: User): Promise<AccessToken> {
        try {
            const userId = await req['_id'].toString();
            const access_token = this.signJwt({ userId });
            return { access_token };
        } catch (error) {
            throw error;
        }
    }

    async register(
        registrationData: CreateUserDto,
        userSettings: CreateUserSettingsDto
    ): Promise<CreateUserDto> {
        const hashedPassword = await bcrypt.hash(registrationData.password, hashRounds);
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
