import { Controller, Get, Inject } from '@nestjs/common';

import { Client, ClientProxy, Transport } from '@nestjs/microservices';

@Controller('api/v1/applications')
export class AppController {
  //   @Client({
  //     transport: Transport.KAFKA,
  //     options: {
  //       client: {
  //         clientId: process.env.MICROSERVICE_CLIENT_ID,
  //         brokers: ['localhost:9092'],
  //       },
  //       consumer: {
  //         groupId: process.env.MICROSERVICE_CONSUMER,
  //       },
  //     },
  //   })
  //   client: ClientKafka;

  constructor(
    @Inject('core-service') private readonly coreServiceClient: ClientProxy,
  ) {}

  @Get()
  async getHello() {
    return this.coreServiceClient.send('core_get_all', 'Hello Kafka');
  }
}
