import { ApiProperty } from '@nestjs/swagger';

class SuccessDto {

    @ApiProperty()
    success: boolean;
}

export default SuccessDto;
