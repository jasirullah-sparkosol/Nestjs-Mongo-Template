import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class FileDTO {
    @IsString()
    @ApiProperty()
    name: string;

    @IsString()
    @IsOptional()
    @ApiProperty()
    path: string;
}

export class SaveFileDTO {
    @ApiProperty({ required: true, type: 'string', format: 'binary' })
    file: FileDTO;
}
