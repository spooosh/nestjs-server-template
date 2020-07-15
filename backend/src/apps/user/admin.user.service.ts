import { Injectable } from '@nestjs/common';

import UserService from './user.service';

/* Input data transfer objects */
import AdminUserFilterDto from './adminDto/admin.user.filter.dto';
import UserCreateDto from './dto/user.create.dto';
import UserUpdateDto from './dto/user.update.dto';

/* Output data transfer objects */
import UserFullDto from './dto/user.full.dto';
import SuccessDto from '../../common/dto/success.dto';

@Injectable()
class AdminUserService {
    constructor(
        private readonly userService: UserService
    ) {
    }

    async getList(filter: AdminUserFilterDto): Promise<any> {
        const {_start, _end, _order, _sort} = filter;


        return await this.userService.getList({
            offset: _start,
            limit: _end - _start,
            sort: _sort,
            order: _order,
        });
    }

    async getById(id: string): Promise<UserFullDto> {
        return await this.userService.getById(id);
    }

    async create(userData: UserCreateDto): Promise<UserFullDto> {
        return await this.userService.create(userData);
    }

    async update(userId: string, userData: UserUpdateDto): Promise<UserFullDto> {
        return await this.userService.update(userId, userData);
    }

    async delete(userId: string): Promise<SuccessDto> {
        return await this.userService.delete(userId);
    }
}

export default AdminUserService;
