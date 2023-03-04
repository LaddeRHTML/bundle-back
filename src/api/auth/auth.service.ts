import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InsertResult } from 'typeorm';
import * as bcrypt from 'bcryptjs';

import { CreateUserDto } from 'api/users/dto/create-user.dto';
import { User } from 'api/users/entity/user.entity';
import { Role } from 'api/users/enum';
import { UsersService } from 'api/users/users.service';
import { ConfigurationService } from 'common/config/configuration.service';
import { hashRounds } from 'common/constants/bcrypt';
import getErrorMessage from 'common/utils/errors/getErrorMessage';

import { AccessToken, UserPayload } from './interface/auth.interface';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UsersService,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigurationService
    ) {}

    async validateUser(email: string, password: string): Promise<Partial<User>> {
        try {
            const user = await this.userService.findOne({
                where: { email },
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

    async login(user: User): Promise<AccessToken> {
        try {
            const userId = user.id;
            const role = user.role;
            const access_token = this.signJwt({ userId, role });
            return { access_token };
        } catch (error) {
            throw error;
        }
    }

    async register(createUserDto: CreateUserDto, role: Role): Promise<InsertResult> {
        const user = await this.userService.findOne({ where: { email: createUserDto.email } });
        if (user) {
            throw new HttpException('User already exists', HttpStatus.CONFLICT);
        }

        try {
            const hashedPassword = await bcrypt.hash(createUserDto.password, hashRounds);
            const user = await this.userService.createOne(
                {
                    ...createUserDto,
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
