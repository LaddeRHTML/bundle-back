import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
declare const module: any;

async function bootstrap() {
	const app = await NestFactory.create(AppModule, {
		cors: {
			origin: true,
			preflightContinue: false,
		}
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

	await app.listen(parseInt(process.env.PORT) || 5000);
}
bootstrap();
