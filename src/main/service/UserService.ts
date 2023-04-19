import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, FindOneOptions, FindOptionsWhere, InsertResult, Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';

import { User } from 'model/user/User';
import { Role } from 'model/user/UserEnums';

import { UpdateUserDto } from 'dto/User/UpdateUserDto';
import { CreateUserDto } from 'dto/User/CreateUserDto';

import { calcRelToCurrentDate } from 'common/utils/date';
import getErrorMessage from 'common/utils/errors/getErrorMessage';
import { PageDto } from 'common/pagination/dtos/page.dto';
import { PageOptionsDto } from 'common/pagination/dtos/page-options.dto';
import getSQLSearch from 'common/utils/array/getSQLSearch';
import { PageMetaDto } from 'common/pagination/dtos/page-meta.dto';
import { PASSWORD_HASH_ROUNDS, SAME_PASSWORD_EXCEPTION } from 'common/constants';
import { AllowedUserRelations } from 'controller/UserController';

export interface ChangePassword {
    oldPassword: string;
    newPassword: string;
}

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>
    ) {}

    async createOne(userDto: CreateUserDto, role: Role): Promise<InsertResult> {
        try {
            if (userDto.birthday) {
                userDto.age = calcRelToCurrentDate(userDto.birthday, true);
            }

            userDto.role = role;

            return await this.usersRepository.insert(userDto);
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

    async findSome(
        pageOptionsDto: PageOptionsDto,
        relations: AllowedUserRelations
    ): Promise<PageDto<User>> {
        try {
            const includedInSearchFields = [
                'address',
                'name',
                'familyName',
                'patronymic',
                'iin',
                'phoneNumber',
                'email'
            ];
            const entityName = User.name.toLowerCase();

            const queryBuilder = this.usersRepository.createQueryBuilder(entityName);

            if (pageOptionsDto.searchBy) {
                queryBuilder.where(getSQLSearch(includedInSearchFields, entityName), {
                    s: `%${pageOptionsDto.searchBy}%`
                });
            }

            queryBuilder
                .orderBy(`${entityName}.registrationDate`, pageOptionsDto.order)
                .skip(pageOptionsDto.skip)
                .take(pageOptionsDto.limit);

            if (relations.length > 0) {
                relations.forEach((relation) => {
                    queryBuilder.leftJoinAndSelect(`${entityName}.${relation}`, relation);
                });
            }

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
            if (updateUserDto.birthday) {
                updateUserDto.age = calcRelToCurrentDate(updateUserDto.birthday, true);
            }

            updateUserDto.updateDate = new Date();

            return await this.usersRepository.save({ id, ...updateUserDto });
        } catch (error) {
            throw new Error(`users.service | updateOne error: ${getErrorMessage(error)}`);
        }
    }

    async updatePassword(userId: string, passwords: ChangePassword): Promise<boolean> {
        const { oldPassword, newPassword } = passwords;
        try {
            if (oldPassword === newPassword) {
                throw new Error(SAME_PASSWORD_EXCEPTION);
            }

            const user = await this.findOne({ where: { id: userId }, select: ['password'] });

            if (!user) {
                throw new HttpException('User not found!', HttpStatus.CONFLICT);
            }

            const compareResult = await bcrypt.compare(oldPassword, user.password);

            if (!compareResult) {
                throw new Error(SAME_PASSWORD_EXCEPTION);
            }

            const newPasswordHash = await bcrypt.hash(newPassword, PASSWORD_HASH_ROUNDS);

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

    async updateMany(userIds: string[], user: Partial<User>) {
        try {
            return await this.usersRepository
                .createQueryBuilder()
                .update(User)
                .set({ ...user, updateDate: new Date() })
                .whereInIds(userIds)
                .execute();
        } catch (error) {
            throw new Error(`users.service | updateMany error: ${getErrorMessage(error)}`);
        }
    }

    async deleteOneById(id: string): Promise<DeleteResult> {
        try {
            const isExists = await this.isUserExists({ id });

            if (!isExists) {
                throw new NotFoundException('User not found!');
            }

            return await this.usersRepository.delete({ id });
        } catch (error) {
            throw new Error(`users.service | deleteOneById error: ${getErrorMessage(error)}`);
        }
    }

    async isUserExists(userProperty: FindOptionsWhere<User>): Promise<boolean> {
        try {
            return await this.usersRepository.exist({ where: userProperty });
        } catch (error) {
            throw new Error(`users.service | isUserExists error: ${getErrorMessage(error)}`);
        }
    }
}
