import { DocumentBuilder, SwaggerDocumentOptions, SwaggerModule } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';
import { join } from 'path';

export const APP_NAME = process.env.APP_NAME;

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule, {
        cors: true
    });

    app.useStaticAssets(join(process.cwd(), '..', `${APP_NAME}-uploads`), {
        prefix: '/uploads/'
    });

    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            transform: true
        })
    );

    if (process.env.NODE_ENV == 'development' || process.env.NODE_ENV == 'staging') {
        const config = new DocumentBuilder()
            .setTitle(APP_NAME)
            .setDescription(`This is the API for ${APP_NAME}`)
            .addTag(APP_NAME)
            .setVersion('V1')
            .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' })
            .build();

        const options: SwaggerDocumentOptions = {
            operationIdFactory: (controllerKey: string, methodKey: string) => methodKey
        };

        const document = SwaggerModule.createDocument(app, config, options);
        SwaggerModule.setup('swagger', app, document, {
            swaggerOptions: {
                defaultModelsExpandDepth: -1,
                persistAuthorization: true
            }
        });
    }

    const port = process.env.PORT || 8000;
    await app.listen(port);
    console.log(`Server is running on port:- "${port}"`);
    console.log(`NODE_ENV:- "${process.env.NODE_ENV}"`);
}

bootstrap();
