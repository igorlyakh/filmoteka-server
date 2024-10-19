import { ApiProperty } from '@nestjs/swagger';

export class UserResponse {
  @ApiProperty({
    description: 'Уникальный ID пользователя.',
    example: '12',
  })
  id: number;

  @ApiProperty({
    description: 'Email пользователя.',
    example: 'example@mail.com',
  })
  email: string;

  @ApiProperty({
    description: 'Имя пользователя.',
    example: 'John',
    minLength: 3,
    maxLength: 12,
  })
  name: string;

  @ApiProperty({
    description: 'Пароль пользователя.',
    example: 'Sa3kljkl32111',
    minLength: 6,
    maxLength: 18,
  })
  password: string;

  @ApiProperty({
    description: 'Список комнат пользователя.',
    example: '[23]',
  })
  rooms: string[];

  @ApiProperty({
    description: 'Список фильмов пользователя.',
    example: ['Убить Билла'],
  })
  movie: string[];

  @ApiProperty({
    description: 'Уникальный токен доступа пользователя.',
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTEsImVtYWlsIjoiYTIzQG1haS5jb20iLCJpYXQiOjE3MjkzNDM5ODIsImV4cCI6MTczMTkzNTk4Mn0.138P3e3tPV0TVxsQuSw56pwk7Y7jQRYYD_U9EgOmVFI',
  })
  accessToken: string;
}
