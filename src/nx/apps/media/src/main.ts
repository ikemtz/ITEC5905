/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { NestExpressApplication } from '@nestjs/platform-express';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app/app.module';
import { writeFileSync } from 'fs';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const config = new DocumentBuilder()
    .setTitle('ITEC 5905 JAKI Media Microservice')
    .setDescription('Media services for ITEC5905 JAKI Project using IPFS')
    .setVersion('1.0')
    .setExternalDoc('', './swagger/v1/swagger.json')
    .build();

  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);

  app.useStaticAssets(join(__dirname, 'assets'), {
    etag: true,
    immutable: true,
    prefix: '/swagger/v1/',
  }
  );
  const port = process.env.PORT || 3000;
  const document = SwaggerModule.createDocument(app, config);
  if (process.env.NODE_ENV !== 'production') {
    writeFileSync('./swagger.json', JSON.stringify(document, undefined, 2));
  }
  SwaggerModule.setup('', app, document);

  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/`
  );
}

bootstrap();
