import { IsBoolean, IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Exclude } from 'class-transformer';

class AdminUserUpdateDto {

    @IsString()
    @IsOptional()
    phone: string;

    @IsString()
    @IsOptional()
    full_name: string;
}

export default AdminUserUpdateDto;
