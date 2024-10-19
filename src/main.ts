import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function start() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.enableCors();
  await app.listen(3000, () => console.log('Сервер запущен.'));
}
start();
