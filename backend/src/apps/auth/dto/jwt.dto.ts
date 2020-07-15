import { IsNotEmpty, IsString } from 'class-validator';

class JwtDto {

    @IsString()
    @IsNotEmpty()
    username: string;

    @IsString()
    @IsNotEmpty()
    id: string;
}

export default JwtDto;
