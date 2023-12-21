import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
      options: {
        host: process.env.HOST || "lorawan",
        port: parseInt(process.env.HOST_PORT || "3000"),
        retryAttempts: 5,
        retryDelay: 3000,
      }
    },
  );
  await app.listen();
}
bootstrap();
