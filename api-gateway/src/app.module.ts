import { Module } from '@nestjs/common';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { AppController } from './app.controller';
import { ApplicationsController } from './controllers/applications.controller';

@Module({
    imports: [],
    controllers: [AppController, ApplicationsController],
    providers: [
        {
            provide: 'core-service',
            useFactory: () => {
                return ClientProxyFactory.create({
                    transport: Transport.TCP,
                    options: {
                        host: 'localhost',
                        port: 5001
                    }
                });
            }
        }
    ]
})
export class AppModule {}
