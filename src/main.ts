import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function start() {
  //* Создание приложение
  const app = await NestFactory.create(AppModule);

  //* Установка глобального префикса. Например http://localhost/api/auth/login
  app.setGlobalPrefix('api');

  //* Включение cors
  app.enableCors();

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
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(3000, () => console.log('Сервер запущен.'));
}
start();
