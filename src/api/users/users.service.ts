import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, FindOneOptions, FindOptionsWhere, InsertResult, Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';

import { Role } from 'api/users/enum';
import { UserPasswords } from 'api/users/interface/passwords.interface';
import { Payload } from 'api/auth/interface/auth.interface';
import { hashRounds } from 'common/constants/bcrypt';
import { SAME_PASSWORD_EXCEPTION } from 'common/constants/passwords';
import { PageMetaDto } from 'common/pagination/dtos/page-meta.dto';
import { PageOptionsDto } from 'common/pagination/dtos/page-options.dto';
import { PageDto } from 'common/pagination/dtos/page.dto';
import getSQLSearch from 'common/utils/array/getSQLSearch';
import getErrorMessage from 'common/utils/errors/getErrorMessage';
import { calcRelToCurrentDate } from 'common/utils/date/index';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entity/user.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>
    ) {}

    async createOne(createUserDto: CreateUserDto, role: Role): Promise<InsertResult> {
        try {
            createUserDto.age = calcRelToCurrentDate(createUserDto.birthday, true);
            createUserDto.role = role;

            return await this.usersRepository.insert(createUserDto);
        } catch (error) {
            throw new Error(`users.service | createOne error: ${getErrorMessage(error)}`);
        }
    }

    async findAll(): Promise<User[]> {
        try {
            return await this.usersRepository.find();
        } catch (error) {
            throw new Error(`users.service | findAll error: ${getErrorMessage(error)}`);
        }
    }

    async findSome(pageOptionsDto: PageOptionsDto): Promise<PageDto<User>> {
        try {
            const includedInSearchFields = [
                'address',
                'name',
                'family_name',
                'patronymic',
                'iin',
                'phone_number',
                'email'
            ];

            const queryBuilder = this.usersRepository.createQueryBuilder(User.name.toLowerCase());

            if (pageOptionsDto.searchBy) {
                queryBuilder.where(getSQLSearch(includedInSearchFields, User.name.toLowerCase()), {
                    s: `%${pageOptionsDto.searchBy}%`
                });
            }

            queryBuilder
                .orderBy(`${User.name.toLowerCase()}.registration_date`, pageOptionsDto.order)
                .skip(pageOptionsDto.skip)
                .take(pageOptionsDto.limit);

            const total = await queryBuilder.getCount();
            const { entities } = await queryBuilder.getRawAndEntities();

            const pageMetaDto = new PageMetaDto({ pageOptionsDto, total });

            return new PageDto(entities, pageMetaDto);
        } catch (error) {
            throw new Error(`users.service | findSome error: ${getErrorMessage(error)}`);
        }
    }

    async findOne(parameter: FindOneOptions<User>): Promise<User | null> {
        try {
            return await this.usersRepository.findOne(parameter);
        } catch (error) {
            throw new Error(`users.service | findOne error: ${getErrorMessage(error)}`);
        }
    }

    async updateOne(id: string, updateUserDto: UpdateUserDto): Promise<User> {
        try {
            if (updateUserDto?.birthday) {
                updateUserDto.age = calcRelToCurrentDate(updateUserDto?.birthday, true);
            }

            updateUserDto.update_date = new Date();

            return await this.usersRepository.save({ id, ...updateUserDto });
        } catch (error) {
            throw new Error(`users.service | updateOne error: ${getErrorMessage(error)}`);
        }
    }

    async updatePassword(payload: Payload, passwords: UserPasswords): Promise<boolean> {
        const { oldPassword, newPassword } = passwords;
        try {
            if (oldPassword === newPassword) {
                throw new Error(SAME_PASSWORD_EXCEPTION);
            }

            const userId = payload.userId;
            const user = await this.findOne({ where: { id: userId } });

            if (!user) {
                throw new HttpException('User not found!', HttpStatus.CONFLICT);
            }

            const compareResult = await bcrypt.compare(oldPassword, user.password);

            if (!compareResult) {
                throw new Error(SAME_PASSWORD_EXCEPTION);
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
            throw new Error(`users.service | updatePassword error: ${getErrorMessage(error)}`);
        }
    }

    async updateMany(userIds: string[], updateUserDto: UpdateUserDto) {
        try {
            return await this.usersRepository
                .createQueryBuilder()
                .update(User)
                .set({ ...updateUserDto, update_date: new Date() })
                .whereInIds(userIds)
                .execute();
        } catch (error) {
            throw new Error(`users.service | updateMany error: ${getErrorMessage(error)}`);
        }
    }

    async removeOneById(id: string): Promise<DeleteResult> {
        try {
            const isExists = await this.isUserExists({ id });

            if (!isExists) {
                throw new NotFoundException('User not found!');
            }

            return await this.usersRepository.delete({ id });
        } catch (error) {
            throw new Error(`users.service | removeOneById error: ${getErrorMessage(error)}`);
        }
    }

    async isUserExists(userProperty: FindOptionsWhere<User>): Promise<boolean> {
        try {
            return await this.usersRepository.exist({ where: userProperty });
        } catch (error) {
            throw new Error(`files.service | isFileExists error: ${getErrorMessage(error)}`);
        }
    }
}
