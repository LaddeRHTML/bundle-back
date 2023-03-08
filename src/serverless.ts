/* eslint-disable @typescript-eslint/no-explicit-any */
import { VersioningType } from '@nestjs/common/enums';
import { NestFactory } from '@nestjs/core';
import { configure as serverlessExpress } from '@vendia/serverless-express';
import { Callback, Context, Handler } from 'aws-lambda';

import { AppModule } from 'app/app.module';
import { AllExceptionsFilter } from 'filter/AllExceptionFilter';

let server: Handler;

async function bootstrap(): Promise<Handler> {
    const app = await NestFactory.create(AppModule, { cors: true });

    app.enableVersioning({
        type: VersioningType.URI,
        defaultVersion: ['', 'v1'],
        prefix: ''
    });

    app.setGlobalPrefix('api/v1');

    app.useGlobalFilters(new AllExceptionsFilter());

    await app.init();

    const expressApp = app.getHttpAdapter().getInstance();
    return serverlessExpress({ app: expressApp });
}

export const handler: Handler = async (event: any, context: Context, callback: Callback) => {
    server = server ?? (await bootstrap());
    return server(event, context, callback);
};
