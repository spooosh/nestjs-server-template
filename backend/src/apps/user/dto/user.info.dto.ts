import { ApiProperty } from '@nestjs/swagger';

import { IsBoolean, IsEmail, IsString, IsUUID } from 'class-validator';

class UserInfoDto {

    @ApiProperty()
    @IsUUID()
    id: string;

    @ApiProperty()
    @IsEmail()
    email: string;

    @ApiProperty()
    @IsString()
    phone: string;

    @ApiProperty()
    @IsString()
    full_name: string;

    @ApiProperty()
    @IsBoolean()
    is_admin: boolean;
}

export default UserInfoDto;
