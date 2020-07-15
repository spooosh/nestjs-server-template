import { ApiProperty } from '@nestjs/swagger';

class ErrorDto {

    @ApiProperty()
    statusCode: number;

    @ApiProperty()
    message: string;
}

export default ErrorDto;
