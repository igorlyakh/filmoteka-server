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
   git clone https://github.com/igorlyakh/filmoteka-server
   cd filmoteka-server
   ```
2. Установите зависимости с помощью Yarn:
   ```bash
   yarn install
   ```
3. Настройте переменные окружения:  
   В корне проекта найдите файл `.env.example`. Скопируйте его и переименуйте в `.env`. Затем укажите следующие переменные окружения:

   - `DATABASE_URL` — Ссылка для подключения к базе данных PostgreSQL.
   - `CLIENT_URL` — Ссылка на клиентскую часть приложения.
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

## 🛠️ Технологии

| Технология                                                                                                   | Описание                                                      |
| ------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------- |
| ![NestJS](https://img.shields.io/badge/NestJS-ff0000?logo=nestjs&logoColor=white)                            | Фреймворк для создания серверных приложений на TypeScript.    |
| ![Prisma](https://img.shields.io/badge/Prisma-2D3748?logo=prisma&logoColor=white)                            | ORM для работы с базой данных PostgreSQL.                     |
| ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-336791?logo=postgresql&logoColor=white)                | Система управления базами данных.                             |
| ![JWT](https://img.shields.io/badge/JWT-000000?logo=json-web-tokens&logoColor=white)                         | Стандарт для безопасной передачи данных.                      |
| ![Passport](https://img.shields.io/badge/Passport-00485C?logo=passport&logoColor=white)                      | Модуль для аутентификации в Node.js.                          |
| ![bcrypt](https://img.shields.io/badge/bcrypt-05122A?logo=bcrypt&logoColor=white)                            | Библиотека для хэширования паролей.                           |
| ![Socket.IO](https://img.shields.io/badge/Socket.IO-010101?logo=socket.io&logoColor=white)                   | Библиотека для работы с WebSocket.                            |
| ![Swagger](https://img.shields.io/badge/Swagger-85ea2d?logo=swagger&logoColor=white)                         | Инструмент для автоматической генерации документации API.     |
| ![cookie-parser](https://img.shields.io/badge/cookie--parser-FFD700?logo=npm&logoColor=white)                | Модуль для работы с cookie в Express.                         |
| ![class-validator](https://img.shields.io/badge/class--validator-1E90FF?logo=typescript&logoColor=white)     | Библиотека для валидации данных в TypeScript.                 |
| ![class-transformer](https://img.shields.io/badge/class--transformer-8A2BE2?logo=typescript&logoColor=white) | Библиотека для трансформации объектов и классов в TypeScript. |

## 📝 Лицензия

Этот проект лицензирован под [MIT License](LICENSE).
