import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../../modules/user/user.module';
import { LocalStrategy } from './strategy/local.strategy';
import { JwtStrategy } from './strategy/jwt.strategy';
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports: [
        UserModule,
        JwtModule.register({
            secretOrKeyProvider: () => process.env.JWT_SECRET,
            signOptions: { expiresIn: '24 hours' }
        })
    ],
    controllers: [AuthController],
    providers: [AuthService, LocalStrategy, JwtStrategy],
    exports: [AuthService]
})
export class AuthModule {}
