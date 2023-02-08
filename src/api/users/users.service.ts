import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Payload } from 'api/auth/strategies/jwt-auth.strategy';
import { Role } from 'api/users/enum/roles.enum';
import { UserPasswords } from 'api/users/interface/passwords.interface';
import * as bcrypt from 'bcryptjs';
import { ConfigurationService } from 'config/configuration.service';
import { Request } from 'express';
import { Pagination } from 'interfaces/utils.interface';
import {
    FilterQuery,
    Model,
    QueryOptions,
    UpdateQuery,
    UpdateWithAggregationPipeline
} from 'mongoose';
import { hashRounds } from 'src/common/constants/bcrypt';
import { calcRelToCurrentDate } from 'src/common/utils/index';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './schema/user.schema';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
        private readonly configService: ConfigurationService
    ) {}

    async createOne(createUserDto: CreateUserDto, role: Role): Promise<User> {
        try {
            createUserDto.age = calcRelToCurrentDate(createUserDto.birthday, true);
            createUserDto.role = role;

            return await this.userModel.create(createUserDto);
        } catch {
            throw new HttpException('BadRequestException', HttpStatus.BAD_REQUEST);
        }
    }

    async findAll(): Promise<User[]> {
        return await this.userModel
            .find({})
            .select('-password')
            .populate(this.configService.orderRef);
    }

    async findByQuery(parameter: string, page: number, limit: number): Promise<Pagination<User[]>> {
        let options = {};

        if (parameter) {
            options = {
                $or: [
                    {
                        address: new RegExp(parameter, 'i')
                    },
                    {
                        name: new RegExp(parameter, 'i')
                    },
                    {
                        familyName: new RegExp(parameter, 'i')
                    },
                    {
                        patronymic: new RegExp(parameter, 'i')
                    },
                    {
                        iin: new RegExp(parameter, 'i')
                    },
                    {
                        phone: new RegExp(parameter, 'i')
                    },
                    {
                        email: new RegExp(parameter, 'i')
                    }
                ]
            };
        }

        const total = await this.userModel.count(options).exec();
        const lastPage = Math.ceil(total / limit);
        const data = await this.userModel
            .find(options)
            .select('-password')
            .populate(this.configService.orderRef)
            .skip((page - 1) * limit)
            .limit(limit)
            .exec();

        return {
            data,
            total,
            page,
            lastPage
        };
    }

    async findOne(parameter: User): Promise<User> {
        return await this.userModel
            .findOne(parameter)
            .select('-password')
            .populate(this.configService.orderRef);
    }

    async findOneByEmail(email: Pick<User, 'email'>): Promise<User> {
        return await this.userModel.findOne({ email }).populate(this.configService.orderRef);
    }

    async findOneById(id: string): Promise<User> {
        return await this.userModel.findOne({ _id: id }).populate(this.configService.orderRef);
    }

    async updateOne(id: string, updateUserDto: UpdateUserDto): Promise<User> {
        if (updateUserDto?.birthday) {
            updateUserDto.age = calcRelToCurrentDate(updateUserDto?.birthday, true);
        }

        updateUserDto.updateDate = new Date();

        return await this.userModel
            .findOneAndUpdate({ _id: id }, { ...updateUserDto }, { new: true })
            .populate(this.configService.orderRef);
    }

    async updatePassword(payload: Payload, passwords: UserPasswords): Promise<boolean> {
        const { oldPassword, newPassword } = passwords;
        try {
            const samePass = 'Passwords are the same!';

            if (oldPassword === newPassword) {
                throw new HttpException(samePass, HttpStatus.CONFLICT);
            }

            const userId = payload.userId;
            const user = await this.findOneById(userId);

            if (!user) {
                throw new HttpException("User wasn't found!", HttpStatus.CONFLICT);
            }

            const compareResult = await bcrypt.compare(oldPassword, user.password);

            if (!compareResult) {
                throw new HttpException(samePass, HttpStatus.CONFLICT);
            }

            const newPasswordHash = await bcrypt.hash(newPassword, hashRounds);

            const updatedUser = await this.updateOne(userId, {
                password: newPasswordHash
            });

            if (!updatedUser) {
                throw new HttpException("Password wasn't updated!", HttpStatus.CONFLICT);
            }

            return true;
        } catch (error) {
            console.log(error);
            throw new HttpException('Conflict!', HttpStatus.CONFLICT);
        }
    }

    async updateMany(
        filter?: FilterQuery<UserDocument>,
        parameter?: UpdateWithAggregationPipeline | UpdateQuery<UserDocument>,
        settings?: QueryOptions
    ) {
        return await this.userModel
            .updateMany(
                filter,
                { ...parameter, updateDate: new Date() },
                {
                    ...settings,
                    new: true
                }
            )
            .populate(this.configService.orderRef);
    }

    async removeOneById(id: string) {
        return await this.userModel.deleteOne({ _id: id });
    }
}
