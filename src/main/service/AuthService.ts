import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InsertResult } from 'typeorm';
import * as bcrypt from 'bcryptjs';

import getErrorMessage from 'common/utils/errors/getErrorMessage';

import { User } from 'model/user/User';
import { Role } from 'model/user/UserEnums';

import { ConfigurationService } from 'config/configuration.service';

import { CreateUserDto } from 'dto/User/CreateUserDto';

import { PASSWORD_HASH_ROUNDS } from 'common/constants';

import { UsersService } from './UserService';

export interface AccessToken {
    access_token: string;
}

export interface UserPayload {
    id: string;
    role: Role;
    iat?: number;
    exp?: number;
}

export interface RequestWithUser extends Request {
    user: UserPayload;
}

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UsersService,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigurationService
    ) {}

    async validateUser(phoneNumber: string, password: string): Promise<Partial<User>> {
        try {
            const user = await this.userService.findOne({
                where: { phoneNumber },
                select: ['id', 'role', 'password']
            });

            if (!user) {
                throw new NotFoundException('User not found!');
            }
            const compareResult = await bcrypt.compare(password, user.password);

            if (compareResult) {
                return { id: user.id, role: user.role };
            } else {
                throw new HttpException('Unauthorized!', HttpStatus.UNAUTHORIZED);
            }
        } catch (error) {
            throw new Error(`auth.service | validateUser error: ${getErrorMessage(error)}`);
        }
    }

    signJwt(payload: UserPayload) {
        return this.jwtService.sign(payload, {
            expiresIn: this.configService.jwtExpiresIn
        });
    }

    async login({ id, role }: UserPayload): Promise<AccessToken> {
        try {
            const access_token = this.signJwt({ id, role });
            return { access_token };
        } catch (error) {
            throw error;
        }
    }

    async register(userDto: CreateUserDto, role: Role): Promise<InsertResult> {
        const isExists = await this.userService.isUserExists({
            phoneNumber: userDto.phoneNumber
        });

        if (isExists) {
            throw new HttpException('User already exists', HttpStatus.CONFLICT);
        }

        try {
            const hashedPassword = await bcrypt.hash(userDto.password, PASSWORD_HASH_ROUNDS);
            const user = await this.userService.createOne(
                {
                    ...userDto,
                    password: hashedPassword
                },
                role
            );

            return user;
        } catch (error) {
            throw new Error(`auth.service | register error: ${getErrorMessage(error)}`);
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
