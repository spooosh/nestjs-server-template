import UserFullDto from '../dto/user.full.dto';

import { ApiProperty } from '@nestjs/swagger';

class AdminUserDto extends UserFullDto {

    @ApiProperty()
    hashed_password: string;
}

export default AdminUserDto;
