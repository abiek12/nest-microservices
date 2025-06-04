import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { randomUUID } from 'crypto';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.KAFKA,
      options: {
        client: {
          clientId: `user-${randomUUID()}`,
          brokers: [process.env.KAFKA_BROKER || 'localhost:9092'],
        },
        consumer: {
          groupId: process.env.KAFKA_GROUP_ID || 'user-svc-group',
        },
      },
    },
  );
  await app.listen();
}
bootstrap();
