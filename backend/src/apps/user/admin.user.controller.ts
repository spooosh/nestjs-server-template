import {
    Controller,
    Get, Post, Put, Delete,
    Body, Param,
    UseInterceptors,
    UseGuards, Query, Res,
} from '@nestjs/common';

import { AnyFilesInterceptor } from '@nestjs/platform-express';

import { AuthGuard } from '@nestjs/passport';
import { AdminGuard } from '../auth/admin.guard';

import { ApiExcludeEndpoint } from '@nestjs/swagger';

/* Services */
import AdminUserService from './admin.user.service';

/* Input data transfer objects */
import AdminUserUpdateDto from './adminDto/admin.user.update.dto';
import UserCreateDto from './dto/user.create.dto';

/* Output data transfer objects */
import UserInfoDto from './dto/user.info.dto';
import SuccessDto from '../../common/dto/success.dto';
import AdminUserFilterDto from './adminDto/admin.user.filter.dto';

@Controller('admin/user')
@UseGuards(AuthGuard('jwt'), AdminGuard)
@UseInterceptors(AnyFilesInterceptor())
class AdminUserController {
    constructor(
        private readonly adminService: AdminUserService,
    ) {
    }

    @Get()
    @ApiExcludeEndpoint()
    async getList(@Res() res, @Query() query: AdminUserFilterDto) {
        const {count, list} = await this.adminService.getList(query);

        res
            .header('X-Total-Count', count)
            .send(list);
    }

    @Post()
    @ApiExcludeEndpoint()
    async createUser(
        @Body() userData: UserCreateDto,
    ): Promise<UserInfoDto> {
        return await this.adminService.create(userData);
    }

    @Get(':id')
    @ApiExcludeEndpoint()
    async getUser(
        @Param('id') userId: string,
    ): Promise<UserInfoDto> {
        return await this.adminService.getById(userId);
    }

    @Put(':id')
    @ApiExcludeEndpoint()
    async updateUser(
        @Param('id') userId: string,
        @Body() userData: AdminUserUpdateDto
    ): Promise<UserInfoDto> {
        return await this.adminService.update(userId, userData);
    }

    @Delete(':id')
    @ApiExcludeEndpoint()
    async deleteUser(
        @Param('id') userId: string,
    ): Promise<SuccessDto> {
        return await this.adminService.delete(userId);
    }
}

export default AdminUserController;
