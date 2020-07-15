import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

class AuthChangePasswordDto {

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    password: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    password_1: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    password_2: string;
}

export default AuthChangePasswordDto;
