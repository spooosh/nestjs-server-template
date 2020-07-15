import { Module } from '@nestjs/common';
import UserModule from './apps/user/user.module';

import DatabaseModule from './config/database/database.module';
import AuthModule from './apps/auth/auth.module';

@Module({
    imports: [
        DatabaseModule,
        UserModule,
        AuthModule,
    ]
})

export class AppModule {
}
