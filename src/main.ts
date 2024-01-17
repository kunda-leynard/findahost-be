import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { json, urlencoded } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  /* Input Validation */
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  /* App Configs */
  app.enableCors();
  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ extended: true, limit: '50mb' }));

  /* API Documentation ~ OpenAPI Swagger */
  const config = new DocumentBuilder()
    .setTitle('NodeJS Starter')
    .setDescription('NodeJS Starter API by Francis Ong')
    .setVersion('0.1')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
