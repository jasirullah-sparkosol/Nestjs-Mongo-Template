import { IsEnum, IsNotEmpty, IsObject, IsString, Length } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { UserStatus } from '../schema/user.schema';

export class CreateUserDto {
    @ApiProperty({ required: true })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({ required: true })
    @IsString()
    @IsNotEmpty()
    email: string;

    @ApiProperty({ required: true })
    @IsString()
    @Length(8)
    password: string;

    @ApiProperty({
        enum: UserStatus,
        default: UserStatus.ACTIVE,
        required: true
    })
    @IsEnum(UserStatus, {
        message: 'Status must be ' + Object.values(UserStatus).join(', ')
    })
    status: UserStatus;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}

export class UserResponse {
    @ApiProperty()
    _id: string;

    @ApiProperty()
    name: string;

    @ApiProperty()
    email: string;

    @ApiProperty()
    status: string;

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    updatedAt: Date;
}
