import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import { ConfigService } from '@nestjs/config';
import { AUTH_SERVICE, RmqService } from '@app/common';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);
  const configService = app.get(ConfigService);
  const rmqService = app.get(RmqService);

  app.enableCors({
    origin: ['http://localhost:3200'],
    credentials: true,
  });

  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.connectMicroservice(rmqService.getOptions(AUTH_SERVICE, true));
  app.setGlobalPrefix('api');

  await app.startAllMicroservices();
  await app.listen(configService.get('PORT'));
}
bootstrap();
