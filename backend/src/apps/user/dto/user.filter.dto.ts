import { ApiProperty } from '@nestjs/swagger';

class UserFilterDto {

    @ApiProperty()
    offset?: number;

    @ApiProperty()
    limit?: number;

    @ApiProperty()
    order?: string;

    @ApiProperty()
    sort?: string;
}

export default UserFilterDto;
