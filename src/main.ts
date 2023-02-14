import { NestFactory } from '@nestjs/core';
import { FastifyAdapter } from '@nestjs/platform-fastify';
import { NestFastifyApplication } from '@nestjs/platform-fastify/interfaces';

import { AppModule } from './app/app.module';
import { AllExceptionsFilter } from './common/filters/exception.filters';

declare const module: any;

async function bootstrap() {
    /* const fastify = new FastifyAdapter(); */
    const app = await NestFactory.create<NestFastifyApplication>(
        AppModule,
        /* fastify, */ {
            cors: true
        }
    );

    if (module.hot) {
        module.hot.accept();
        module.hot.dispose(() => app.close());
    }

    app.useGlobalFilters(new AllExceptionsFilter());

    await app.listen(parseInt(process.env.PORT) || 5000, '0.0.0.0');
}
bootstrap();
