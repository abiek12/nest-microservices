import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.KAFKA,
      options: {
        client: {
          brokers: [process.env.KAFKA_BROKER ?? 'localhost:9092'],
        },
        consumer: {
          groupId: process.env.KAFKA_GROUP_ID ?? 'restaurant-consumer',
        },
      },
    },
  );
  await app.listen();
  console.log('Restaurant service is listening...');
  console.log(`Kafka broker: ${process.env.KAFKA_BROKER ?? 'localhost:9092'}`);
}
bootstrap();
