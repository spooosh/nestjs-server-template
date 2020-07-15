import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

class AuthLoginDto {

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        required: true,
    })
    email: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        required: true,
    })
    password: string;
}

export default AuthLoginDto;
