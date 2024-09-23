import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';
import { CreateUserDto } from '../../../modules/user/dto/user.dto';

export class SignInRequest {
    @ApiProperty()
    @IsEmail()
    username: string;

    @ApiProperty()
    @IsString()
    password: string;
}

export class SignUpRequest extends CreateUserDto {}

export class AccessTokenResponse {
    @ApiProperty()
    @IsString()
    accessToken: string;
}
