import { Public } from '../../common/auth/decorators/setmetadata.decorator';
import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { APP_NAME } from '../../main';

@ApiTags('Home')
@Controller()
export class AppController {
    @Public()
    @Get()
    getHello(): string {
        return `👋 Hey Devs! Welcome to the API of ${APP_NAME}`;
    }
}
