import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AuthModule } from '../../common/auth/auth.module';
import { UserModule } from '../user/user.module';
import { UploadModule } from '../../common/upload/upload.module';
import { DatabaseModule } from '../../common/database/database.module';
import { JwtAuthGuard } from '../../common/auth/guards/jwt-auth.guard';

@Module({
    imports: [
        // Config Module
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: ['.env', `.env.${process.env.NODE_ENV}`]
        }),

        // Common Modules
        AuthModule,
        DatabaseModule,
        UploadModule,

        // Feature Modules
        UserModule
    ],
    controllers: [AppController],
    providers: [
        {
            provide: 'APP_GUARD',
            useClass: JwtAuthGuard
        }
    ]
})
export class AppModule {}
