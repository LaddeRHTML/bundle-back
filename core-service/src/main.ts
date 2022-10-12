import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

import { AppModule } from './app.module';
import { AllExceptionsFilter } from './filters/exception.filters';

declare const module: any;

async function bootstrap() {
    const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
        transport: Transport.TCP,
        options: {
            host: 'localhost',
            port: 5001
        }
    });

    if (module.hot) {
        module.hot.accept();
        module.hot.dispose(() => app.close());
    }

    app.useGlobalFilters(new AllExceptionsFilter());

    await app.listen().then(() => console.log('running on 127.0.0.1:8888'));
}
bootstrap();
