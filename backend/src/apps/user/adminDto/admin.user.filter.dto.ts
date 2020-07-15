import { IsNumber, IsOptional, IsString } from 'class-validator';

import { Type } from 'class-transformer';

class AdminUserFilterDto {

    @IsString()
    @IsOptional()
    _sort?: string;

    @IsString()
    @IsOptional()
    _order?: string;

    @Type(() => Number)
    @IsNumber()
    @IsOptional()
    _start?: number;

    @Type(() => Number)
    @IsNumber()
    @IsOptional()
    _end?: number;
}

export default AdminUserFilterDto;
