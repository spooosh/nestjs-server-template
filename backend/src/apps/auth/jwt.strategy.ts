require('dotenv').config();

import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import AuthService from './auth.service';
import JwtDto from './dto/jwt.dto';

@Injectable()
class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly authService: AuthService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.SECRET_KEY,
        });
    }

    async validate(payload: JwtDto) {
        const user = await this.authService.validateUser(payload);

        return {id: user.id};
    }
}

export default JwtStrategy;
