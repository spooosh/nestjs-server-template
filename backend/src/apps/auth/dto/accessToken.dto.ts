import { ApiProperty } from '@nestjs/swagger';

class AccessTokenDto {

    @ApiProperty()
    access_token: string;
}

export default AccessTokenDto;
