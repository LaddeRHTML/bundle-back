import { NestFactory } from '@nestjs/core';
import { configure as serverlessExpress } from '@vendia/serverless-express';

import { AppModule } from './app/app.module';

let cachedServer;

export const handler = async (event, context) => {
    if (!cachedServer) {
        const nestApp = await NestFactory.create(AppModule);
        await nestApp.init();
        cachedServer = serverlessExpress({ app: nestApp.getHttpAdapter().getInstance() });
    }

    return cachedServer(event, context);
};
