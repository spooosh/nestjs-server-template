import {
    Controller,
    Post,
    Body,
    HttpCode,
    UseInterceptors,
    UseGuards,
    Get, Req, Put
} from '@nestjs/common';

import { AnyFilesInterceptor } from '@nestjs/platform-express';

import {
    ApiBadRequestResponse,
    ApiBearerAuth,
    ApiCreatedResponse,
    ApiOkResponse, ApiOperation,
    ApiTags, ApiUnauthorizedResponse
} from '@nestjs/swagger';

import { AuthGuard } from '@nestjs/passport';

// Services
import AuthService from './auth.service';

// Entry data interfaces
import AuthLoginDto from './dto/auth.login.dto';
import AuthRegisterDto from './dto/auth.register.dto';
import AuthChangePasswordDto from './dto/auth.change.password.dto';
import AuthUserUpdateDto from './dto/auth.user.update.dto';

// Output data interfaces
import AccessTokenDto from './dto/accessToken.dto';
import ErrorDto from '../../common/dto/error.dto';
import SuccessDto from '../../common/dto/success.dto';
import UserInfoDto from '../user/dto/user.info.dto';

@Controller('auth')
@UseInterceptors(AnyFilesInterceptor())
@ApiTags('Auth')
class AuthController {
    constructor(
        private authService: AuthService,
    ) {
    }

    @Post('register')
    // Swagger description
    @ApiOperation({description: 'Регистрация пользователя', summary: 'Регистрация'})
    @ApiCreatedResponse({type: SuccessDto, description: 'Все ок'})
    @ApiBadRequestResponse({type: ErrorDto, description: 'Пользователь уже существует'})
    public register(@Body() authData: AuthRegisterDto): Promise<SuccessDto> {
        return this.authService.register(authData);
    }

    @Post('login')
    @HttpCode(200)
    // Swagger description
    @ApiOperation({description: 'Авторизация пользователя', summary: 'Логин'})
    @ApiOkResponse({type: AccessTokenDto, description: 'Все ок'})
    @ApiBadRequestResponse({type: ErrorDto, description: 'Введены неверные данные'})
    public async login(@Body() authData: AuthLoginDto): Promise<AccessTokenDto> {
        return this.authService.login(authData);
    }

    @Get('user')
    @UseGuards(AuthGuard('jwt'))
    // Swagger description
    @ApiOperation({description: 'Получение авторизованного пользователя', summary: 'Получение пользователя'})
    @ApiBearerAuth()
    @ApiOkResponse({type: UserInfoDto, description: 'Все ок'})
    @ApiUnauthorizedResponse({type: ErrorDto, description: 'Не авторизован'})
    async getSelf(@Req() req): Promise<UserInfoDto> {
        let {user} = req;

        return await this.authService.validateUser(user);
    }

    @Put('user')
    @UseGuards(AuthGuard('jwt'))
    // Swagger description
    @ApiOperation({description: 'Изменение авторизованного пользователя', summary: 'Изменение пользователя'})
    @ApiBearerAuth()
    @ApiOkResponse({type: UserInfoDto, description: 'Все ок'})
    @ApiUnauthorizedResponse({type: ErrorDto, description: 'Не авторизован'})
    async updateSelf(@Req() req, @Body() userData: AuthUserUpdateDto): Promise<UserInfoDto> {
        console.log(userData);

        let {user} = req;

        return await this.authService.updateUser(user, userData);
    }

    @Post('user/password')
    @HttpCode(200)
    // Swagger description
    @ApiOperation({description: 'Изменение пароля авторизованного пользователя', summary: 'Изменение пароля пользователя'})
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth()
    @ApiOkResponse({type: SuccessDto, description: 'Все ок'})
    @ApiUnauthorizedResponse({type: ErrorDto, description: 'Не авторизован'})
    async changePassword(@Req() req, @Body() data: AuthChangePasswordDto): Promise<SuccessDto> {
        let {user} = req;

        return await this.authService.changeUserPassword(user, data);
    }
}

export default AuthController;
