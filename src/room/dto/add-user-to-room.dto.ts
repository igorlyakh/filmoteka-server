import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class AddUserToRoomDto {
  @ApiProperty({
    description: 'Email пользователя, который будет добавлен в комнату.',
    required: true,
    example: 'example@mail.com',
  })
  @IsString({ message: 'Поле должно быть строкой!' })
  @IsNotEmpty({ message: 'Поле не должно быть пустым!' })
  @IsEmail({}, { message: 'Введите корректный email!' })
  email: string;
}
