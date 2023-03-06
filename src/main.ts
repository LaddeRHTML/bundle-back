/* eslint-disable @typescript-eslint/no-explicit-any */
import { NestFactory } from '@nestjs/core';
import { NestFastifyApplication } from '@nestjs/platform-fastify/interfaces';
import { VersioningType } from '@nestjs/common/enums';

import { AllExceptionsFilter } from 'filter/AllExceptionFilter';
import { AppModule } from 'app/app.module';

declare const module: any;

async function bootstrap() {
    const app = await NestFactory.create<NestFastifyApplication>(AppModule, {
        cors: true
    });

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

    await app.listen(parseInt(`${process.env.PORT}`) || 5000, '0.0.0.0');
}
bootstrap();
