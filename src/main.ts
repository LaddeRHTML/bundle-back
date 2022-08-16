import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cors from 'cors';
declare const module: any;

async function bootstrap() {
    /* const corsOption = {
        origin: [
            'http://localhost:3000/',
            'https://local-prod-bundle.vercel.app/',
            'https://bundle-landing.vercel.app/'
        ],
        allowedHeaders: ['origin', 'x-requested-with', 'content-type', 'accept', 'authorization'],
        credentials: true,
        preflightContinue: false
    }; */
    const app = await NestFactory.create(AppModule);

    app.use(cors());

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

    await app.listen(parseInt(process.env.PORT) || 5000);
}
bootstrap();
