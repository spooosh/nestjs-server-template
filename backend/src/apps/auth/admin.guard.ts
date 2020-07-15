import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import AuthService from './auth.service';

@Injectable()
export class AdminGuard implements CanActivate {
    constructor(
        private readonly authService: AuthService,
    ) {
    }

    async canActivate(
        context: ExecutionContext,
    ): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        let user = request.user;

        const result = await this.authService.validateUser(user);

        return result.is_admin;
    }
}
