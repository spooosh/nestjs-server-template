import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import UserService from '../user/user.service';

import AuthLoginDto from './dto/auth.login.dto';
import AccessTokenDto from './dto/accessToken.dto';
import UserInfoDto from '../user/dto/user.info.dto';

@Injectable()
class AdminAuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
    ) {
    }

    public async login({email, password}: AuthLoginDto): Promise<AccessTokenDto> {
        const user = await this.userService.getByEmail(email);

        if (!user)
            throw new HttpException('Некорректные данные для входа', HttpStatus.BAD_REQUEST);

        const passwordsResult = await this._comparePass(user.hashed_password, password);

        if (!passwordsResult)
            throw new HttpException('Некорректные данные для входа', HttpStatus.BAD_REQUEST);

        if (!user.is_admin)
            throw new HttpException('У пользователя недостаточно прав', HttpStatus.UNAUTHORIZED);

        return {
            access_token: this._createToken(user),
        };
    }

    private async _comparePass(userPassword, inputPassword): Promise<boolean> {
        return await bcrypt.compare(inputPassword, userPassword);
    }

    private _createToken({id, email}: UserInfoDto): string {
        const user = {username: email, id: id};

        return this.jwtService.sign(user);
    }
}

export default AdminAuthService;
