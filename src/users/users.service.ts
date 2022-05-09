import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserData } from 'src/interfaces/user.interface';
import { passwords } from 'src/types/passwords.types';
import { UserDto, UserSettingsDto } from './dto/create-user.dto';
import { UpdateUserDto, UpdateUserSettingsDto } from './dto/update-user.dto';
import { User, UserDocument, UserSettings, UserSettingsDocument } from './user.schema';
import * as bcrypt from 'bcryptjs';
@Injectable()
export class UsersService {
    constructor(
        @InjectModel('user') private userModel: Model<UserDocument>,
        @InjectModel('userSettings') private userSettingsModel: Model<UserSettingsDocument>
    ) {}

    create(UserDto: UserDto, UserSettingsDto: UserSettingsDto): Promise<any> {
        try {
            const newUser = new this.userModel(UserDto);
            const { _id } = newUser;
            const newUserSettings = new this.userSettingsModel({ ...UserSettingsDto, user: _id });

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
        UpdateUserSettingsDto: UpdateUserSettingsDto
    ): Promise<UserSettings> {
        const userSettingsToUpdate = await this.userSettingsModel.findOne({ user: userId });
        const { id } = userSettingsToUpdate;
        return await this.userSettingsModel.findOneAndUpdate(
            { _id: id },
            { ...UpdateUserSettingsDto },
            { returnNewDocument: true, returnOriginal: false }
        );
    }

    async updateUserData(
        userId: string,
        UpdateUserSettingsDto: UpdateUserSettingsDto,
        UpdateUserDto: UpdateUserDto
    ): Promise<UserData> {
        const user = await this.updateUser(userId, UpdateUserDto);
        const userSettings = await this.updateUserSettings(userId, UpdateUserSettingsDto);
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

            const newPasswordHash = await bcrypt.hash(newPassword, 9);

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
