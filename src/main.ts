/* eslint-disable @typescript-eslint/no-explicit-any */
import { NestFactory } from '@nestjs/core';
import { NestFastifyApplication } from '@nestjs/platform-fastify/interfaces';
import { VersioningType } from '@nestjs/common/enums';

import { AllExceptionsFilter } from 'filter/AllExceptionFilter';
import { AppModule } from 'app/app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

declare const module: any;

async function bootstrap() {
    const app = await NestFactory.create<NestFastifyApplication>(AppModule, {
        cors: true
    });

    const config = new DocumentBuilder()
        .setTitle('Bundle API')
        .setDescription('Bundle API for Bundle applications')
        .setVersion('1.1')
        .addTag('PC')
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

    if (module.hot) {
        module.hot.accept();
        module.hot.dispose(() => app.close());
    }

    app.enableVersioning({
        type: VersioningType.URI,
        defaultVersion: ['', 'v1'],
        prefix: ''
    });

    app.setGlobalPrefix('api/v1');

    app.useGlobalFilters(new AllExceptionsFilter());

    await app.listen(parseInt(`${process.env.PORT}`) || 5000);
}
bootstrap();
