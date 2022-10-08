import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcryptjs';
import { UserData } from 'interfaces/user.interface';
import { Model } from 'mongoose';
import { hashRounds } from 'src/constants/bcrypt';
import { passwords } from 'types/passwords.types';

import { CreateUserDto, CreateUserSettingsDto } from './dto/create-user.dto';
import { UpdateUserDto, UpdateUserSettingsDto } from './dto/update-user.dto';
import { User, UserDocument, UserSettings, UserSettingsDocument } from './user.schema';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel('user') private userModel: Model<UserDocument>,
        @InjectModel('userSettings') private userSettingsModel: Model<UserSettingsDocument>
    ) {}

    create(
        createUserDto: CreateUserDto,
        createUserSettingsDto: CreateUserSettingsDto
    ): Promise<any> {
        try {
            const newUser = new this.userModel(createUserDto);
            const { _id } = newUser;
            const newUserSettings = new this.userSettingsModel({
                ...createUserSettingsDto,
                user: _id
            });

            return newUser.save().then(
                (settings) => {
                    return newUserSettings.save();
                },
                (err) => {
                    throw new HttpException('BadRequestException', HttpStatus.BAD_REQUEST);
                }
            );
        } catch {
            throw new HttpException('BadRequestException', HttpStatus.BAD_REQUEST);
        }
    }

    async findAllUsers(): Promise<User[]> {
        return await this.userModel.find({});
    }

    async findAllUsersWithSettings(): Promise<UserSettings[]> {
        const usersData = await this.userSettingsModel.find({}).populate('user', 'name email');
        usersData.forEach((user) => {
            user.userId = undefined;
        });
        return usersData;
    }

    async findOne(parameter: any): Promise<User> {
        return await this.userModel.findOne(parameter);
    }

    async findOneUserByEmail(email: string): Promise<User> {
        return await this.userModel.findOne({ email });
    }

    async findOneUserById(id: string): Promise<User> {
        const user = await this.userModel.findOne({ _id: id });
        return user;
    }

    async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<User> {
        return await this.userModel.findOneAndUpdate(
            { _id: id },
            { ...updateUserDto },
            { returnNewDocument: true, returnOriginal: false }
        );
    }

    async findOneUserSettings(userId: string): Promise<UserSettings> {
        return await this.userSettingsModel.findOne({ user: userId });
    }

    async updateUserSettings(
        userId: string,
        updateUserSettingsDto: UpdateUserSettingsDto
    ): Promise<UserSettings> {
        const userSettingsToUpdate = await this.userSettingsModel.findOne({ user: userId });
        const { id } = userSettingsToUpdate;
        return await this.userSettingsModel.findOneAndUpdate(
            { _id: id },
            { ...updateUserSettingsDto },
            { returnNewDocument: true, returnOriginal: false }
        );
    }

    async updateUserData(
        userId: string,
        updateUserSettingsDto: UpdateUserSettingsDto,
        updateUserDto: UpdateUserDto
    ): Promise<UserData> {
        const user = await this.updateUser(userId, updateUserDto);
        const userSettings = await this.updateUserSettings(userId, updateUserSettingsDto);
        return {
            user,
            userSettings
        };
    }

    async updateUserPassword(req: any, passwords: passwords): Promise<boolean> {
        const { oldPassword, newPassword } = passwords;
        try {
            const samePass = 'Passwords are the same!';

            if (oldPassword === newPassword) {
                throw new HttpException(samePass, HttpStatus.CONFLICT);
            }

            const { userId } = req.user;
            const user = await this.findOneUserById(userId);

            if (!user) {
                throw new HttpException("User wasn't found!", HttpStatus.CONFLICT);
            }

            const compareResult = await bcrypt.compare(newPassword, user.password);

            if (compareResult) {
                throw new HttpException(samePass, HttpStatus.CONFLICT);
            }

            const newPasswordHash = await bcrypt.hash(newPassword, hashRounds);

            const updatedUser = await this.updateUser(userId, {
                password: newPasswordHash
            });

            if (!updatedUser) {
                throw new HttpException("Password wasn't updated!", HttpStatus.CONFLICT);
            }

            return true;
        } catch (error) {
            throw new HttpException('Conflict!', HttpStatus.CONFLICT);
        }
    }

    /* removeUser(id: number) {
    return `This action removes a #${id} user`;
  } */
}
