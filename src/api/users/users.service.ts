import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Payload } from 'api/auth/strategies/jwt-auth.strategy';
import { Role } from 'api/users/enum';
import { UserPasswords } from 'api/users/interface/passwords.interface';
import * as bcrypt from 'bcryptjs';
import { hashRounds } from 'src/common/constants/bcrypt';
import { SAME_PASSWORD_EXCEPTION } from 'src/common/constants/passwords';
import { PageMetaDto } from 'src/common/pagination/dtos/page-meta.dto';
import { PageOptionsDto } from 'src/common/pagination/dtos/page-options.dto';
import { PageDto } from 'src/common/pagination/dtos/page.dto';
import { calcRelToCurrentDate } from 'src/common/utils/index';
import { FindOneOptions, InsertResult, Repository } from 'typeorm';
import getSQLSearch from 'utils/array/getSQLSearch';

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
            throw new Error(`users.service | createOne error: ${error.message}`);
        }
    }

    async findAll(): Promise<User[]> {
        try {
            return await this.usersRepository.find();
        } catch (error) {
            throw new Error(`users.service | findAll error: ${error.message}`);
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
                .orderBy('user.registration_date', pageOptionsDto.order)
                .skip(pageOptionsDto.skip)
                .take(pageOptionsDto.limit);

            const total = await queryBuilder.getCount();
            const { entities } = await queryBuilder.getRawAndEntities();

            const pageMetaDto = new PageMetaDto({ pageOptionsDto, total });

            return new PageDto(entities, pageMetaDto);
        } catch (error) {
            throw new Error(`users.service | findSome error: ${error.message}`);
        }
    }

    async findOne(parameter: FindOneOptions<User>): Promise<User> {
        try {
            return await this.usersRepository.findOne(parameter);
        } catch (error) {
            throw new Error(`users.service | findOne error: ${error.message}`);
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
            throw new Error(`users.service | updateOne error: ${error.message}`);
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
            throw new Error(`users.service | updatePassword error: ${error.message}`);
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
            throw new Error(`users.service | updateMany error: ${error.message}`);
        }
    }

    async removeOneById(id: string) {
        try {
            const user = await this.findOne({ where: { id } });
            return this.usersRepository.remove(user);
        } catch (error) {
            throw new Error(`users.service | removeOneById error: ${error.message}`);
        }
    }
}
