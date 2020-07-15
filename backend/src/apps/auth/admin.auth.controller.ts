import { Body, Controller, Post, UseGuards, UseInterceptors } from '@nestjs/common';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { ApiExcludeEndpoint } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

// Services
import AdminAuthService from './admin.auth.service';

// Guards
import { AdminGuard } from './admin.guard';

// Entry data interfaces
import AuthLoginDto from './dto/auth.login.dto';

// Output data interfaces
import AccessTokenDto from './dto/accessToken.dto';
import SuccessDto from '../../common/dto/success.dto';

@Controller('auth/admin')
@UseInterceptors(AnyFilesInterceptor())
class AdminAuthController {
    constructor(
        private readonly authService: AdminAuthService,
    ) {
    }

    @Post('login')
    @ApiExcludeEndpoint()
    async login(@Body() authData: AuthLoginDto): Promise<AccessTokenDto> {
        return await this.authService.login(authData);
    }

    @Post('check')
    @ApiExcludeEndpoint()
    @UseGuards(AuthGuard(), AdminGuard)
    async checkUser(): Promise<SuccessDto> {
        return {success: true};
    }
}

export default AdminAuthController;
