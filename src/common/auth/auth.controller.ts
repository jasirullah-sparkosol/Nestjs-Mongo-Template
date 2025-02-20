import { Body, Controller, Post, UseGuards, Get, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBadRequestResponse, ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { AccessTokenResponse, SignInRequest, SignUpRequest } from './dto/auth.dto';
import { UserResponse } from '../../modules/user/dto/user.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { Public } from './decorators/setmetadata.decorator';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @ApiOkResponse({
        type: AccessTokenResponse,
        description: 'SignIn successful'
    })
    @ApiUnauthorizedResponse({ description: 'Username or Password is incorrect' })
    @ApiBadRequestResponse({ description: 'Issue in request data' })
    @ApiOperation({ description: 'SignIn User' })
    @Public()
    @UseGuards(LocalAuthGuard)
    @Post('sign-in')
    signIn(@Body() user: SignInRequest): Promise<AccessTokenResponse> {
        return this.authService.signIn(user.username);
    }

    @ApiOkResponse({ description: 'SignUp successful' })
    @ApiBadRequestResponse({ description: 'Issue in request data' })
    @ApiUnauthorizedResponse({ description: 'Email already exists' })
    @ApiOperation({ description: 'Create New User' })
    @Public()
    @Post('sign-up')
    signUp(@Body() data: SignUpRequest): Promise<any> {
        return this.authService.signUp(data);
    }

    @ApiOkResponse({
        type: UserResponse,
        description: 'Get user from access token'
    })
    @ApiUnauthorizedResponse({ description: 'Invalid access token' })
    @ApiOperation({ description: 'Get Current or LoggedIn User Profile' })
    @Get('profile')
    @ApiBearerAuth()
    profile(@Request() req: any) {
        return this.authService.profile(req.user);
    }
}
