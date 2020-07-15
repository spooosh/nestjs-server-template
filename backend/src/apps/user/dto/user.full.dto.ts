import { ApiProperty } from '@nestjs/swagger';

import { IsBoolean, IsEmail, IsString, IsUUID } from 'class-validator';

class UserFullDto {

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

    @ApiProperty()
    @IsString()
    hashed_password: string;
}

export default UserFullDto;
