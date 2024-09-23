import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../../modules/user/user.service';
import { SignUpRequest } from './dto/auth.dto';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UserService,
        private jwtService: JwtService
    ) {}

    async validateUser(username: string, password: string) {
        const user = await this.usersService.validateEmailAndPassword(username, password);
        if (user) {
            return user;
        }
        return null;
    }

    async signIn(username: string) {
        const userData = await this.usersService.findOneByEmail(username);

        const payload = {
            // @ts-ignore
            id: userData._id,
            name: userData.name,
            email: userData.email
        };
        return {
            accessToken: this.jwtService.sign(payload)
        };
    }

    async signUp(data: SignUpRequest) {
        return await this.usersService.create(data);
    }

    async profile(user: any) {
        return await this.usersService.findOne(user.id);
    }
}
