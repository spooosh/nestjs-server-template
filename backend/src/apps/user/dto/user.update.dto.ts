import { IsEmail, IsOptional, IsString } from 'class-validator';

class UserUpdateDto {

    @IsString()
    @IsOptional()
    phone: string;

    @IsString()
    @IsOptional()
    full_name: string;
}

export default UserUpdateDto;
