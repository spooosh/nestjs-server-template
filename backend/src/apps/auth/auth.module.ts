import AdminAuthService from './admin.auth.service';

require('dotenv').config();

import { forwardRef, Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import UserModule from '../user/user.module';
import AuthService from './auth.service';
import AuthController from './auth.controller';
import JwtStrategy from './jwt.strategy';
import AdminAuthController from './admin.auth.controller';

@Module({
    imports: [
        forwardRef(() => UserModule),
        PassportModule,
        JwtModule.registerAsync({
            useFactory: () => ({
                secret: process.env.SECRET_KEY,
                signOptions: {expiresIn: '30d'}
            })
        })
    ],
    controllers: [AuthController, AdminAuthController],
    providers: [AuthService, AdminAuthService, JwtStrategy],
    exports: [AuthService, JwtModule],
})

export default class AuthModule {
};
