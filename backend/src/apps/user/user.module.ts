import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import User from './entities/user.entity';

import AuthModule from '../auth/auth.module';

import UserService from './user.service';

import AdminUserService from './admin.user.service';
import AdminUserController from './admin.user.controller';

@Module({
    imports: [
        forwardRef(() => AuthModule),
        TypeOrmModule.forFeature([User]),
    ],
    providers: [UserService, AdminUserService],
    controllers: [AdminUserController],
    exports: [UserService],
})

export default class UserModule {
}
