import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import * as bcrypt from 'bcrypt';

import User from './entities/user.entity';

import SuccessDto from '../../common/dto/success.dto';

import UserFullDto from './dto/user.full.dto';
import UserFilterDto from './dto/user.filter.dto';
import UserCreateDto from './dto/user.create.dto';
import UserUpdateDto from './dto/user.update.dto';
import AdminUserFilterDto from './adminDto/admin.user.filter.dto';
import DbErrors from '../../common/utils/db.errors';


@Injectable()
export default class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) {
    }

    async getList(filter?: UserFilterDto): Promise<any> {
        const {offset, limit, order, sort} = filter;

        let count = await this.userRepository.count();

        return {
            count: count,
            list: await this.userRepository.find({
                skip: offset,
                take: limit,
                order: {[sort || 'email']: order || 'ASC'},
            }),
        };
    }

    async getByEmail(email: string): Promise<UserFullDto> {
        let user = await this.userRepository.findOne({email});

        if (!user)
            throw new HttpException('Пользователь не найден', HttpStatus.NOT_FOUND);

        return user;
    }

    async getById(id: string): Promise<UserFullDto> {
        let user = await this.userRepository.findOne({id});

        if (!user)
            throw new HttpException('Пользователь не найден', HttpStatus.NOT_FOUND);

        return user;
    }

    async create(userData: UserCreateDto): Promise<UserFullDto> {
        try {
            let hashedPassword = await bcrypt.hash(userData.password, 8);

            let data = {
                ...userData,
                hashed_password: hashedPassword,
            };

            const newUser = await this.userRepository.create(data);

            await this.userRepository.save(newUser);

            return newUser;
        } catch (e) {
            if (e.code === DbErrors.UniqueViolation)
                throw new HttpException('Пользователь с таким email уже существет', HttpStatus.BAD_REQUEST);

            throw new HttpException('Что-то пошло не так', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async update(userId: string, userData: UserUpdateDto): Promise<UserFullDto> {
        let user: UserFullDto = await this.userRepository.findOne(userId);

        if (!user)
            throw new HttpException('Пользователь не найден', HttpStatus.NOT_FOUND);

        user = {
            ...user,
            ...userData,
        };

        return await this.userRepository.save(user);
    }

    async changePassword(userId: string, password: string): Promise<UserFullDto> {
        let hashedPassword = await bcrypt.hash(password, 8);

        let user = await this.userRepository.findOne(userId);

        user.hashed_password = hashedPassword;

        await this.userRepository.save(user);

        return user;
    }

    async delete(userId: string): Promise<SuccessDto> {
        let user = await this.userRepository.findOne(userId);

        if (!user)
            throw new HttpException('Пользователь не найден', HttpStatus.NOT_FOUND);

        try {
            await this.userRepository.delete(user);

            return {
                success: true,
            };
        } catch (e) {
            throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
