import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';

async function start() {
  // * Получение порта из .env
  const PORT = process.env.PORT || 3000;

  //* Создание приложение
  const app = await NestFactory.create(AppModule);

  //* Установка глобального префикса. Например http://localhost/api/auth/login
  app.setGlobalPrefix('api');

  //* Включение cors
  app.enableCors();

  // * Включение куки
  app.use(cookieParser());

  //* Настройка валидации
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    })
  );

  // * Настройка Swagger
  const config = new DocumentBuilder()
    .setTitle('Приложение Фильмотека.')
    .setDescription('Приложение для выбора фильма из совместных списков.')
    .addTag('Filmoteka')
    .setVersion('1.0.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(PORT, () => console.log(`Сервер запущен на порту ${PORT}.`));
}
start();
