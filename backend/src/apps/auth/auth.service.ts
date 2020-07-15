import { Global, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { JwtService } from '@nestjs/jwt';

import DbErrors from '../../common/utils/db.errors';

import UserService from '../user/user.service';

import SuccessDto from '../../common/dto/success.dto';

import AuthLoginDto from './dto/auth.login.dto';
import UserFullDto from '../user/dto/user.full.dto';
import JwtDto from './dto/jwt.dto';
import AccessTokenDto from './dto/accessToken.dto';
import AuthChangePasswordDto from './dto/auth.change.password.dto';
import AuthUserUpdateDto from './dto/auth.user.update.dto';
import UserInfoDto from '../user/dto/user.info.dto';

@Global()
@Injectable()
export default class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
    ) {
    }

    public async register(registrationData: AuthLoginDto): Promise<SuccessDto> {
        await this.userService.create(registrationData);

        return {success: true};
    }

    public async login({email, password}: AuthLoginDto): Promise<AccessTokenDto> {
        const user = await this.userService.getByEmail(email);

        if (!user)
            throw new HttpException('Некорректные данные для входа', HttpStatus.BAD_REQUEST);

        const passwordsResult = await this._comparePass(user.hashed_password, password);

        if (!passwordsResult)
            throw new HttpException('Некорректные данные для входа', HttpStatus.BAD_REQUEST);

        return {
            access_token: this._createToken(user),
        };
    }

    public async changeUserPassword(reqUser: JwtDto, data: AuthChangePasswordDto): Promise<SuccessDto> {
        let {password, password_1, password_2} = data;

        if (!password || !password_1 || !password_2)
            throw new HttpException('Поля password, password_1, password_2 обязательны', HttpStatus.BAD_REQUEST);

        let user: UserFullDto = await this.validateUser(reqUser);

        let passwordAreSame: boolean = await this._comparePass(user.hashed_password, password);

        if (!passwordAreSame)
            throw new HttpException('Некорректные данные', HttpStatus.BAD_REQUEST);

        if (password_1 !== password_2)
            throw new HttpException('Пароли не совпадают', HttpStatus.BAD_REQUEST);

        await this.userService.changePassword(user.id, password_1);

        return {success: true};
    }

    async updateUser(reqUser: JwtDto, data: AuthUserUpdateDto): Promise<UserInfoDto> {
        let user: UserInfoDto = await this.validateUser(reqUser);

        return await this.userService.update(user.id, data);
    }

    public async validateUser({id}: JwtDto): Promise<UserFullDto> {
        let user: UserFullDto = await this.userService.getById(id);

        if (!user)
            throw new HttpException('Пользователь не авторизован', HttpStatus.UNAUTHORIZED);

        return user;
    }

    private async _comparePass(userPassword, inputPassword): Promise<boolean> {
        return await bcrypt.compare(inputPassword, userPassword);
    }

    private _createToken({id}: UserFullDto): string {
        const user = {id: id};

        return this.jwtService.sign(user);
    }
}
