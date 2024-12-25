import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import 'colors';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import logger from './helpers/logger';

async function start() {
  //* Получение переменных из .env
  const PORT = process.env.PORT || 3000;
  const COOKIE_SECRET = process.env.COOKIE_SECRET || '';

  //* Создание приложение
  const app = await NestFactory.create(AppModule);

  //* Установка глобального префикса. Например http://localhost/api/auth/login
  app.setGlobalPrefix('api');

  //* Включение cors
  app.enableCors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  });

  //* Включение куки
  app.use(cookieParser(COOKIE_SECRET));

  //* Настройка валидации
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    })
  );

  //* Настройка Swagger
  const config = new DocumentBuilder()
    .setTitle('Приложение Фильмотека')
    .setDescription('Приложение для выбора фильма из совместных списков.')
    .setVersion('1.0.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(PORT, () => logger.info(`Сервер запущен на порту ${PORT}.`));
}
start();
