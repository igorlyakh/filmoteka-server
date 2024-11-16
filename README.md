# 🎥 Filmoteka Server

**Filmoteka Server** — это серверная часть приложения для управления коллекциями фильмов и комнатами. Позволяет пользователям создавать комнаты, добавлять фильмы, делиться коллекциями и выбирать случайный фильм из общего списка.

---

## 📋 Основные возможности

- **Управление аутентификацией:**

  - Регистрация и вход.
  - Обновление токенов.
  - Выход из системы.

- **Управление комнатами:**

  - Создание комнат.
  - Добавление и удаление участников.
  - Просмотр комнат пользователя.

- **Управление фильмами:**

  - Добавление и удаление фильмов в комнатах.
  - Просмотр фильмов в конкретной комнате.

- **Реалтайм взаимодействие:**

  - Мгновенные обновления через WebSocket для добавления и удаления фильмов, а также участников комнаты.

- **Swagger-документация:**  
  Эндпоинт для просмотра API документации — **`/api/docs`**.

---

## 📦 Установка зависимостей

1. Клонируйте репозиторий:
   ```bash
   git clone https://github.com/ваш-репозиторий/filmoteka-server.git
   cd filmoteka-server
   ```
2. Установите зависимости с помощью Yarn:
   ```bash
   yarn install
   ```
3. Настройте переменные окружения:  
   В корне проекта найдите файл `.env.example`. Скопируйте его и переименуйте в `.env`. Затем укажите следующие переменные окружения:

   - `DATABASE_URL` — Ссылка для подключения к базе данных PostgreSQL.
   - `JWT_ACCESS_SECRET` — Секретный ключ для создания Access-токенов.
   - `JWT_REFRESH_SECRET` — Секретный ключ для создания Refresh-токенов.
   - `COOKIE_SECRET` — Секретный ключ для работы с cookie.
   - `PORT` — Порт, на котором будет запущен сервер.

4. Запустите миграции для базы данных:
   ```bash
   yarn prisma migrate dev
   ```
5. Запустите сервер в режиме разработки:
   ```bash
   yarn dev
   ```

## 📡 API Эндпоинты

### 1. **Аутентификация**

- **POST** `/api/auth/login` — Вход пользователя.
- **POST** `/api/auth/registration` — Регистрация нового пользователя.
- **POST** `/api/auth/refresh` — Обновление токенов.
- **POST** `/api/auth/logout` — Выход пользователя.

### 2. **Комнаты**

- **POST** `/api/room` — Создание новой комнаты.
- **GET** `/api/room` — Получение всех комнат пользователя.
- **DELETE** `/api/room` — Удаление комнаты пользователя по ID.
- **PATCH** `/api/room/:roomId` — Добавить участника в комнату.
- **PATCH** `/api/room/kick/:roomId` — Удалить участника комнаты.

### 3. **Фильмы**

- **POST** `/api/:roomId/movie` — Добавить фильм в комнату.
- **GET** `/api/:roomId/movie` — Получить фильмы комнаты.
- **DELETE** `/api/:roomId/movie` — Удалить фильм из комнаты.

### 4. **Swagger Документация**

- **GET** `/api/docs` — Получение документации по API (Swagger).

## ⚡ WebSocket События

- **addMovie** — Добавление фильма в комнату.
- **deleteMovie** — Удаление фильма из комнаты.
- **addToRoom** — Добавление участника в комнату.
- **kickFromRoom** — Удаление участника из комнаты.

## 📝 Скрипты

- **`yarn build`** — Сборка проекта.
- **`yarn format`** — Форматирование файлов с использованием Prettier.
- **`yarn start`** — Запуск проекта в продакшн-режиме.
- **`yarn dev`** — Запуск проекта в режиме разработки.
- **`yarn start:debug`** — Запуск проекта в режиме отладки.
- **`yarn start:prod`** — Запуск проекта в продакшн-режиме (с использованием скомпилированных файлов).
- **`yarn lint`** — Запуск линтинга с использованием ESLint.
- **`yarn test`** — Запуск тестов.
- **`yarn test:watch`** — Запуск тестов в режиме наблюдения.
- **`yarn test:cov`** — Запуск тестов с покрытием.
- **`yarn test:debug`** — Запуск тестов с отладчиком.
- **`yarn test:e2e`** — Запуск энд-ту-энд тестов.

## 🛠 Технологии

| Технология                                                                                        | Описание                                          |
| ------------------------------------------------------------------------------------------------- | ------------------------------------------------- |
| ![NestJS](https://img.shields.io/badge/-NestJS-E0234E?logo=nestjs&logoColor=white)                | Фреймворк для серверной разработки на TypeScript. |
| ![Prisma](https://img.shields.io/badge/-Prisma-2D3748?logo=prisma&logoColor=white)                | ORM для работы с PostgreSQL.                      |
| ![Socket.IO](https://img.shields.io/badge/-Socket.IO-010101?logo=socketdotio&logoColor=white)     | Реалтайм взаимодействие через WebSocket.          |
| ![PostgreSQL](https://img.shields.io/badge/-PostgreSQL-336791?logo=postgresql&logoColor=white)    | Реляционная база данных.                          |
| ![TypeScript](https://img.shields.io/badge/-TypeScript-3178C6?logo=typescript&logoColor=white)    | Основной язык разработки.                         |
| ![JWT](https://img.shields.io/badge/-JWT-000000?logo=jsonwebtokens&logoColor=white)               | Механизм для генерации токенов авторизации.       |
| ![Passport](https://img.shields.io/badge/-Passport-34E27A?logo=passport&logoColor=white)          | Middleware для аутентификации.                    |
| ![Passport-JWT](https://img.shields.io/badge/-Passport--JWT-6E7783?logo=passport&logoColor=white) | Стратегия для работы с JWT токенами в Passport.   |
| ![bcrypt](https://img.shields.io/badge/-bcrypt-003A70?logo=data:image/png;base64,...)             | Библиотека для хэширования паролей.               |

## 📝 Лицензия

Этот проект лицензирован под [MIT License](LICENSE).
