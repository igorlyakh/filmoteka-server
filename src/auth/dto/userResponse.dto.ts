import { ApiProperty } from '@nestjs/swagger';

export class UserResponse {
  @ApiProperty({
    description: 'Имя пользователя.',
    example: 'John',
    minLength: 3,
    maxLength: 12,
  })
  name: string;

  @ApiProperty({
    description: 'Email пользователя.',
    example: 'example@mail.com',
  })
  email: string;

  @ApiProperty({
    description: 'Уникальный токен доступа пользователя.',
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTEsImVtYWlsIjoiYTIzQG1haS5jb20iLCJpYXQiOjE3MjkzNDM5ODIsImV4cCI6MTczMTkzNTk4Mn0.138P3e3tPV0TVxsQuSw56pwk7Y7jQRYYD_U9EgOmVFI',
  })
  accessToken: string;
}
