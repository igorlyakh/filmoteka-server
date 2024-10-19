import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class RegistrationDto {
  @ApiProperty({
    description: 'Email пользователя.',
    required: true,
    example: 'example@mail.com',
  })
  @IsString({ message: 'Email должен быть строкой!' })
  @IsNotEmpty({ message: 'Email обязательное поле!' })
  @IsEmail({}, { message: 'Введите корректный email!' })
  email: string;

  @ApiProperty({
    description: 'Имя пользователя.',
    required: true,
    example: 'John',
    minLength: 3,
    maxLength: 12,
  })
  @IsString({ message: 'Имя должен быть строкой!' })
  @IsNotEmpty({ message: 'Имя это обязательное поле!' })
  @MinLength(3, { message: 'Имя должно содержать не менее 3 символов!' })
  @MaxLength(12, { message: 'Имя должно быть не более 12 символов!' })
  name: string;

  @ApiProperty({
    description: 'Пароль пользователя.',
    required: true,
    example: 'Sa3kljkl32111',
    minLength: 6,
    maxLength: 18,
  })
  @IsString({ message: 'Пароль должен быть строкой!' })
  @IsNotEmpty({ message: 'Пароль это обязательное поле!' })
  @MinLength(6, { message: 'Пароль должен содержать не менее 6 символов!' })
  @MaxLength(18, { message: 'Пароль должен быть не более 18 символов!' })
  password: string;
}
