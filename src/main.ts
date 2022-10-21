import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';

import { AppModule } from './app/app.module';
import { AllExceptionsFilter } from './common/filters/exception.filters';

declare const module: any;

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        cors: true
    });
    if (module.hot) {
        module.hot.accept();
        module.hot.dispose(() => app.close());
    }

    /* const config = new DocumentBuilder()
		.setTitle('Cats example')
		.setDescription('The cats API description')
		.setVersion('1.0')
		.addTag('cats')
		.build();
	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup('api', app, document); */

    app.use(cookieParser());
    app.useGlobalFilters(new AllExceptionsFilter());

    await app.listen(parseInt(process.env.PORT) || 5000);
}
bootstrap();
